<template>
    <!-- 首页商品列表渲染 -->
    <div class="myList">
        <ul>
            <li v-for="item in list" :key="item.product_id">
                <router-link :to="{ path: '/details', query: { productID: item.product_id } }">
                    <img :src="item.product_picture" alt />
                    <h2>{{ item.product_name }}</h2>
                    <h3>{{ item.product_title }}</h3>
                    <p>
                        <span> {{ item.product_selling_price }}</span>
                        <span class="del"> {{ item.product_price }}</span>
                    </p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'MyList',
    // 我们将父组件中得到的数据动态赋值给List 再将List传到子组件
    props: ['list'],
    data() {
        return {}
    },
}

</script>
<style>
.myList ul li {
    z-index: 1;
    float: left;
    width: 224px;
    height: 299px;
    padding: 10px 0;
    margin: 0 0 14.5px 13px;
    background-color: white;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    position: relative;
    list-style: none;
}

.myList ul li:hover {
    z-index: 2;
    -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
}

.myList ul li img {
    display: block;
    width: 160px;
    height: 160px;
    margin: 0 auto;
}

.myList ul li h2 {
    text-align: center;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 25px 10px 0px;
    font-size: 16px;
    color: #000;
}

.myList ul li h3 {
    margin: 5px 10px;
    height: 18px;
    font-size: 12px;
    color: #b0b0b0;
    text-align: center;
}

.myList ul li p {
    margin: 10px 10px 10px;
    text-align: center;
    color: #ff6700;
}

.myList ul li p .del {
    color: #b0b0b0;
    margin-left: 0.5em;
    text-decoration: line-through;
}
</style>