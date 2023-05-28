<!-- 全局页面组件 -->
<template>
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
                <img src="../assets/github.png" alt="">
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
</template>
<style>
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