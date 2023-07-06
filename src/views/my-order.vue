<!-- 我的订单页面 -->
<template>
    <div class="order">
        <!-- 订单页面头部 -->
        <div class="order-header">
            <div class="order-header-content">
                <p>
                    <i class="el-icon-s-order" style="font-size: 30px;color: #ff6700;"></i>
                    我的订单
                </p>
            </div>
        </div>
        <!-- 订单页面头部结束 -->


        <!-- 主内容区域 -->
        <!-- 有订单信息时 -->
        <div v-if="orders.length > 0" class="order-main">
            <div v-for="(item, index) in orders" :key="index" class="main">
                <ul>
                    <li class="info">
                        <div class="order-id">
                            订单编号：{{ item[0].order_id }}
                        </div>
                        <div class="order-time">
                            订单时间：{{ item[0].order_time }}
                        </div>
                    </li>
                    <li class="header">
                        <div class="null"></div>
                        <div class="pro-name">商品名称</div>
                        <div class="pro-price">单价</div>
                        <div class="pro-num">数量</div>
                        <div class="pro-total">小计</div>
                    </li>
                    <li v-for="(product, i) in item" :key="i" class="product-list">
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
                            <span class="order-total-num">{{ allsum[index].allnum }}</span> 件商品
                        </span>
                    </div>
                    <div class="last-right">
                        <span>
                            <span class="total-price-title">合计：</span>
                            <span class="total-price">{{ allsum[index].allprice }}元</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 订单信息结束 -->

        <!-- 无订单信息时 -->
        <div v-else class="order-empty">
            <div class="empty">
                <h2>您的订单还是空的!</h2>
                <p>快去购物吧</p>
            </div>
        </div>
        <!-- 无订单信息结束 -->
        <!-- 主内容区域结束 -->
    </div>
</template>


<script>
import { getMyOrder } from '../service/index'
export default {
    data() {
        return {
            orders: [],
            allsum: []
        }
    },
    watch: {
        orders: function (val) {
            let allsum = []
            for (let i = 0; i < val.length; i++) {
                const firstArr = val[i]
                let allnum = 0
                let allprice = 0
                for (let j = 0; j < firstArr.length; j++) {
                    const temp = firstArr[j]
                    allnum = allnum + temp.product_num
                    allprice = allprice + temp.product_num * temp.product_price
                }
                allsum.push({ allnum, allprice })
            }
            this.allsum = allsum
        }
    },
    mounted() {
        getMyOrder(this.$store.state.user.user.user_id).then(res => {
            this.orders = res.data.orders
        })
    }
}
</script>
<style scoped>
.order {
    background-color: #f5f5f5;
    padding-bottom: 20px;
}

.order .order-header {
    height: 64px;
    border-bottom: 2px solid #ff6700;
    background-color: #fff;
    margin-bottom: 20px;
}

.order .order-header .order-header-content {
    width: 1225px;
    margin: 0 auto;
}

.order .order-header p {
    font-size: 28px;
    line-height: 58px;
    float: left;
    font-weight: normal;
    color: #424242;
}


.order-empty {
    width: 1225px;
    margin: 0 auto;
}

.order-empty .empty {
    height: 300px;
    padding: 0 0 130px 558px;
    margin: 65px 0 0;
    background: url(../assets/cart-empty.png) no-repeat 124px 0;
    color: #b0b0b0;
    overflow: hidden;
}

.order-empty .empty h2 {
    margin: 70px 0 15px;
    font-size: 36px;
}

.order-empty .empty p {
    margin: 0 0 20px;
    font-size: 20px;
}

.order-main .main {
    width: 1225px;
    margin: 0 auto;
    background-color: #fff;
    margin-bottom: 50px;
}

.main ul {
    padding-inline-start: 0px;
}

.main ul li {
    list-style-type: none;

}

.main .info {
    list-style-type: none;
    height: 60px;
    line-height: 60px;
    padding: 0 26px;
    color: #424242;
    border-bottom: 1px solid #ff6700;
}

.main .info .order-id {
    float: left;
    color: #ff6700;
}

.main .info .order-time {
    float: right;
}

.main .header {
    height: 85px;
    padding-right: 26px;
    color: #424242;
    line-height: 85px;

}

.main .header .null {
    float: left;
    height: 85px;
    width: 200px;
    padding-left: 80px;
}

.main .header .pro-name {
    float: left;
    width: 380px;
}

.main .header .pro-price {
    float: left;
    width: 160px;
    padding-right: 18px;
    text-align: center;
}

.main .header .pro-num {
    float: left;
    width: 190px;
    text-align: center;
}

.main .header .pro-total {
    float: left;
    width: 250px;
    padding-right: 81px;
    text-align: right;
}

.main .product-list {
    height: 105px;
    padding: 15px 26px 15px 0;
    border-top: 1px solid #e0e0e0;

}

.main .product-list .pro-img {
    float: left;
    height: 85px;
    width: 200px;
    padding-left: 80px;
}

.main .product-list .pro-img img {
    height: 80px;
    width: 80px;
}

.main .product-list .pro-name {
    float: left;
    width: 380px;
    height: 85px;
    line-height: 85px;
}

.main .product-list .pro-price {
    float: left;
    width: 160px;
    padding-right: 18px;
    text-align: center;
    height: 85px;
    line-height: 85px;
}

.main .product-list .pro-num {
    float: left;
    width: 190px;
    text-align: center;
    height: 85px;
    line-height: 85px;
}

.main .product-list .pro-total {
    float: left;
    width: 250px;
    padding-right: 81px;
    text-align: right;
    height: 85px;
    line-height: 85px;
}

.main .product-list .pro-total-in {
    color: #ff6700;
}

.main .order-last {
    width: 1225px;
    padding: 0 20px;
    border-top: 1px solid #ff6700;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}

.main .order-last .last-left {
    float: left;
}

.main .order-last .last-right {
    float: right;
}

.main .order-last .last-right .total-price-title {
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