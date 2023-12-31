export default {
    state: {
        ShoppingCart: [],
        isAllcheck: false
    },
    getters: {
        getisAllcheck(state) {
            return state.isAllcheck
        },
        getShoppingCart(state) {
            // 获取购物车状态
            return state.ShoppingCart
        },
        getAllProductsSum(state) {
            // reduce 求和
            const allProductsSum = state.ShoppingCart.reduce((result, item) => {
                result = result + item.num
                return result
            }, 0)
            return allProductsSum
        },
        getCheckedProducts(state) {
            // filter 过滤
            const checkedProducts = state.ShoppingCart.filter((item) => {
                return item.checkbox == true
            })
            return checkedProducts
        },
        getCheckedProductsPriceSum(state) {
            // 过滤
            const checkedProducts = state.ShoppingCart.filter((item) => {
                return item.checkbox == true
            })
            // 求和
            const checkedProductsPriceSum = checkedProducts.reduce((result, item) => {
                result = result + item.num * item.price
                return result
            }, 0)
            return checkedProductsPriceSum
        },
        getCheckedProductsSum(state) {
            // 过滤
            const checkedProducts = state.ShoppingCart.filter((item) => {
                return item.checkbox == true
            })
            // 求和
            const checkedProductsSum = checkedProducts.reduce((result, item) => {
                result = item.num + result;
                return result
            }, 0)
            return checkedProductsSum
        },
    },
    mutations: {
        setShoppingCart(state, data) {
            //设置购物车状态
            state.ShoppingCart = data
            data.forEach((item) => {
                item.checkbox = false
            })
        },
        unshiftShoppingCart(state, data) {
            // 添加购物车商品
            state.ShoppingCart.unshift(data)
        },
        updateCartItemcheckbox(state, payload) {
            // payload是一个对象 payload包含一个id和checkbox
            // 单选按钮的实现 
            state.ShoppingCart.forEach((item) => {
                if (item.id == payload.id) {
                    item.checkbox = payload.checkbox
                }
            })
            // 反全选按钮的实现
            let flag = true
            state.ShoppingCart.forEach((item) => {
                if (item.checkbox == false) {
                    flag = false
                }
            })
            state.isAllcheck = flag
        },
        updateCartAllcheckbox(state, payload) {
            // 全选按钮
            state.ShoppingCart.forEach((item) => {
                item.checkbox = payload.checkbox
            })
            state.isAllcheck = payload.checkbox
        },
        deleteProducts(state, data) {
            // 删除购物车商品
            state.ShoppingCart.forEach((item, index) => {
                if (item.id == data) {
                    state.ShoppingCart.splice(index, 1)
                }
            })
        },

    },
}