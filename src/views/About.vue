<template>
    <!-- 关于我们页面完成 -->


    <div class="about-v">
        <!-- 关于我们页面固定代码 -->
        <div class="header">
            <div class="title">
                <h1>关于我们</h1>
            </div>
        </div>
        <!-- 固定代码结束 -->
        <div class="about-content">
            <div class="about-head">
                <h1>Store (参考小米商城) </h1>

            </div>
            <div class="about-main">
                <div class="title">
                    项目简介
                </div>
                <ul>
                    <li>前端基于vue+vuex+vue-router+axios+element-ui实现</li>
                    <li>后端基于Node.js+MySQL实现</li>
                    <li>共十一个页面</li>
                    <li>模仿小米平台做的一个电商项目</li>
                </ul>

            </div>
            <div class="about-foot">
                <div class="title">
                    项目总结
                </div>
                <ul>
                    <li>本人第一个vue项目</li>
                    <li>关于我们页面并未完成</li>
                    <li><a href="https://github.com/hai-27/vue-store">原作者项目入口</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>

</script>
<style scoped>
.about-v {
    background-color: #f5f5f5;
}

.about-v .header {
    background-color: #fff;
    border-bottom: 2px solid #ff6700;
}

.about-v .header .title {
    width: 1225px;
    margin: 0 auto;
    height: 64px;
    line-height: 64px;
}

.about-v .header .title h1 {
    font-size: 28px;
    color: black;
    padding: 0 40px;
}

.about-v .about-content {
    width: 1225px;
    margin: 0 auto;
    background-color: #fff;
    padding: 0 40px;
}

.about-content .about-head {
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #eaecef;
}

.about-content .about-head h1 {
    font-size: 30px;
    color: black;
}



.about-content .about-main .title {
    font-size: 25px;
    height: 80px;
    color: black;
    border-bottom: 1px solid #eaecef;
    line-height: 80px;
}

.about-main ul {
    margin-top: 30px;
    border-bottom: 1px solid #eaecef;
}

.about-main ul li {
    margin-top: 20px;
    font-size: 20px;
    margin-bottom: 30px;
}

.about-foot .title {
    font-size: 25px;
    height: 80px;
    color: black;
    border-bottom: 1px solid #eaecef;
    line-height: 80px;
}

.about-foot ul li {
    margin-top: 20px;
    font-size: 20px;
    margin-bottom: 30px;
}

.about-foot ul li a {
    color: #ff6700;
}
</style>