<template>
    <el-container>
        <!-- 导航栏 -->
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
        <!-- 导航栏结束 -->

        <!-- 顶栏容器开始 -->
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#409eff"
                router>
                <div class="logo">
                    <router-link to="/">
                        <img src="../src/assets/logo.png" alt="">
                    </router-link>
                </div>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/allstore">全部商品</el-menu-item>
                <el-menu-item index="/about">关于我们</el-menu-item>
                <div class="so">
                    <el-input v-model="input" placeholder="请输入内容"> </el-input>
                </div>
            </el-menu>
        </el-header>
        <!-- 顶栏容器结束 -->

        <el-main>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-main>
        <!-- 底栏容器开始 -->
        <el-footer>
            <div class="footer">
                <div class="box">
                    <p class="text">
                        <a href="javascript:;">7天无理由退换货</a>
                        <a href="javascript:;">满99元全场免邮</a>
                        <a style="margin-right: 0" href="javascript:;">100%品质保证</a>
                    </p>
                </div>
                <div class="github">
                    <a href="https://github.com/hai-27/vue-store">
                        <img src="../src/assets/github.png" alt="">
                    </a>
                </div>
                <div class="mod-help">
                    <p>
                        <router-link to="/">首页</router-link>
                        <span>|</span>
                        <router-link to="/allstore">全部商品</router-link>
                        <span>|</span>
                        <router-link to="/about">关于我们</router-link>
                    </p>
                    <p class="finally">商城版权所有 © 2012-2021</p>
                </div>
            </div>
        </el-footer>
        <!-- 底栏容器结束 -->
    </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import MyRegister from './compentens/MyRegister.vue';
import Mylogin from './compentens/Mylogin.vue';
import axios from 'axios';
export default {
    components: {
        MyRegister,
        Mylogin,
    },
    data() {
        return {
            visible: false,// 登录后点击是否退出登录
            activeIndex: "",
            input: '',
            register: false,// 注册对话框是否显示
        }
    },
    // TODO created=>mounted
    mounted() {
        // 在页面刷新时保留用户登录信息
        // 获取浏览器localStorage 判断用户是否登录
        if (localStorage.getItem('user')) {
            // 如果用户已经登录 将状态返回给user
            this.$store.commit('setUser', JSON.parse(localStorage.getItem("user")))
        }
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    watch: {
        // 监听购物车的状态 时刻更新vuex状态
        getUser: function (val) {
            if (val == '') {
                this.$store.commit('setShoppingCart', [])
            } else {
                axios({
                    method: 'post',
                    url: '/api/user/shoppingCart/getShoppingCart',
                    data: {
                        user_id: val.user_id
                    }
                }).then(res => {
                    if (res.data.code == '001') {
                        this.$store.commit('setShoppingCart', res.data.shoppingCartData)
                    }
                }).catch(err => {
                    return Promise.reject(err)
                })
            }
        },
        // TODO watch 监听路由变化 
        $route: {
            handler(val) {
                this.activeIndex = val.path
            }
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
html,
body,
#app {
    margin: 0px;
    padding: 0px;
}

#app .el-header {
    padding: 0;
    background-color: white;
}

#app .el-main {
    min-height: 300px;
    padding: 20px 0;
}

#app .el-footer {
    padding: 0;
}

a,
a:hover {
    text-decoration: none;
}

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

.el-header .el-menu {
    max-width: 1225px;
    margin: 0 auto;
    display: block;
}

.el-header .logo {
    height: 60px;
    width: 189px;
    margin-right: 100px;
    float: left;
}

.el-header .so {
    margin-top: 13px;
    width: 300px;
    float: right;
}

.footer {
    width: 100%;
    background-color: #2f2f2f;
    padding-bottom: 20px;
    text-align: center;
}

.footer .box {
    margin: 0 auto;
    border-bottom: 1px solid #3d3d3d;
    line-height: 145px;
}

.footer .box p a {
    height: 40px;
    margin-right: 210px;
    color: #fff;
    font-size: 20px;
}

.footer .github {
    height: 50px;
    line-height: 50px;
    margin-top: 20px;
}

.footer .mod-help p {
    margin: 20px 0 16px 0;
}

.footer .mod-help p a {
    color: #888;
}

.footer .mod-help p span {
    color: #888;
    padding: 0 22px;
}

.footer .mod-help .finally {
    color: #888;
}
</style>
