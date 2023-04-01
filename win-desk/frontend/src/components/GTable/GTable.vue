<template>
    <div class="s-table" style="width: 100%;">
        <el-table v-bind="$attrs" :data="state.tableData" ref="STable" :border="border" :row-class-name="onRowClass"
            :rowKey="rowKey" v-loading="state.loading" @selection-change="onSelectionChange"
            @current-change="onTableCurrentChange">
            <el-table-column v-if="showCheck" label="选择" :reserve-selection="true" :prop="rowKey" width="40px"
                type="selection">
            </el-table-column>
            <el-table-column v-if="showIndex" label="序号" width="60px" type="index" header-align="center" align="center">
            </el-table-column>
            <slot></slot>
        </el-table>
        <el-pagination class="pagination" v-if="pagination" @size-change="onSizeChange"
            @current-change="onCurrentChange" :current-page="state.pageIndex" :page-sizes="state.pageSizes"
            :page-size="state.pageSize" :total="state.total" :small="pageSmall" :layout="pageLayout">
        </el-pagination>
    </div>
</template>


<script setup>
import { ref, reactive, toRefs, computed, onMounted } from 'vue'
import { ElMessage, ElLoading, ElMessageBox } from 'element-plus'

const props = defineProps({
    tableParams: {
        type: Object,
        required: true
    },
    rowKey: {
        type: String,
        default: 'id'
    },
    pagination: {
        type: Boolean,
        default: true
    },
    pageSmall: {
        type: Boolean,
        default: false
    },
    pageLayout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
    },
    showCheck: {
        type: Boolean,
        default: false
    },
    showIndex: {
        type: Boolean,
        default: false
    },
    border: {
        type: Boolean,
        default: true
    },
})

const $emit = defineEmits(['loadSuccess', 'selection', 'deleteSuccess'])

const STable = ref(null)

const state = reactive({
    loading: false,
    pageSizes: [15, 20, 50, 100],
    pageSize: 15,
    pageIndex: 1,
    total: 0,
    selectedData: [],  //表格选择的数据
    queryParams: {}, //查询参数
    tableData: [], //表格数据
    currentRow: null, //当前点击的行
    retrunTag: {} //接受后台返回的附加数据tag
})

//多选数据的id数组
const selectedIds = computed(() => state.selectedData.map(item => item[props.rowKey]));

onMounted(() => getList())

//获取数据
const getList = () => {
    const { tableParams, pagination } = props;
    if (tableParams.fetchList === undefined) {
        throw new Error('没有设置获取数据的方法！')
    };
    state.loading = true;
    tableParams.queryParams = tableParams.queryParams || {};
    let query = Object.assign({}, state.queryParams, tableParams.queryParams);
    //分页参数
    if (pagination) {
        query.pageIndex = state.pageIndex;
        query.pageSize = query.pageSize ? query.pageSize : state.pageSize;
    }

    //请求获取数据
    tableParams.fetchList(query).then((res) => {
        state.tableData = res.data.length > 0 ? res.data : res.data.data
        //为防止删除数据后导致当前页面数据长度为 0 ,自动翻页到上一页
        if (state.tableData.length == 0 && state.pageIndex > 1) {
            state.pageIndex--;
            getList();
            return
        }
        state.total = res.totalCount || 0;
        state.retrunTag = res.tag;
        $emit('loadSuccess', res);
    }).finally(() => {
        state.loading = false;
    })
}

//删除数据
const destroy = (id) => {
    const { tableParams } = toRefs(props);
    if (tableParams && tableParams.deleteData) {
        ElMessage.error('未设置删除数据的方法')
        return;
    };
    let ids = id ? [id] : selectedIds.value;
    if (ids.length == 0) {
        ElMessage.error('请您选择要删除的数据');
        return;
    }
    const title = `您确定对选中数据[${ids.length}条记录]进行[${ids.length == 1 ? '删除' : '批量删除'}]操作吗?`;
    ElMessageBox.confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        const loading = ElLoading.service({
            lock: true,
            text: '正在删除数据，请等待…',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        tableParams.deleteData(ids).then(({ data }) => {
            if (data && data.success) {
                ElMessage.success({
                    duration: 1000, message: '操作成功',
                    onClose: () => {
                        getList();
                        clearSelection();
                        $emit('deleteSuccess');
                    }
                })
            } else {
                ElMessage.error({ duration: 1000, message: data.message })
            }
        }).finally(() => {
            loading.close()
        })
    })
}



//	pageSize 改变时触发
const onSizeChange = (pageSize) => {
    state.pageSize = pageSize
    state.pageIndex = 1
    getList();
}

//清除多选
const clearSelection = () => {
    STable.value.clearSelection();
}


//current-change 改变时触发
const onCurrentChange = (pageIndex) => {
    state.pageIndex = pageIndex
    getList();
    clearSelection();
}

//表格多选事件
const onSelectionChange = (selection) => {
    state.selectedData = selection;
    $emit('selection', selection)
}



const onRowClass = ({ row }) => {
    if (!row[props.rowKey]) return;
    if (selectedIds.value.includes(row[props.rowKey])) {
        return 'selected-row';
    } else {
        return '';
    }
}

//刷新表格
const refresh = (params) => {
    state.pageIndex = 1;
    state.queryParams = params;
    clearSelection();
    getList();
}

//表格搜索
const search = () => {
    state.pageIndex = 1
    getList();
}

//表格当前行发生变化的事件
const onTableCurrentChange = (currentRow) => {
    state.currentRow = currentRow;
}

//暴露方法和属性
defineExpose({
    STable,  //表格ref
    refresh, //刷新表格方法
    search, //表格搜索方法
    selectedIds, //多选的id
    selectedData:state.selectedData,//多选的表格数据
    currentRow:state.selectedData //当前点击的行
})

</script>


<style lang="scss" scoped>
.pagination {
    margin: 15px;
    justify-content: flex-end;
}
</style>
