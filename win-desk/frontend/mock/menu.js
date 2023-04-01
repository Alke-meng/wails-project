const menu = [
    {
        component: 'Layout',
        name: 'index',
        path: '/home',
        meta: { title: '首页', icon: 'House' }
    },

    {
        path: '/mysql',
        component: 'Layout',
        name: 'MySQL',
        meta: { title: 'MySQL', icon: 'Aim' },
        children: [
            {
                path: 'sqlAnalysis',
                name: 'sqlAnalysis',
                meta: { title: 'SQL分析', icon: 'Edit' }
            },
            {
                path: 'sqlSlow',
                name: 'sqlSlow',
                meta: { title: 'SQL慢日志', icon: 'Edit' }
            },
        ]
    },

    {
        path: '/redis',
        component: 'Layout',
        name: 'Redis',
        meta: { title: 'Redis', icon: 'List' },
        children: [
            {
                path: 'rdb',
                name: 'rdb',
                meta: { title: 'rdb分析', icon: 'Histogram' }
            },
        ]
    },

    {
        path: '/example',
        component: 'Layout',
        name: 'Example',
        meta: { title: '例子', icon: 'Aim' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: 'table/index',
                meta: { title: '表格', icon: 'Calendar' }
            },
            {
                path: 'modal',
                name: 'STable',
                meta: { title: '函数式弹窗', icon: 'ElementPlus' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: 'tree/index',
                meta: { title: '树组件', icon: 'Present' }
            },
            {
                path: 'editor',
                name: 'editor',
                meta: { title: '富文本编辑器', icon: 'Edit' }
            }
        ]
    },
    {
        path: '/form',
        component: 'Layout',
        children: [
            {
                path: 'index',
                name: 'Form',
                component: 'form/index',
                meta: { title: '基础表单', icon: 'Edit' }
            },
            {
                path: 'stepform',
                name: 'stepform',
                component: 'form/stepform',
                meta: { title: '分步表单', icon: 'MessageBox' }
            },
        ],
        meta: {
            title: '表单页面',
            icon: 'List',
            //alwaysShow:true
        }
    },
    {
        path: '/nested',
        component: 'Layout',
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: '路由嵌套',
            icon: 'Operation'
        },
        children: [
            {
                path: 'menu1',
                component: 'nested/menu1/index', // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: 'nested/menu1/menu1-1/index',
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: 'nested/menu1/menu1-2/index',
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: 'nested/menu1/menu1-2/menu1-2-1/index',
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: 'nested/menu1/menu1-2/menu1-2-2/index',
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: 'nested/menu1/menu1-3/index',
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: 'menu/index',
                name: 'Menu2',
                meta: { title: 'menu2' }
            }
        ]
    },
    {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        component: 'Layout',
        meta: { title: '外链', icon: 'Link' }
    }
]
export default [
    {
        url: '/getMenu',
        type: 'get',
        response: config => {
            return {
                code: 1,
                msg: 'success',
                data: menu
            }
        }
    }
]
