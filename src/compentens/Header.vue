<!-- 全局页面Header  -->
<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#409eff" router>
        <div class="logo">
            <router-link to="/">
                <img src="../assets/logo.png" alt="">
            </router-link>
        </div>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/allstore">全部商品</el-menu-item>
        <el-menu-item index="/about">关于我们</el-menu-item>
        <div class="so">
            <el-input v-model="input" placeholder="请输入内容"> </el-input>
        </div>
    </el-menu>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: "",
            input: '',
        }
    },
    watch: {
        $route: {
            handler(val) {
                this.activeIndex = val.path
            }
        }
    }
}
</script>
<style>
.el-menu {
    max-width: 1225px;
    margin: 0 auto;
    display: block;
}

.logo {
    height: 60px;
    width: 189px;
    margin-right: 100px;
    float: left;
}

.so {
    margin-top: 13px;
    width: 300px;
    float: right;
}
</style>