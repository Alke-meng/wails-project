import { defineComponent, ref, useAttrs } from "vue"
import { formItemProps } from "element-plus/es";
import { ElInput, ElFormItem } from "element-plus";
export default defineComponent({
    props: Object.assign(formItemProps, {
        modelValue:[String,Number]
    }),
    emits: ['update:modelValue'],
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
        const inputProps = { ...attrs, ref: inputRef };
        const onInput = (e) => emit('update:modelValue', e)
        //渲染输入框
        const renderInput = () => {
            return (<ElInput {...inputProps} modelValue={props.modelValue} onInput={onInput}>
                {{
                    prefix: slots.prefix ? () => slots.prefix() : undefined,
                    suffix: slots.suffix ? () => slots.suffix() : undefined,
                    prepend: slots.prepend ? () => slots.prepend() : undefined,
                    append: slots.append ? () => slots.append() : undefined
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
