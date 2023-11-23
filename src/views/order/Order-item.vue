<template>
    <ul>
        <li class="info">
            <div class="order-id">
                订单编号：{{ order[0].order_id }}
            </div>
            <div class="order-time">
                订单时间：{{ order[0].order_time }}
            </div>
        </li>
        <li class="header">
            <div class="null"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
        </li>
        <li v-for="(product, i) in order" :key="i" class="product-list">
            <div class="pro-img">
                <router-link :to="{ path: '/allstore/details', query: { productID: product.product_id } }">
                    <img :src="/api/ + product.product_picture" alt="">
                </router-link>
            </div>
            <div class="pro-name">
                <router-link :to="{ path: '/allstore/details', query: { productID: product.product_id } }">
                    {{ product.product_name }}
                </router-link>
            </div>
            <div class="pro-price">{{ product.product_price }}元</div>
            <div class="pro-num">{{ product.product_num }}</div>
            <div class="pro-total pro-total-in">{{ product.product_num * product.product_price }}元</div>
        </li>
    </ul>
    <div class="order-last">
        <div class="last-left">
            <span class="order-total">
                共
                <span class="order-total-num">1</span> 件商品
            </span>
        </div>
        <div class="last-right">
            <span>
                <span class="total-price-title">合计：</span>
                <span class="total-price">2元</span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: ['order'],
    data() {
        return {
        }
    },
    computed: {
        productTotalNum: () => {

        },
        productTotalprice: () => {

        }
    },
    mounted() {

    }
}
</script>
<style scoped>
.main {
    width: 1225px;
    margin: 0 auto;
    background-color: #fff;
    margin-bottom: 50px;
}

ul {
    padding-inline-start: 0px;
}

ul li {
    list-style-type: none;

}

.info {
    list-style-type: none;
    height: 60px;
    line-height: 60px;
    padding: 0 26px;
    color: #424242;
    border-bottom: 1px solid #ff6700;
}

.info .order-id {
    float: left;
    color: #ff6700;
}

.info .order-time {
    float: right;
}

.header {
    height: 85px;
    padding-right: 26px;
    color: #424242;
    line-height: 85px;

}

.header .null {
    float: left;
    height: 85px;
    width: 200px;
    padding-left: 80px;
}

.header .pro-name {
    float: left;
    width: 380px;
}

.header .pro-price {
    float: left;
    width: 160px;
    padding-right: 18px;
    text-align: center;
}

.header .pro-num {
    float: left;
    width: 190px;
    text-align: center;
}

.header .pro-total {
    float: left;
    width: 250px;
    padding-right: 81px;
    text-align: right;
}

.product-list {
    height: 105px;
    padding: 15px 26px 15px 0;
    border-top: 1px solid #e0e0e0;

}

.product-list .pro-img {
    float: left;
    height: 85px;
    width: 200px;
    padding-left: 80px;
}

.product-list .pro-img img {
    height: 80px;
    width: 80px;
}

.product-list .pro-name {
    float: left;
    width: 380px;
    height: 85px;
    line-height: 85px;
}

.product-list .pro-price {
    float: left;
    width: 160px;
    padding-right: 18px;
    text-align: center;
    height: 85px;
    line-height: 85px;
}

.product-list .pro-num {
    float: left;
    width: 190px;
    text-align: center;
    height: 85px;
    line-height: 85px;
}

.product-list .pro-total {
    float: left;
    width: 250px;
    padding-right: 81px;
    text-align: right;
    height: 85px;
    line-height: 85px;
}

.product-list .pro-total-in {
    color: #ff6700;
}

.order-last {
    width: 1225px;
    padding: 0 20px;
    border-top: 1px solid #ff6700;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}

.order-last .last-left {
    float: left;
}

.order-last .last-right {
    float: right;
}

.order-last .last-right .total-price-title {
    color: #ff6700;
    font-size: 14px;
}

.main .order-last .last-right .total-price {

    color: #ff6700;
    font-size: 30px;
}

.main .order-last .last-left .order-total {

    color: #757575;
}

.main .order-last .last-left .order-total-num {
    color: #ff6700;
}
</style>