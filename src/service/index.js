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
    url: "/api/product/getCategory"
})
// 获取全部商品或者列表商品数据
export const getSomeData = (api, categoryID, currentPage, pageSize) => axios({
    method: 'post',
    url: api,
    data: {
        categoryID: categoryID,
        currentPage: currentPage,
        pageSize: pageSize,
    }
})
// 商品信息数据
export const getDetailsInfo = (productID) => axios({
    method: 'post',
    url: '/api/product/getDetails',
    data: {
        productID: productID
    }
})
// 商品照片数据
export const getDetailsPictureInfo = (productID) => axios({
    method: 'post',
    url: '/api/product/getDetailsPicture',
    data: {
        productID: productID
    }
})
// 添加购物车接口
export const addShopping = (user_id, product_id) => axios({
    method: 'post',
    url: '/api/user/shoppingCart/addShoppingCart',
    data: {
        user_id: user_id,
        product_id: product_id
    }
})
// 添加我的收藏接口
export const addCollect = (product_id, user_id) => axios({
    method: 'post',
    url: '/api/user/collect/addCollect',
    data: {
        product_id: product_id,
        user_id: user_id,
    }
})
// 我的收藏接口
export const getCollect = (user_id) => axios({
    method: "post",
    url: "/api/user/collect/getCollect",
    data: {
        user_id: user_id
    }
})
// 我的添加订单接口
export const addMyOrder = (user_id, products) => axios({
    method: 'post',
    url: '/api/user/order/addOrder',
    data: {
        user_id: user_id,
        products: products
    }
})
// 我的订单接口
export const getMyOrder = (user_id) => axios({
    method: 'post',
    url: '/api/user/order/getOrder',
    data: {
        user_id: user_id
    }
})
// 购物车接口
export const getMyShopping = (product_id, user_id) => axios({
    method: 'post',
    url: '/api/user/shoppingCart/deleteShoppingCart',
    data: {
        product_id: product_id,
        user_id: user_id
    }
})
// 监听购物车更新
export const updateMyShoppingCart = (user_id) => axios({
    method: 'post',
    url: '/api/user/shoppingCart/getShoppingCart',
    data: {
        user_id: user_id
    }
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
