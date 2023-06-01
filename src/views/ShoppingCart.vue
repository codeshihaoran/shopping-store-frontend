<template>
    <div class="shoppingCart">
        <div class="cart-header">
            <div class="cart-header-content">
                <p>
                    <i class="el-icon-shopping-cart-full" style="color:#ff6700; font-weight: 600;"></i>
                    我的购物车
                </p>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
            </div>
        </div>
        <!-- 购物车由内容 -->
        <div class="content" v-if="this.$store.getters.getShoppingCart.length > 0">
            <ul>
                <!-- 购物车表头 -->
                <li class="header">
                    <div class="pro-check">
                        <el-checkbox v-model="isAllcheck"
                            @change="value => { this.$store.commit('updateCartAllcheckbox', { checkbox: value }) }">全选</el-checkbox>
                    </div>
                    <div class="pro-img"></div>
                    <div class="pro-name" @click="logcart">商品名称</div>
                    <div class="pro-price">单价</div>
                    <div class="pro-num">数量</div>
                    <div class="pro-total">小计</div>
                    <div class="pro-action">操作</div>
                </li>
                <li class="product-list" v-for="(item, index) in this.$store.getters.getShoppingCart" :key="item.id">
                    <div class="pro-check">
                        <el-checkbox v-model="item.checkbox"
                            @change="value => { this.$store.commit('updateCartItemcheckbox', { id: item.id, checkbox: value }) }"></el-checkbox>
                    </div>
                    <div class="pro-img">
                        <router-link :to="{ path: '/allstore/details', query: { productID: item.productID } }">
                            <img :src="/api/ + item.productImg" />
                        </router-link>
                    </div>
                    <div class="pro-name">
                        <router-link :to="{ path: '/allstore/details', query: { productID: item.productID } }">{{
                            item.productName }}</router-link>
                    </div>
                    <div class="pro-price">{{ item.price }}元</div>
                    <div class="pro-num">
                        {{ item.num }}
                    </div>
                    <div class="pro-total pro-total-in">{{ item.price * item.num }}元</div>
                    <div class="pro-action">
                        <el-button @click="deleteNum(item.id, item.productID)">删除</el-button>
                    </div>
                </li>
            </ul>
            <div style="height:20px;background-color: #f5f5f5"></div>

            <div class="cart-bar">
                <div class="cart-bar-left">
                    <span>
                        <router-link to="/allstore">继续购物</router-link>
                    </span>
                    <span class="sep">|</span>
                    <span class="cart-total">
                        共
                        <span class="cart-total-num">{{ this.$store.getters.getSum }}</span> 件商品，已选择
                        <span class="cart-total-num">{{ this.$store.getters.getCheckProductsSum }}</span> 件
                    </span>
                </div>
                <div class="cart-bar-right">
                    <span>
                        <span class="total-price-title">合计：</span>
                        <span class="total-price">{{ this.$store.getters.getCheckedProductsPriceSum }}元</span>
                    </span>
                    <!-- 当有商品时 此按钮才能被点击 -->
                    <router-link :to="this.$store.getters.getCheckProductsSum > 0 ? '/confirmOrder' : ''">
                        <div :class="this.$store.getters.getCheckProductsSum > 0 ? 'btn-primary' : 'btn-primary-disabled'">
                            去结算</div>
                    </router-link>
                </div>
            </div>

        </div>
        <!-- 内容结束 -->

        <!-- 购物车无内容 -->
        <div v-else class="cart-empty">
            <div class="empty">
                <h2>您的购物车还是空的！</h2>
                <p>快去购物吧！</p>
            </div>
        </div>
        <!-- 无内容结束 -->
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getMyShopping } from '../service/index'
export default {
    data() {
        return {}

    },
    computed: {
        isAllcheck() {
            return this.$store.getters.getisAllcheck
        },

    },
    methods: {
        logcart() {
            console.log(this.$store.getters.getShoppingCart);
        },
        deleteNum(id, productID) {
            // 点击删除按钮删除某个商品
            getMyShopping(productID, this.$store.state.user.user.user_id).then(res => {
                this.$store.commit('deleteProducts', id)
                ElMessage({
                    message: '成功, 你已成功将该商品删除.',
                    type: 'success',
                })

            })

        },

    }
}
</script>
<style scoped>
.shoppingCart {
    background-color: #f5f5f5;
    padding-bottom: 20px;
}

.shoppingCart .cart-header {
    height: 64px;
    border-bottom: 2px solid #ff6700;
    background-color: #fff;
    margin-bottom: 20px;
}

.shoppingCart .cart-header .cart-header-content {
    width: 1225px;
    margin: 0 auto;
}

.shoppingCart .cart-header p {
    font-size: 28px;
    line-height: 58px;
    float: left;
    font-weight: normal;
    color: #424242;
}

.shoppingCart .cart-header span {
    color: #757575;
    font-size: 12px;
    float: left;
    height: 20px;
    line-height: 20px;
    margin-top: 30px;
    margin-left: 15px;
}



.shoppingCart .cart-empty {
    width: 1225px;
    margin: 0 auto;
}

.shoppingCart .cart-empty .empty {
    height: 300px;
    padding: 0 0 130px 558px;
    margin: 65px 0 0;
    background: url(../assets/cart-empty.png) no-repeat 124px 0;
    color: #b0b0b0;
    overflow: hidden;
}

.shoppingCart .cart-empty .empty h2 {
    margin: 70px 0 15px;
    font-size: 36px;
}

.shoppingCart .cart-empty .empty p {
    margin: 0 0 20px;
    font-size: 20px;
}

.shoppingCart .content {
    width: 1225px;
    margin: 0 auto;
    background-color: #fff;
}

.shoppingCart .content ul {
    background-color: #fff;
    color: #424242;
    line-height: 85px;
}

.shoppingCart .content ul .header {
    height: 85px;
    padding-right: 26px;
    color: #424242;
}

.shoppingCart .content ul li {
    list-style: none;
}

.shoppingCart .content ul .product-list {
    height: 120px;
    padding: 15px 26px 15px 0;
    border-top: 1px solid #e0e0e0;
}

.shoppingCart .content ul .pro-check {
    float: left;
    height: 85px;
    width: 110px;
}

.shoppingCart .content ul .pro-check .el-checkbox {
    font-size: 16px;
    margin-left: 24px;
}

.shoppingCart .content ul .pro-img {
    float: left;
    height: 85px;
    width: 120px;
}

.shoppingCart .content ul .pro-img img {
    height: 70px;
    width: 70px;
}

.shoppingCart .content ul .pro-name {
    float: left;
    width: 380px;
}

.shoppingCart .content ul .pro-name a {
    color: #424242;
}

.shoppingCart .content ul .pro-name a:hover {
    color: #ff6700;
}

.shoppingCart .content ul .pro-price {
    float: left;
    width: 140px;
    padding-right: 18px;
    text-align: center;
}

.shoppingCart .content ul .pro-num {
    float: left;
    width: 120px;
    text-align: center;
}

.shoppingCart .content ul .pro-total {
    float: left;
    width: 120px;
    padding-right: 5px;
    text-align: right;
}

.shoppingCart .content ul .pro-total-in {
    color: #ff6700;
}

.shoppingCart .content ul .pro-action {
    float: right;
    width: 80px;
    text-align: center;
}

.shoppingCart .cart-bar {
    width: 1225px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}

.shoppingCart .cart-bar .cart-bar-left {
    float: left;
}

.shoppingCart .cart-bar .cart-bar-left a {
    line-height: 50px;
    margin-left: 32px;
    color: #757575;
}

.shoppingCart .cart-bar .cart-bar-left a:hover {
    color: #ff6700;
}

.shoppingCart .cart-bar .cart-bar-left .sep {
    color: #eee;
    margin: 0 20px;
}

.shoppingCart .cart-bar .cart-bar-left .cart-total {
    color: #757575;
}

.shoppingCart .cart-bar .cart-bar-left .cart-total-num {
    color: #ff6700;
}

.shoppingCart .cart-bar .cart-bar-right {
    float: right;
}

.shoppingCart .cart-bar .cart-bar-right .total-price-title {
    color: #ff6700;
    font-size: 14px;
}

.shoppingCart .cart-bar .cart-bar-right .total-price {
    color: #ff6700;
    font-size: 30px;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary {
    float: right;
    width: 200px;
    text-align: center;
    font-size: 18px;
    margin-left: 50px;
    background: #ff6700;
    color: #fff;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
    float: right;
    width: 200px;
    text-align: center;
    font-size: 18px;
    margin-left: 50px;
    background: #e0e0e0;
    color: #b0b0b0;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary:hover {
    background-color: #f25807;
}
</style>