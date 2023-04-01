
import { onMounted, watch, computed, onBeforeMount, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default function useDeviceEnquire() {

  const $_isMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const store = useStore()
  const device = computed(() => store.state.app.device)
  const collapse = computed(() => store.state.app.collapse)
  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        store.dispatch('app/closeSideBar')
      } else {
        store.dispatch('app/openSideBar')
      }
    }
  }
  const route = useRoute()
  //监听路由的变化
  watch(() => route.path, () => {
    if (device === 'mobile' && collapse.value) {
      store.dispatch('app/closeSideBar')
    }
  }, { immediate: true })


  onUnmounted(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })

  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar')
    }
  })

  return { device }
}
