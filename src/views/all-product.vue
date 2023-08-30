<template>
    <!-- 全部商品页面完成 -->


    <!-- 全部商品固定代码 -->
    <div class="header">
        <!-- el-ui面包屑 -->
        <div class="breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>全部商品</el-breadcrumb-item>
                <el-breadcrumb-item>分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 面包屑结束 -->

        <!-- 分类区 -->
        <div class="nav">
            <div class="product-nav">
                <div class="title">
                    分类
                </div>
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane v-for="item in categoryList" :key="item.category_id" :label="item.category_name"
                        :name="'' + item.category_id" />
                </el-tabs>
            </div>
        </div>
        <!-- 分类区结束 -->

        <!-- 主要内容区域 -->
        <div class="main">
            <div class="list">
                <MyList v-if="product.length > 0" :list="product"></MyList>
                <div v-else class="none-product">
                    抱歉没有找到相关的商品，请看看其他的商品
                </div>
            </div>
            <!-- 分页内容展示 -->
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
                    @current-change="currentChange"></el-pagination>
            </div>
            <!-- 分页内容结束 -->
        </div>
        <!-- 主要内容区域结束 -->



    </div>
</template>
<script>
import { getSomeData } from '../service/index';
import { getAllCategoryList } from '../service/index';
import MyList from '../compentens/product-list.vue';
export default {
    components: { MyList },
    data() {
        return {
            activeName: '0',//选项卡选定的tab
            categoryList: "", //分类列表数据
            product: '',//拿到的商品数据
            categoryID: [],//分类id
            total: 0,//商品总数
            currentPage: 1,//显示选中的分页
            pageSize: 15,//每个列表页定义最大数据
        };
    },
    watch: {
        // 监听分类标签 点击那个标签传过来的activeName的值 对应修改id的值 来显示相应的商品
        activeName: function (val) {
            if (val == 0) {
                this.categoryID = []
            }
            if (val > 0) {
                this.categoryID = [Number(val)]
            }
        },
        // 当categoryID的值被修改后 调用getData函数 获取相应的数据
        categoryID: function () {
            this.getData()
        },

    },
    mounted() {
        // 获取列表页数据
        getAllCategoryList().then(res => {
            const val = {
                category_id: 0,
                category_name: "全部",
            };
            const cate = res.data.category;
            cate.unshift(val);
            this.categoryList = cate;
        });
        // 在created生命周期中将categoryID长度为0
        // 然后调用getData函数获取全部商品数据 
        this.categoryID.length == 0
        this.getData()
    },
    methods: {
        // 获取全部商品数据或者列表页商品数据
        getData() {
            const api = this.categoryID.length == 0
                ? '/api/product/getAllProduct'
                : '/api/product/getProductByCategory'
            getSomeData(api, this.categoryID, this.currentPage, this.pageSize).then(res => {
                this.product = res.data.products
                this.total = res.data.total
            })
        },
        // 此处分页效果利用了@current-change点击事件
        // 传过去参数赋值给data中的currentPage
        // 然后根据分页的不同调用getData()获取数据
        currentChange(currentPage) {
            this.currentPage = currentPage
            this.getData()
        }

    }
}
</script>
<style scoped>
.header {
    background-color: #f5f5f5;
}

.header .breadcrumb {
    height: 50px;
    background-color: white;
}

.header .breadcrumb .el-breadcrumb {
    width: 1225px;
    font-size: 16px;
    margin: 0 auto;
    line-height: 30px;
}

.nav {
    width: 100%;
    height: 40px;
    background-color: white;
}

.header .nav .product-nav {
    width: 1225px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
}

.nav .product-nav .title {
    font-size: 16px;
    font-weight: 700;
    width: 50px;
    float: left;
}

.main {
    width: 1225px;
    margin: 0 auto;
}

.main .list {
    min-height: 650px;
    margin-left: -53.7px;
    padding-top: 14.5px;
    overflow: auto;
}

.main .none-product {
    padding-left: 53px;
    color: #333;
}

.main .pagination {
    display: flex;
    height: 50px;
    justify-content: center;
}
</style>