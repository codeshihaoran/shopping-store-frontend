import { createApp } from 'vue'
import { ElMessage } from 'element-plus'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import axios from 'axios'
import store from './store'


// 全局响应拦截器
axios.interceptors.response.use(
    // 对响应的数据做处理
    res => {
        if (res.data.code !== '001') {
            console.log(res);
            ElMessage.error(`网络出错，错误码${res.data.code}, 错误信息${res.data.msg}`)
            throw Error(`网络出错，错误码${res.data.code}, 错误信息${res.data.msg}`)
        }
        return res
    },
    // 响应时发生错误
    error => {
        return Promise.reject(error)
    }
)


// 路由守卫 
// 在进入某些页面时需要验证是否登录
router.beforeResolve((to, from, next) => {
    const loginUser = store.state.user.user;
    // 判断路由是否设置相应校验用户权限
    if (to.meta.requireAuth) {
        if (!loginUser) {
            // 没有登录，显示登录组件
            store.commit("setShowLogin", true);
            if (from.name == null) {
                //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
                next("/");
                return;
            }
            // 终止导航
            next(false);
            return;
        }
    }
    next();
});


const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
