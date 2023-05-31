<!-- 商品详情页 -->
<template>
    <div id="details">
        <!-- 商品详情页头部开始 -->
        <div class="page-header">
            <div class="title">
                <p>{{ productDetails.product_name }}</p>
                <div class="list">
                    <ul>
                        <li><a href="#">概述</a></li>
                        <li><a href="#">参数</a></li>
                        <li><a href="#">用户评价</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 商品详情页头部完成 -->
        <!-- 内容区域开始 -->
        <div class="main">
            <!-- 轮播图 -->
            <div class="block">
                <el-carousel height="560px">
                    <el-carousel-item v-for="item in productPicture" :key="item">
                        <img :src="/api/ + item.product_picture" alt="">
                    </el-carousel-item>
                </el-carousel>

            </div>
            <!-- 轮播图结束 -->
            <!-- 手机内容区 -->
            <div class="content">

                <h1 class="name">{{ productDetails.product_name }}</h1>
                <p class="intro">{{ productDetails.product_intro }}</p>
                <div class="xiaomi">小米自营</div>
                <div class="price">
                    <span>{{ productDetails.product_selling_price + '元' }}</span>
                    <span class="other">{{ productDetails.product_price }}</span>
                </div>

                <div class="pro-list">
                    <span class="pro-name">{{ productDetails.product_name }}</span>
                    <span class="pro-price">
                        <span>{{ productDetails.product_selling_price + '元' }}</span>
                        <span class="other-pro">{{ productDetails.product_price + '元' }}</span>
                    </span>
                    <div class="sum">总价 : {{ productDetails.product_selling_price + '元' }}</div>
                </div>

                <div class="button">
                    <el-button class="shopcart" @click="addShoppingCart">加入购物车</el-button>
                    <el-button class="like" @click="addCollect">喜欢</el-button>
                </div>
                <div class="pro-policy">
                    <ul>
                        <li>
                            小米自营
                        </li>
                        <li>
                            小米发货
                        </li>
                        <li>
                            7天无理由退货
                        </li>
                        <li>
                            7天价格保护
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 内容区结束 -->
        </div>
        <!-- 内容区域结束 -->

    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getDetailsPictureInfo } from '../service/index'
import { getDetailsInfo } from '../service/index'
import { addMyCollect } from '../service/index'
import { addMyShopping } from '../service/index';
export default {
    data() {
        return {
            productID: '',// 商品传递的ID
            productDetails: '',// 商品详细信息数据
            productPicture: '',// 商品图片数据
        }
    },
    mounted() {
        // 利用路由获取商品id
        // this.productID
        if (this.$route.query.productID != undefined) {
            this.productID = this.$route.query.productID
        }

    },
    watch: {
        // 监听商品id
        productID: function (val) {
            this.getDetails(val)
            this.getDetailsPicture(val)
        }
    },
    methods: {
        // 获取商品详细信息数据
        getDetails() {
            getDetailsInfo(this.productID).then(res => {
                this.productDetails = res.data.Product[0]
            })
        },
        // 获取商品图片数据
        getDetailsPicture() {
            getDetailsPictureInfo(this.productID).then(res => {
                this.productPicture = res.data.ProductPicture
            })
        },
        addCollect() {
            // 判断用户是否登录
            if (!this.$store.state.user.user) {
                this.$store.commit('setShowLogin', true)
                return;
            }
            addMyCollect(this.productID, this.$store.state.user.user.user_id).then(res => {
                ElMessage({
                    message: '成功, 你已成功将该商品加入我的收藏.',
                    type: 'success',
                })
            })
        },
        addShoppingCart() {
            if (!this.$store.state.user.user) {
                this.$store.commit('setShowLogin', true)
                return;
            }
            addSMyhopping(this.$store.state.user.user.user_id, this.productID).then(res => {
                this.$store.commit('unshiftShoppingCart', res.data.shoppingCartData[0])
                ElMessage({
                    message: '成功, 你已成功将该商品加入我的购物车.',
                    type: 'success',
                })
            })
        }

    },


}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}

.page-header {
    height: 64px;
    margin-top: -20px;
    z-index: 4;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}

.page-header .title {
    width: 1225px;
    margin: 0 auto;
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    font-weight: 400;
    color: #212121;

}

.page-header .title p {
    float: left;
    font-size: 20px;
    font-weight: 400;
    color: #212121;
}

.page-header .title .list {
    height: 64px;
    float: right;
}

.page-header .title .list li {
    float: left;
    margin-left: 20px;
}

.page-header .title .list li a {
    font-size: 14px;
    color: #616161;
}

.page-header .title .list li a:hover {
    font-size: 14px;
    color: #ff6700;
}

.main {
    width: 1225px;
    height: 560px;
    margin: 0 auto;
    padding-top: 30px;
}

.main .block {
    float: left;
    width: 560px;
    height: 560px;
}

.block img {
    width: 560px;
    height: 560px;
}

.el-carousel .el-carousel__indicator .el-carousel__button {
    background-color: rgba(163, 163, 163, 0.8);
}

.main .content {
    float: right;
    width: 640px;
    margin-left: 25px;
}

.main .content .name {
    height: 30px;
    line-height: 30px;
    font-size: 25px;
    font-weight: 400;
    color: #212121;
}

.main .content .intro {
    color: #b0b0b0;
    padding-top: 10px;
    font-size: 16.5px;
}

.main .content .xiaomi {
    padding-top: 10px;
    color: #ff6700;
}

.main .content .price {
    font-size: 18px;
    color: #ff6700;
    border-bottom: 1px solid #e0e0e0;
    padding: 20px 0px 25px;
}

.main .content .price .other {
    margin-left: 10px;
    font-size: 14px;
    text-decoration: line-through;
    color: #b0b0b0;
}

.main .content .pro-list {
    background: #f9f9f9;
    padding: 30px 60px;
    margin: 50px 0 50px;
    height: 142px;
}

.main .content .pro-list .pro-name {
    float: left;
    font-size: 18px;
    color: #616161;
}

.main .content .pro-list .pro-price {
    float: right;
}

.main .content .pro-list .pro-price span {
    color: #616161;
    margin-left: 10px;
    font-size: 18px;
}

.main .content .pro-list .pro-price .other-pro {
    text-decoration: line-through;
}

.main .content .pro-list .sum {
    color: #ff6700;
    font-size: 26px;
    padding-top: 40px;

}

.main .content .button {
    height: 55px;
    margin: 10px 0px 20px 0px;
}

.main .content .button .el-button {
    height: 55px;
    font-size: 16px;
    border: none;
    text-align: center;
    color: #fff;
}

.main .content .button .shopcart {
    float: left;
    width: 340px;
    background-color: #ff6700;
}

.main .content .button .shopcart:hover {
    background-color: #f25807;
}

.main .content .button .like {
    float: right;
    width: 260px;
    background-color: #b0b0b0;
}

.main .content .button .like:hover {
    background-color: #757575;
}

.main .content .pro-policy li {
    float: left;
    margin-right: 20px;
    color: #b0b0b0;
}
</style>