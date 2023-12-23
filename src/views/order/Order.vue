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
            <div v-for="(order, index) in orders" :key="index" class="main">
                <orderitem :order="order"></orderitem>
                <div class="order-last">
                    <div class="last-left">
                        <span class="order-total">
                            共
                            <span class="order-total-num">{{ allsum[index].allnum }}</span> 件商品
                        </span>
                    </div>
                    <div class="last-right">
                        <span v-if="order[0].order_status === 0">
                            <span class="total-price-pay">还未支付：</span>
                            <a href="javascript:;" @click="orderPay(1, order[0].order_id)" class="total-pay">去支付</a>
                        </span>
                        <span v-else>
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
import orderitem from './Order-item.vue'
import { getMyOrder } from '/src/service/index'
import { orderPay } from '/src/service/index'
import { ElMessage } from 'element-plus'
export default {
    components: {
        orderitem,
    },
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
        getMyOrder().then(res => {
            this.orders = res.data.orders
            for (let i = 0; i < this.orders.length; i++) {
                const item = this.orders[i]
                for (let j = 0; j < item.length; j++) {
                    const orderDate = new Date(item[0].order_time)
                    let year = orderDate.getFullYear()
                    const month = orderDate.getMonth() + 1
                    const day = orderDate.getDate()
                    const hours = orderDate.getHours()
                    const minutes = orderDate.getMinutes()
                    const seconds = orderDate.getSeconds()
                    const nowTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                    item[0].orderTime = nowTime
                }
            }
        }
        )
    },
    methods: {
        orderPay(order_status, order_id) {
            orderPay(order_status, order_id).then(res => {
                window.location.reload();
                ElMessage({
                    message: res.data.msg,
                    type: 'success',
                })
            }).catch(err => {
                console.log(err);
            })
        }
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

.order-last .last-right .total-price {
    color: #ff6700;
    font-size: 30px;
}

.order-last .last-left .order-total {
    color: #757575;
}

.order-last .last-left .order-total-num {
    color: #ff6700;
}

a {
    font-size: 20px;
}

a:hover {
    color: #ff6700;
    text-decoration: underline;
}

.total-price-pay {
    color: #757575;
    font-size: 14px;
}
</style>