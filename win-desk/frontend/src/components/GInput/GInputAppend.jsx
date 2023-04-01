import { defineComponent, ref, useAttrs } from "vue"
import { formItemProps } from "element-plus/es";
import { ElInput, ElFormItem,ElIcon,ElButton } from "element-plus";
import { CaretBottom } from '@element-plus/icons-vue'
export default defineComponent({
    props: Object.assign(formItemProps, {
        modelValue: [String, Number],
        readonly: {
            type:Boolean,
            default:true
        }
    }),
    emits: ['update:modelValue', 'click'],
    setup(props, { emit, expose, slots }) {
        const attrs = useAttrs()
        const inputRef = ref(null)
        //渲染表单项
        const renderFormItem = () => {
            return (<ElFormItem {...props}>
                {{
                    default: () => renderInput(),
                    label: slots.label ? () => slots.label() : undefined
                }}
            </ElFormItem>)
        }
        //输入框的参数
        const inputProps = { ...attrs, ref: inputRef, readonly: props.readonly };
        const onInput = (e) => emit('update:modelValue', e)
        const onClick = (e) => emit('click', e)

        //渲染输入框后置内容
        const renderAppend = () => {
            return (<ElButton
                style="cursor: pointer;"
                onClick={onClick}
                disabled={props.disabled}
            >
                { () => <ElIcon>{()=><CaretBottom />}</ElIcon>}
            </ElButton>)
        }

        //渲染输入框
        const renderInput = () => {
            return (<ElInput {...inputProps} modelValue={props.modelValue} onInput={onInput}>
                {{
                    append: () => renderAppend()
                }}
            </ElInput>)
        }
        //输入框的方法
        const focus = () => inputRef.value.focus()
        const blur = () => inputRef.value.blur()
        const select = () => inputRef.value.select()
        //暴露方法
        expose({ focus, blur, select })
        return () => {
            if (props.label || slots.label) {
                return renderFormItem()
            } else {
                return renderInput()
            }
        }
    }
})
