<template>
    <!-- 首页完成 -->

    <!-- 首页轮播图 -->
    <div class="home">
        <div class="head">
            <div class="block">
                <el-carousel height="460px">
                    <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
                        <img style="height:460px;" :src="/api/ + item.imgPath" :alt="item.describes" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="main-box">
            <div class="main">
                <!-- 手机展示 -->
                <div class="phone">
                    <div class="box-hd">
                        <div class="title">手机</div>
                    </div>
                    <div class="box-bd">
                        <div class="promo-list">
                            <router-link to>
                                <img style="height:615px" :src="/api/ + 'public/imgs/phone/phone.png'" />
                            </router-link>
                        </div>
                        <div class="list">
                            <MyList :list="phoneList"></MyList>
                        </div>
                    </div>
                </div>
                <!-- 手机区域展示完成 -->
                <!-- 家电区域 -->
                <div class="Houseware">
                    <div class="box-hd">
                        <div class="title">
                            家电
                        </div>
                        <div class="more">
                            <el-button type="text" @click="change(1)">热门</el-button>
                            <el-button type="text" @click="change(2)">电视影视</el-button>
                        </div>
                    </div>
                    <div class="box-bd">
                        <div class="promo-list">
                            <div class="images">
                                <div class="images-1">
                                    <img :src="/api/ + 'public/imgs/appliance/appliance-promo1.png'" alt="">
                                </div>

                                <div class="images-2">
                                    <img :src="/api/ + 'public/imgs/appliance/appliance-promo2.png'" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="list" v-if="homeType === 1">
                            <MyList :list="applianceList"></MyList>
                        </div>
                        <div class="list" v-else>
                            <MyList :list="miTvList"></MyList>
                        </div>
                    </div>
                    <!-- 家电展示区域完成 -->
                </div>
                <!-- 配件展示区域开始 -->
                <div class="accessory">
                    <div class="box-hd">
                        <div class="title">配件</div>
                        <div class="more" id="more">
                            <el-button type="text" @click="add(1)">热门</el-button>
                            <el-button type="text" @click="add(2)">保护套</el-button>
                            <el-button type="text" @click="add(3)">充电器</el-button>
                        </div>
                    </div>
                    <div class="box-bd">
                        <div class="promo-list">
                            <div class="images">
                                <div class="images-1">
                                    <img :src="/api/ + 'public/imgs/accessory/accessory-promo1.png'" alt="">
                                </div>

                                <div class="images-2">
                                    <img :src="/api/ + 'public/imgs/accessory/accessory-promo2.png'" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="list" v-if="peiJiType === 1">
                            <MyList :list="chargerList"></MyList>
                        </div>
                        <div class="list" v-else-if="peiJiType === 2">
                            <MyList :list="protectingShellList"></MyList>
                        </div>
                        <div class="list" v-else>
                            <MyList :list="accessoryList"></MyList>
                        </div>
                    </div>
                </div>
                <!-- 配件区域展示完成 -->
            </div>
        </div>
    </div>
</template>
<script>
import MyList from '../compentens/MyList.vue';
import axios from 'axios';
export default {
    components: {
        MyList,
    },
    data() {
        return {
            homeType: 1,
            peiJiType: 1,
            carousel: '',//轮播图数据
            phoneList: '',//手机数据
            miTvList: '',//小米电视数据
            applianceList: '',//家电数据
            protectingShellList: '',//保护套数据
            chargerList: '',//充电器数据
            accessoryList: '',//配件热门数据
        }
    },

    mounted() {
        // 获取轮播图数据
        axios({
            method: 'post',
            url: 'api/resources/carousel'
        }).then(res => {
            this.carousel = res.data.carousel
        }).catch(err => {
            return Promise.reject(err)
        });
        this.getPromo('手机', 'phoneList');//获取手机数据
        this.getPromo('电视机', 'miTvList');//获取电视机数据
        this.getPromo('保护套', 'protectingShellList');
        this.getPromo('充电器', 'chargerList');
        this.getPromo(
            ["电视机", "空调", "洗衣机"],
            "applianceList",
            "/api/product/getHotProduct"
        );//获取家电数据
        this.getPromo(
            ["保护套", "保护膜", "充电器", "充电宝"],
            "accessoryList",
            "/api/product/getHotProduct"
        );
        this.change(1)
    },
    methods: {

        add(icet) {
            this.peiJiType = icet
        },
        change(ite) {
            this.homeType = ite
        },
        // 获取各类商品数据时使用了一个封装的方法
        async getPromo(Productcategory, val, api) {
            api = api != undefined ? api : '/api/product/getPromoProduct';
            const res = await axios({
                method: 'post',
                url: api,
                data: {
                    categoryName: Productcategory
                }
            })
            this[val] = res.data.Product
        }
    }
}
</script>
<style scoped>
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.head {
    background-color: white;
}

.block {
    width: 1225px;
    margin: 0 auto;
}

.main-box {
    background-color: #f5f5f5;
    padding-bottom: 20px;
}

.main {
    width: 1225px;
    margin: 0 auto;
}

.box-hd {
    height: 58px;
    margin: 20px 0 0 0;
}

.box-hd .more {
    float: right;
    line-height: 58px;
}

.box-hd .title {
    float: left;
    color: #333;
    font-size: 22px;
    line-height: 58px;
    font-weight: 200;
}

.box-bd {
    height: 615px;
}

.box-bd .promo-list {
    float: left;
    height: 100%;
    width: 234px;
}

.box-bd .list {
    float: left;
    height: 615px;
    width: 991px;

}

.box-bd .promo-list .images img {
    width: 234px;
    height: 300px;
}

.box-bd .promo-list .images-1 {
    z-index: 1;
    width: 234px;
    height: 300px;
    margin-bottom: 14.5px;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
}

.box-bd .promo-list .images-1:hover {
    z-index: 2;
    -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
}

.box-bd .promo-list .images-2 {
    z-index: 1;
    width: 234px;
    height: 300px;
    margin-bottom: 14.5px;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
}

.box-bd .promo-list .images-2:hover {
    z-index: 2;
    -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
}
</style>