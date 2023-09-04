<!-- 确认订单页面 -->

<template>
    <div class="confirm-order">
        <!-- 确认订单页面头部 -->
        <div class="confirm-header">
            <div class="confirm-header-content">
                <p>
                    <i class="el-icon-s-order" style="font-size: 30px;color: #ff6700;"></i>
                    确认订单
                </p>
            </div>
        </div>
        <!-- 确认订单结束 -->
        <!-- 确认订单内容 -->
        <div class="confirm-main">
            <div class="confirm-mainer">
                <!-- 个人信息内容 -->
                <div class="information">
                    <p class="address">收货地址</p>
                    <div class="box">
                        <div v-for="item in list" :key="item.id" class="three"
                            :class="item.id == confirmAddress ? 'in-section' : ''">
                            <p class="address">{{ item.name }}</p>
                            <p class="num">{{ item.number }}</p>
                            <p class="num">{{ item.address }}</p>
                        </div>
                    </div>
                </div>
                <!-- 个人信息内容结束 -->

                <!-- 商品信息内容 -->
                <div class="list-information">
                    <div class="title">
                        商品及优惠劵
                    </div>
                    <div class="list">
                        <ul>
                            <li v-for="item in this.$store.getters.getCheckedProducts" :key="item.id">
                                <img :src="item.productImg" alt="">
                                <span class="pro-name">{{ item.productName }}</span>
                                <span class="pro-price">{{ item.price }}元 X {{ item.num }}</span>
                                <span class="pro-status"></span>
                                <span class="pro-total">{{ item.price * item.num }}元</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 商品信息内容结束 -->

                <!-- 配送内容 -->
                <div class="delivery">
                    <p class="title">配送方式</p>
                    <p class="shipping">包邮</p>
                </div>
                <!-- 配送内容结束 -->

                <!-- 发票内容 -->
                <div class="monney">
                    <p class="title">发票</p>
                    <p class="bill">电子发票</p>
                    <p class="own">个人</p>
                    <p class="store">商品明细</p>
                </div>
                <!-- 发票内容结束 -->

                <!-- 商品价格内容 -->

                <div class="pro-info">
                    <div class="monney-box">
                        <ul>
                            <li>
                                <span class="title">商品总数：</span>
                                <span class="value">{{ this.$store.getters.getCheckedProductsSum }}件</span>
                            </li>
                            <li>

                                <span class="title">商品总价：</span>
                                <span class="value">{{ this.$store.getters.getCheckedProductsPriceSum }}元</span>
                            </li>
                            <li>
                                <span class="title">活动优惠：</span>
                                <span class="value">-0元</span>
                            </li>
                            <li><span class="title">优惠券抵扣：</span>
                                <span class="value">-0元</span>
                            </li>
                            <li><span class="title">运费：</span>
                                <span class="value">0元</span>
                            </li>
                            <li class="last"><span class="title">应付总额：</span>
                                <span class="value">
                                    <span class="total-price">{{ this.$store.getters.getCheckedProductsPriceSum }}</span>元
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 商品价格内容结束 -->
            </div>
            <div class="btn">
                <div class="btnnn">
                    <router-link to="/shoppingCart" class="btn-base btn-return">返回购物车</router-link>
                    <a href="javascript:;" class="btn-base btn-primary" @click="addOrder">结算</a>
                </div>
            </div>
        </div>
        <!-- 确定订单内容结束 -->

    </div>
</template>

<script>
import { addMyOrder } from '../service/index';
export default {
    data() {
        return {
            confirmAddress: 1,
            list: [
                {
                    id: 1,
                    name: '石同学',
                    number: '18393481934',
                    address: '甘肃省 兰州市 兰州城市学院'
                },
                {
                    id: 2,
                    name: '石同学',
                    number: '18393481934',
                    address: '甘肃省 陇南市 **县 **镇 '
                },
                {
                    id: 3,
                    name: '###',
                    number: '###',
                    address: '请添加新的收获地址'
                },
            ]
        }
    },
    mounted() {
        if (this.$store.getters.getCheckNum < 1) {
            this.$router.push({ path: '/shoppingCart' })
        }
    },
    methods: {
        addOrder() {
            console.log('选中的商品：', this.$store.getters.getCheckedProducts);
            // 获取加入我的订单的数据
            // 结算后要跳转到我的订单页面 并前将勾选的商品id删除
            addMyOrder(this.$store.getters.getCheckedProducts).then(() => {
                let products = this.$store.getters.getCheckedProducts
                // this.$store.commit(' deleteStore', res.data.products.id)
                for (let i = 0; i < products.length; i++) {
                    const temp = products[i]
                    this.$store.commit('deleteProducts', temp.id)
                }
                this.$router.push({ path: '/order' })
            })
        }
    }
}
</script>
<style scoped>
.confirm-order {
    background-color: #f5f5f5;
    padding-bottom: 20px;
}

.confirm-order .confirm-header {
    height: 64px;
    border-bottom: 2px solid #ff6700;
    background-color: #fff;
    margin-bottom: 20px;
}

.confirm-order .confirm-header .confirm-header-content {
    width: 1225px;
    margin: 0 auto;
}

.confirm-order .confirm-header p {
    font-size: 28px;
    line-height: 58px;
    float: left;
    font-weight: normal;
    color: #424242;
}

.confirm-main {
    width: 1225px;
    margin: 0 auto;
    background-color: #fff;
    padding: 48px 0 0;
}

.confirm-main .confirm-mainer {
    border-bottom: 1px solid #e0e0e0;
}

.confirm-main .information {
    margin: 0 48px;
    overflow: hidden;
}

.confirm-main .information .address {
    color: #333;
    font-size: 18px;
    margin-bottom: 20px;
    line-height: 20px;
}

.confirm-main .information .box .three {
    float: left;
    width: 250px;
    height: 190px;
    border: 1px solid #e0e0e0;
    padding: 15px 24px 0;
    margin-right: 17px;
    margin-bottom: 24px;
}

.confirm-main .information .box .in-section {
    border: 1px solid #ff6700;
}

.confirm-main .information .box .three .light {
    border: 1px solid #ff6700;
}

.confirm-main .information .box .three p {
    margin-bottom: 10px;
}

.confirm-main .information .box .three .num {
    font-size: 14px;
    color: #757575;
}

.list-information {
    margin: 0 48px;
}

.list-information .title {
    color: #333;
    font-size: 18px;
    line-height: 40px;
}

.list-information .list {
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 5px 0;

}

.list-information .list ul {
    padding-left: 0px;
}

.list-information .list li {
    padding: 10px 0;
    color: #424242;
    overflow: hidden;
}

.list-information .list li img {
    float: left;
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.list-information .list li .pro-name {
    float: left;
    width: 650px;
    line-height: 30px;
}

.list-information .list li .pro-price {
    float: left;
    width: 150px;
    text-align: center;
    line-height: 30px;
}

.list-information .list li .pro-status {
    float: left;
    width: 99px;
    height: 30px;
    text-align: center;
    line-height: 30px;
}

.list-information .list li .pro-total {
    float: left;
    width: 190px;
    text-align: center;
    color: #ff6700;
    line-height: 30px;
}

.delivery {
    margin: 0 48px;
    padding: 25px 0;
    overflow: hidden;
    border-bottom: 1px solid #e0e0e0;
}

.delivery .title {
    float: left;
    width: 150px;
    color: #333;
    font-size: 18px;
    line-height: 38px;
}

.delivery .shipping {
    float: left;
    line-height: 38px;
    font-size: 14px;
    color: #ff6700;
}

.monney {
    margin: 0 48px;
    padding: 25px 0;
    overflow: hidden;
    border-bottom: 1px solid #e0e0e0;
}

.monney .title {
    float: left;
    width: 150px;
    color: #333;
    font-size: 18px;
    line-height: 38px;
}

.monney .bill {
    margin-right: 20px;
    float: left;
    line-height: 38px;
    font-size: 14px;
    color: #ff6700;
}

.monney .own {
    margin-right: 20px;
    float: left;
    line-height: 38px;
    font-size: 14px;
    color: #ff6700;
}

.monney .store {
    margin-right: 20px;
    float: left;
    line-height: 38px;
    font-size: 14px;
    color: #ff6700;
}

.pro-info {
    margin: 0 48px;
    overflow: hidden;
    padding: 20px 0;
}

.pro-info .monney-box {
    float: right;
}

.pro-info .monney-box ul li {
    list-style: none;
    text-align: right;
}

.pro-info .monney-box ul li .title {
    width: 126px;
    height: 30px;
    float: left;
    display: block;
    line-height: 30px;
    color: #757575;
}

.pro-info .monney-box ul li .value {
    float: right;
    display: block;
    min-width: 105px;
    color: #ff6700;
    height: 30px;
    line-height: 30px;
}

.pro-info .monney-box .last .title {
    padding-top: 15px;
}

.pro-info .monney-box .last .value {
    padding-top: 10px;
}

.pro-info .monney-box .last .value .total-price {
    font-size: 30px;
}

.btn {
    padding: 20px 48px;
    overflow: hidden;
}

.btn .btnnn {
    float: right;
}

.btn .btnnn .btn-base {
    float: left;
    margin-left: 30px;
    width: 158px;
    height: 38px;
    border: 1px solid #b0b0b0;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
}

.btn .btnnn .btn-return {
    color: rgba(0, 0, 0, 0.27);
    border-color: rgba(0, 0, 0, 0.27);
}

.btn .btnnn .btn-primary {
    background: #ff6700;
    border-color: #ff6700;
    color: #fff;
}
</style>


