
const data = [
    {
        name: 'index',
        path: '/home',
        meta: { title: '首页', icon: 'House' }
    },

    {
        path: '/mysql',
        name: 'MySQL',
        meta: { title: 'MySQL', icon: 'List' },
        children: [
            {
                path: 'sqlAnalysis',
                name: 'sqlAnalysis',
                meta: { title: 'SQL分析', icon: 'Tools' }
            },
            {
                path: 'sqlSlow',
                name: 'sqlSlow',
                meta: { title: 'SQL慢日志', icon: 'Histogram' }
            },
        ]
    },

    {
        path: '/redis',
        name: 'Redis',
        meta: { title: 'Redis', icon: 'Management' },
        children: [
            {
                path: 'rdb',
                name: 'rdb',
                meta: { title: 'rdb分析', icon: 'Histogram' }
            },
        ]
    },

    {
        path: '/nginx',
        name: 'Nginx',
        meta: { title: 'Nginx', icon: 'TrendCharts' },
        children: [
            {
                path: 'nginx',
                name: 'nginx',
                meta: { title: 'nginx分析', icon: 'TrendCharts' }
            },
        ]
    },

]



export default data;