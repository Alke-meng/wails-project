export default function useTreeMethods(ref) {
    const filter = (filterNodeMethod) => {
        return ref.value.filter(filterNodeMethod)
    }
    const updateKeyChildren = (key, data) => {
        return ref.value.filter(key, data)
    }
    const getCheckedNodes = (leafOnly, includeHalfChecked) => {
        return ref.value.getCheckedNodes(leafOnly, includeHalfChecked)
    }
    const getCheckedKeys = (leafOnly) => {
        return ref.value.getCheckedKeys(leafOnly)
    }
    const setCheckedKeys = (keys, leafOnly) => {
        return ref.value.setCheckedKeys(keys, leafOnly)
    }
    const setChecked = (data, checked, deep) => {
        return ref.value.setChecked(data, checked, deep)
    }
    const getHalfCheckedNodes = () => {
        return ref.value.getHalfCheckedNodes()
    }
    const getHalfCheckedKeys = () => {
        return ref.value.getHalfCheckedKeys()
    }
    const getCurrentKey = () => {
        return ref.value.getCurrentKey()
    }
    const getCurrentNode = (key, shouldAutoExpandParent) => {
        return ref.value.getCurrentNode(key, shouldAutoExpandParent)
    }
    const setCurrentKey = (leafOnly) => {
        return ref.value.setCurrentKey(leafOnly)
    }
    const setCurrentNode = (node, shouldAutoExpandParent) => {
        return ref.value.setCurrentNode(node, shouldAutoExpandParent)
    }
    const getNode = (data) => {
        return ref.value.getNode(data)
    }
    const remove = (data) => {
        return ref.value.remove(data)
    }
    const append = (data, parentNode) => {
        return ref.value.append(data, parentNode)
    }
    const insertBefore = (data, refNode) => {
        return ref.value.insertBefore(data, refNode)
    }
    const insertAfter = (data, refNode) => {
        return ref.value.insertAfter(data, refNode)
    }
    return {
        filter,
        updateKeyChildren,
        getCheckedNodes,
        getCheckedKeys,
        setCheckedKeys,
        setChecked,
        getHalfCheckedNodes,
        getHalfCheckedKeys,
        getCurrentKey,
        getCurrentNode,
        setCurrentKey,
        setCurrentNode,
        getNode,
        remove,
        append,
        insertBefore,
        insertAfter
    };
}