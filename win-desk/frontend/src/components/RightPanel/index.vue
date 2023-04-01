<template>
  <div ref="rightPanel" id="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" @click="show = false" />
    <div class="rightPanel">
      <div class="handle-button" :style="{ top: buttonTop + 'px', 'background-color': '#00000061' }"
        @click.stop="show = !show">
        <el-icon>
          <Close v-if="show" />
          <Setting v-else/>
        </el-icon>
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { addClass, removeClass } from '@/utils'
import variables from '@/styles/variables.scss'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  clickNotClose: {
    default: false,
    type: Boolean
  },
  buttonTop: {
    default: 250,
    type: Number
  }
})

let show = ref(false)
const rightPanel = ref(null)
const theme = computed(() => variables.primaryColor)


watch(() => show.value, (value) => {
  if (value) {
    addClass(document.body, 'showRightPanel')
  } else {
    removeClass(document.body, 'showRightPanel')
  }
})

const insertToBody = () => {
  const elx = rightPanel.value
  const body = document.querySelector('body')
  body.insertBefore(elx, body.firstChild)
}


onMounted(() => {
  insertToBody()
})


onUnmounted(() => {
  const elx = rightPanel.value
  elx &&　elx.remove()
  document.querySelector('#rightPanel').remove()
})

</script>


<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 280px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 2001;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 2000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 35px;
  height: 35px;
  position: absolute;
  left: -35px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 35px;

  i {
    font-size: 20px;
    line-height: 35px;
  }
}
</style>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>