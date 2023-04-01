import Breadcrumb from './Breadcrumb/index.vue'
import RightPanel from './RightPanel/index.vue'
import GTable from './GTable/GTable.vue'
import GTableColumn from './GTableColumn/GTableColumn.vue'
import GEditor from './GEditor/GEditor.vue'
import GTree from './GTree/GTree.vue'
import GInput from './GInput/GInput.jsx'
import GSelect from './GSelect/GSelect.vue'
import GCard from './GCard/GCard.vue'
import GDateRange from './GDateRange/GDateRange.vue'
import GRadioGroup from './GRadioGroup/GRadioGroup.vue'
import GInputAppend from './GInput/GInputAppend.jsx'
import GDatePicker from './GDatePicker/GDatePicker.vue'
import {
    GButtonAdd,
    GButtonCopy,
    GButtonDelete,
    GButtonEdit,
    GButtonRefresh,
    GButtonSearch,
    GButtonSort
} from './GButton'

const components = {
    GBreadcrumb:Breadcrumb,
    RightPanel,
    GTable,
    GEditor,
    GTableColumn,
    GTree,
    GInput,
    GSelect,
    GCard,
    GButtonAdd,
    GButtonCopy,
    GButtonDelete,
    GButtonEdit,
    GDateRange,
    GRadioGroup,
    GInputAppend,
    GDatePicker,
    GButtonRefresh,
    GButtonSearch,
    GButtonSort
}

//自动注册全局组件，
export default function setupComponent(app) {
    Object.keys(components).forEach(key => {
        app.component(key, components[key])
    })
}
