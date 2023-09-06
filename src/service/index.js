import axios from "axios"

// 首页轮播图接口
export const getHomeCarouselData = () => axios({
    method: 'post',
    url: 'api/resources/carousel'
})
// 首页商品数据接口
export const getHomeShoppingData = (api, Productcategory) => axios({
    method: 'post',
    url: api,
    data: {
        categoryName: Productcategory
    }
})
// 全部商品列表页数据
export const getAllCategoryList = () => axios({
    method: "post",
    url: "/api/product/category/get"
})
// 获取全部商品或者列表商品数据
export const getSomeData = (api, categoryID, currentPage, pageSize) => axios({
    method: 'post',
    url: api,
    data: {
        categoryId: categoryID,
        currentPage: currentPage,
        pageSize: pageSize,
    }
})
// 商品信息数据
export const getDetailsInfo = (productID) => axios({
    method: 'post',
    url: '/api/product/details/get',
    data: {
        productId: productID
    }
})
// 商品照片数据
export const getDetailsPictureInfo = (productID) => axios({
    method: 'post',
    url: '/api/product/detailsPicture/get',
    data: {
        productId: productID
    }
})
// 添加购物车接口
export const addMyShopping = (product_id) => axios({
    method: 'post',
    url: '/api/user/shoppingCart/add',
    data: {
        product_id: product_id
    }
})
// 添加我的收藏接口
export const addMyCollect = (product_id) => axios({
    method: 'post',
    url: '/api/user/collect/add',
    data: {
        product_id: product_id,
    }
})
// 我的收藏接口
export const getCollect = () => axios({
    method: "post",
    url: "/api/user/collect/get",
})
// 我的添加订单接口
export const addMyOrder = (products) => axios({
    method: 'post',
    url: '/api/user/order/add',
    data: {
        products: products
    }
})
// 我的订单接口
export const getMyOrder = () => axios({
    method: 'post',
    url: '/api/user/order/get',
})
// 购物车接口
export const deleteMyShoppingcCart = (product_id) => axios({
    method: 'post',
    url: '/api/user/shoppingCart/delete',
    data: {
        product_id: product_id,
    }
})
// 监听购物车更新
export const updateMyShoppingCart = () => axios({
    method: 'post',
    url: '/api/user/shoppingCart/get',
})
// 登录接口
export const loginUser = (userName, password) => axios({
    method: 'post',
    url: '/api/users/login',
    data: {
        userName: userName,
        password: password
    }
})
// 注册接口
export const registerUser = (userName, password) => axios({
    method: 'post',
    url: '/api/users/register',
    data: {
        userName: userName,
        password: password,
    }
})

// 注册验证接口
export const checkRegister = (userName) => axios({
    method: 'post',
    url: '/api/users/findUserName',
    data: {
        userName: userName
    }
})
