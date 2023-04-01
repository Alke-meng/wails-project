import { getCurrentInstance } from "vue";

export default function useInstance() {
    const { appContext } = getCurrentInstance();
    const globalProperties = appContext.config.globalProperties
    return {
        globalProperties
    }
}

