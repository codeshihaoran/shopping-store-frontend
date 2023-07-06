<!-- 全局页面TOP -->
<template>
    <div class="topbar">
        <div class="nav">
            <ul>
                <li v-if="!this.$store.state.user.user.userName">
                    <el-button @click="getLogin">登录</el-button>
                    <Mylogin></Mylogin>
                    <span>|</span>
                    <!-- 这里使用父子组件互相传值实现了点击 注册按钮 重复显示对话框dialog -->
                    <el-button @click="getRegister">注册</el-button>
                    <MyRegister :register="register" @fromChild="isRegister"></MyRegister>
                    <!-- 动态绑定register的值 通过点击button使props传递过去值为ture  -->
                </li>
                <li v-else>
                    欢迎
                    <el-popover :visible="visible" placement="top" :width="200">
                        <p>确定退出登录吗？</p>
                        <div style="text-align: right; margin:10px 0 0">
                            <el-button size="small" text @click="visible = false">取消</el-button>
                            <el-button size="small" type="primary" @click="loginOut">确定</el-button>
                        </div>
                        <template #reference>
                            <el-button @click="visible = true">{{ this.$store.state.user.user.userName }}</el-button>
                        </template>
                    </el-popover>

                </li>
                <li>
                    <router-link to="/order">我的订单</router-link>
                </li>
                <li>
                    <router-link to="/collect">我的收藏</router-link>
                </li>
                <li>
                    <router-link to="/shoppingCart">
                        购物车
                        <span>({{ this.$store.state.ShoppingCart.ShoppingCart.length }})</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import MyRegister from './register-model.vue'
import Mylogin from './login-model.vue'
export default {
    components: {
        MyRegister,
        Mylogin,
    },
    data() {
        return {
            visible: false,// 登录后点击是否退出登录
            register: false,// 注册对话框是否显示
        }
    },
    methods: {
        getLogin() {
            this.$store.commit('setShowLogin', true)
        },
        // 注册
        getRegister() {
            this.register = true
        },
        isRegister(val) {
            this.register = val;
        },
        // 退出登录选项 
        loginOut() {
            // 对话框关闭
            this.visible = false
            // 清除本地登录信息
            localStorage.setItem("user", "");
            // 消除user登录信息
            this.$store.commit('setUser', '')
        },
    }
}
</script>
<style>
.nav {
    width: 1225px;
    margin: 0 auto;
}

.topbar {
    width: 100%;
    height: 40px;
    background-color: #3d3d3d;
    margin-bottom: 20px;
}

.topbar ul {
    float: right;

}

.topbar ul li {
    float: left;
    list-style: none;
    color: #b0b0b0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-left: 20px;
    font-size: 14px;
}

.topbar .nav li .el-button {
    color: #b0b0b0;
    background-color: #3d3d3d;
    border: none;
}

.topbar .nav .el-button:hover {
    color: #fff;
}

.topbar .nav li a {
    color: #b0b0b0;
}

.topbar .nav a:hover {
    color: #fff;
}
</style>