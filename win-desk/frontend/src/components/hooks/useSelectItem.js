
import { getDict } from "@/api/user";
import { ref, onMounted } from "vue";
export default function useSelectItem(props,emit) {
    const optionsList = ref([])

    //获取字典数据
    const getDictList = () => {
        getDict({ keyword: props.dictCode }).then(({ data }) => {
            if (data && data.success) {
                data.data.forEach((item) => {
                    optionsList.value.push({
                        id: item.value == null ? 0 : parseInt(item.value),
                        name: item.name,
                    });
                });
                handleValueZero();
            }
        });
    };

    //处理值为0，并且没有数据回显的情况
    const handleValueZero = () => {
        if (props.modelValue === 0 || props.modelValue === "0") {
            let result = optionsList.value.find((item) => item.id == props.modelValue);
            if (!result) {
                emit("update:modelValue", undefined)
                //optionsList.value.push({ id: 0, name: " " });
            }
        }
    };

    const setItemType = () => {
        switch (props.itemType) {
            case "gender":
                optionsList.value = [
                    { id: 1, name: "男" },
                    { id: 2, name: "女" },
                ];
                break;
            case "yesNo":
                optionsList.value = [
                    { id: 1, name: "是" },
                    { id: 0, name: "否" },
                ];
                break;
            case "status":
                optionsList.value = [
                    { id: 0, name: "正常 " },
                    { id: 1, name: "无效" },
                ];
                break;
            default:
                optionsList.value = props.options;
                break;
        }
    };

    onMounted(() => {
        if (props.dictCode) {
            getDictList();
        } else {
            setItemType();
        }
    });

    return {
        optionsList
    }

}