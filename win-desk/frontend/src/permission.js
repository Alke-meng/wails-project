import router from '@/router';
import store from '@/store'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import { setPageTitle } from '@/utils';

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
   // 开启页面加载条
   NProgress.start()
   // 设置页面标题
   document.title = setPageTitle(to.meta.title)
   // 确定用户是否已登录
   const hasToken = getToken();

   if (hasToken) {
      if (to.path === '/login') {
         // 如果已登录，则重定向到首页
         next({ path: '/' })
         NProgress.done()
      } else {
         // 是否已获取用户角色
         const hasRoles = store.state.user.roles && store.state.user.roles.length > 0;

         if (hasRoles) {
            next()
         } else {
            try {
               // 重新获取用户信息
               await store.dispatch('user/getInfo')
               // 路由跳转
               next({ ...to, replace: true })
            } catch (error) {
               // 获取用户信息失败
               if (error.status == 401) return;
               await store.dispatch('user/logout');
               next({ path: '/login', query: { redirect: to.fullPath } })
            }
         }
      }
   } else {
      // 不存在令牌
      if (whiteList.includes(to.path)) {
         next();
      } else {
         next({ path: '/login', query: { redirect: to.fullPath } })
         NProgress.done()
      }
   }
})

router.afterEach(() => {
   NProgress.done()
})
