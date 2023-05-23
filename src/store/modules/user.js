export default {
    state: {
        user: "", // 登录的用户
        isLogin: false // 用于控制是否显示登录组件
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getShowLogin(state) {
            return state.isLogin
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        setShowLogin(state, data) {
            state.isLogin = data;
        }
    },

}