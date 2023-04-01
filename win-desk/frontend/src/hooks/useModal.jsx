import { createVNode, render, ref, inject } from "vue";
import { ElDialog, ElButton } from "element-plus";
export const DzModalSymbol = Symbol()
export const DzModalCloseSymbol = Symbol()
const layer = function (app) {
    const componentRef = ref(null)
    return {
        create(props, children) {
            const modalProps = { ...props }
            delete modalProps.onSubmit
            delete modalProps.footer
            const visible = ref(true)
            let $refs = ref(null)
            const layerDom = document.createElement('div');
            let close = () => {
                $refs.value.$emit('close')
                layerDom.remove();
                document.querySelector('body').classList.remove("el-popup-parent--hidden")
            };
            let submit = () => {
                props.onSubmit && props.onSubmit(componentRef.value, close)
                //是否自动关闭
                if (props.autoClose) {
                    visible.value = false;
                    layerDom.remove();
                }
            };
            const Props = { ...modalProps, ref: $refs, "before-close": close, modelValue: visible.value };
            const footerSlots = () => {
                if (!props.footer) {
                    return null
                } else {
                    return (
                        <span class="dialog-footer">
                            <ElButton onClick={() => close()}>{() => '取消'}</ElButton>
                            <ElButton onClick={() => submit()} type="primary">{() => '确认'}</ElButton>
                        </span>
                    );
                }
            }
            const slots = {
                default: () => children(),
            }
            if (footerSlots() != null) {
                slots.footer = () => footerSlots()
            }
            let vNode = createVNode({
                render() {
                    return (
                        <ElDialog custom-class="layer-modal" {...Props}>
                            {slots}
                        </ElDialog>)
                }
            });
            let root = Props["_top"] ? (top || self) : self;
            root.document.body.appendChild(layerDom);
            //绑定上下文 否则渲染的子组件vue无法识别
            vNode.appContext = app._context;
            app.provide(DzModalCloseSymbol, close)
            render(vNode, layerDom);
            return {
                el: layerDom,
                vm: $refs.value,
                close
            };
        },
        open(props = {}) {
            const { component, modalProps } = props;
            if (!component) {
                throw new Error('Component is not defined')
            }
            delete props.component
            delete props.modalProps
            let layer = this.create({ footer: false, ...modalProps }, () => h(component, { ...props, ref: componentRef }));
            return layer;
        }
    };
}

export function useModal() {
    const Modal = inject(DzModalSymbol)
    if (!Modal) {
        throw new Error('No Modal provided!')
    }
    return Modal;
}

export function useModalClose() {
    const Close = inject(DzModalCloseSymbol)
    if (!Close) {
        throw new Error('No Close provided!')
    }
    return Close;
}



export default {
    install(app) {
        const modal = layer(app);
        app.config.globalProperties.$layer = modal;
        app.provide(DzModalSymbol, modal)
    }
};


