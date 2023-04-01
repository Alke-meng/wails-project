/**
 * 项目默认配置项
 * navTheme - menu theme ['dark', 'light'] 两种主题
 * layout - 整体布局方式 ['side', 'top','mix] 三种布局
 * fixedHeader - 固定 Header : boolean
 * tagsView - 多标签 ： boolean
 * sidebarLogo - 显示logo ： boolean
 * showSettings - 显示设置抽屉 ： boolean
 * cacheNamespace - 本地存储缓存key前缀
 */
export default {
    title: '@工具', // 标题
    fixedHeader: true, // 固定 Header
    sidebarLogo: true, // 显示logo
    tagsView: true, // 多标签
    showSettings: true, // 显示设置抽屉
    navTheme: 'light', // menu theme ['dark', 'light'] 两种主题
    layout: 'side', // 整体布局方式 ['side', 'top']  四种布局
    cacheNamespace: 'el-admin_' // 缓存key前缀
}
