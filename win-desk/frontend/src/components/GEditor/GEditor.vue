<template>
  <div>
    <div>
      <el-button @click="insertText">insert text</el-button>
      <el-button @click="printHtml">print html</el-button>
      <el-button @click="disable">disable</el-button>
      <el-button @click="enable">enable</el-button>
    </div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        :modelValue="modelValue"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </div>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const props = defineProps({
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);


// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();


const mode = ref("default");

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor) => {
  console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
//编辑器值改变事件
const handleChange = (editor) => {
  emit('update:modelValue',editor.getHtml())
  console.log("change:", editor.getHtml());
};
//编辑器摧毁
const handleDestroyed = (editor) => {
  console.log("destroyed", editor);
};
//获取焦点
const handleFocus = (editor) => {
  console.log("focus", editor);
};
//失去焦点
const handleBlur = (editor) => {
  console.log("blur", editor);
};

const customAlert = (info, type) => {
  alert(`【自定义提示】${type} - ${info}`);
};

//自定义粘贴
const customPaste = (editor, event, callback) => {
  console.log("ClipboardEvent 粘贴事件对象", event);

  // 自定义插入内容
  editor.insertText("xxx");

  // 返回值（注意，vue 事件的返回值，不能用 return）
  callback(false); // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
};

//手动插入文本
const insertText = () => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.insertText("hello world");
};

//粘贴事件
const printHtml = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  console.log(editor.getHtml());
};
//禁用编辑器
const disable = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.disable();
};

//启用编辑器
const enable = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.enable();
};
</script>
