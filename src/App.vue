<template>
    <el-container>
        <TopBar></TopBar>

        <el-header>
            <Header></Header>
        </el-header>

        <el-main>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-main>

        <el-footer>
            <Footer></Footer>
        </el-footer>

    </el-container>
</template>
<script>
import TopBar from './compentens/app-topbar.vue';
import Header from './compentens/app-header.vue';
import Footer from './compentens/app-footer.vue';
import { mapGetters } from 'vuex'
import { updateMyShoppingCart } from '../src/service/index'
export default {
    components: {
        TopBar,
        Header,
        Footer,
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
                updateMyShoppingCart().then(res => {
                    this.$store.commit('setShoppingCart', res.data.shoppingCartData)
                })
            }
        },
    },
    mounted() {
        // 在页面刷新时保留用户登录信息
        // 获取浏览器localStorage 判断用户是否登录
        if (localStorage.getItem('user')) {
            // 如果用户已经登录 将状态返回给user
            this.$store.commit('setUser', JSON.parse(localStorage.getItem("user")))
        }
    },



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
</style>
