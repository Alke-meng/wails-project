import { ref } from "vue";
import { ElLoading } from "element-plus";
export default function useLoading() {
    const loadingInstance = ref()
    const show = (text = '正在加载') => {
        loadingInstance.value = ElLoading.service({ 
            fullscreen: true,
            text: text ,
            lock: true,
            background: 'rgba(0, 0, 0, 0.7)',
        });
    }
    const hide = () => {
        loadingInstance.value.close();
    }
    return {
        show,
        hide
    }
}
