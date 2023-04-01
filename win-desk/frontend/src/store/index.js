/**
 * @description 自动import导入所有 vuex 模块
 */

import { createStore } from 'vuex';
import app from './modules/app.js'
import settings from './modules/settings.js'
import user from './modules/user.js'

export default createStore({
    modules: {
        app,
        settings,
        user
    }
});






