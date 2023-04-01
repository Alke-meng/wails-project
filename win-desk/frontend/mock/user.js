import Mock from 'mockjs'
export default [
    {
        type: 'get',
        url: '/user/getUserInfo',
        response: () => {
            const userInfo = {
                roles: ['admin'],
                name: '@name',
                avatar: 'https://cdn.eleadmin.com/20200610/avatar.jpg',
            }
            return {
                code: 1,
                msg: 'success',
                data: userInfo
            }
        }
    },
    {
        type: 'get',
        url: '/user/login',
        response: () => {
            return {
                code: 1,
                msg: 'success',
                data: { token: '@string(3,50)' }
            }
        }
    },
    {
        type: 'get',
        url: '/user/logout',
        response: () => {
            return {
                code: 1,
                msg: 'success',
                data: []
            }
        }
    },
    {
        type: 'get',
        url: '/getDict',
        response: () => {
            return {
                code: 1,
                msg: 'success',
                data: {
                    data: [{ value: '1', name: '上海' }, { value: '2', name: '北京' }],
                    success: true
                }
            }
        }
    }

]

