import axios from "axios"

// 首页轮播图接口
export const GetHomeCarouselDate = () => axios({
    method: 'post',
    url: 'api/resources/carousel'
})
// 首页商品数据接口
export const GetHomeShoppingDate = (api, Productcategory) => axios({
    method: 'post',
    url: api,
    data: {
        categoryName: Productcategory
    }
})
// 全部商品列表页数据
export const GetAllCategoryList = () => axios({
    method: "post",
    url: "/api/product/getCategory"
})
// 获取全部商品或者列表商品数据
export const GetSomeData = (api, categoryID, currentPage, pageSize) => axios({
    method: 'post',
    url: api,
    data: {
        categoryID: categoryID,
        currentPage: currentPage,
        pageSize: pageSize,
    }
})
// 商品信息数据
export const GetDetailsInfo = (productID) => axios({
    method: 'post',
    url: '/api/product/getDetails',
    data: {
        productID: productID
    }
})
// 商品照片数据
export const GetDetailsPictureInfo = (productID) => axios({
    method: 'post',
    url: '/api/product/getDetailsPicture',
    data: {
        productID: productID
    }
})
// 添加购物车接口
export const GetAddShopping = (user_id, product_id) => axios({
    method: 'post',
    url: '/api/user/shoppingCart/addShoppingCart',
    data: {
        user_id: user_id,
        product_id: product_id
    }
})
// 添加我的收藏接口
export const GetAddcollect = (product_id, user_id) => axios({
    method: 'post',
    url: '/api/user/collect/addCollect',
    data: {
        product_id: product_id,
        user_id: user_id,
    }
})
// 我的收藏接口
export const GetAllCollect = (user_id) => axios({
    method: "post",
    url: "/api/user/collect/getCollect",
    data: {
        user_id: user_id
    }
})
// 我的添加订单接口
export const GetAddMyOrder = (user_id, products) => axios({
    method: 'post',
    url: '/api/user/order/addOrder',
    data: {
        user_id: user_id,
        products: products
    }
})
// 我的订单接口
export const GetMyOrder = (user_id) => axios({
    method: 'post',
    url: '/api/user/order/getOrder',
    data: {
        user_id: user_id
    }
})
// 购物车接口
export const GetMyShopping = (product_id, user_id) => axios({
    method: 'post',
    url: '/api/user/shoppingCart/deleteShoppingCart',
    data: {
        product_id: product_id,
        user_id: user_id
    }
})
// 监听购物车更新
export const GetMyShoppingCart = (user_id) => axios({
    method: 'post',
    url: '/api/user/shoppingCart/getShoppingCart',
    data: {
        user_id: user_id
    }
})
// 登录接口
export const GetLoginModel = (userName, password) => axios({
    method: 'post',
    url: '/api/users/login',
    data: {
        userName: userName,
        password: password
    }
})
// 注册接口
export const GetRegisterModel = (userName, password) => axios({
    method: 'post',
    url: '/api/users/register',
    data: {
        userName: userName,
        password: password,
    }
})

// 注册验证接口
export const GetIsRegister = (userName) => axios({
    method: 'post',
    url: '/api/users/findUserName',
    data: {
        userName: userName
    }
})
