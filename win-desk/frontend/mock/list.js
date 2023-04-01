export default [
    {
        type: 'get',
        url: '/list',
        response: () => {
            const data = {
                'data|20':[ // 生成一个 length是 22~100之间的数组list
                    {
                        'a': '@string(3,50)', // 生成3-50位的产品合同号-梯号
                        'b': '@string(3,50)', // 生成3-50位的保养合同号
                        'c': '@cname', // 生成客户名称
                        'd|0-1': 1, // 生成3-50位的现场客户梯号
                        'e': '@cname', // 生成巡视整改人员
                        'f': '@date(yyyy-MM-dd)' // 生成整改时间
                    }
                ]
            }
            return {
                code: 1,
                msg: 'success',
                success: true,
                pageSize: 20,
                totalCount: 20,
                totalPage: 5,
                data
            }
        }
    }
]

