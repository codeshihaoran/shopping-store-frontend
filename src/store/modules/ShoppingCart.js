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
        getSum(state) {
            // 商品的总数
            let sum = 0
            for (let i = 0; i < state.ShoppingCart.length; i++) {
                let someNum = state.ShoppingCart[i]
                sum = someNum.num + sum
            }
            return sum
        },


        getCheckGoods(state) {
            // 获取选中的商品
            let newArr = []
            for (let i = 0; i < state.ShoppingCart.length; i++) {
                const item = state.ShoppingCart[i]
                if (item.checkbox == true) {
                    newArr.push(item)
                }
            }
            return newArr
        },
        getAllPrice(state) {
            // 选中商品价格的总和
            let total = 0
            for (let i = 0; i < state.ShoppingCart.length; i++) {
                const item = state.ShoppingCart[i]
                if (item.checkbox == true) {
                    total = total + item.price * item.num
                }
            }
            return total
        },
        getCheckNum(state) {
            // 选中商品的数量
            let sum = 0;
            for (let i = 0; i < state.ShoppingCart.length; i++) {
                const item = state.ShoppingCart[i]
                if (item.checkbox == true) {
                    sum = sum + item.num
                }
            }
            return sum
        },
    },
    mutations: {
        setShoppingCart(state, data) {
            //设置购物车状态
            state.ShoppingCart = data
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                item.checkbox = false
            }
        },

        unshiftShoppingCart(state, data) {
            // 添加购物车商品
            state.ShoppingCart.unshift(data)
        },
        updateCartItemcheckbox(state, payload) {
            // payload是一个对象 payload包含一个id和checkbox
            // 单选按钮的实现 
            for (let i = 0; i < state.ShoppingCart.length; i++) {
                const item = state.ShoppingCart[i]
                if (item.id == payload.id) {
                    item.checkbox = payload.checkbox
                }
            }
            // 反全选按钮的实现
            let flag = true
            for (let i = 0; i < state.ShoppingCart.length; i++) {
                const item = state.ShoppingCart[i]
                if (item.checkbox == false) {
                    flag = false
                }
            }
            state.isAllcheck = flag
        },
        updateCartAllcheckbox(state, payload) {
            // 
            for (let i = 0; i < state.ShoppingCart.length; i++) {
                const item = state.ShoppingCart[i]
                item.checkbox = payload.checkbox
            }
            state.isAllcheck = payload.checkbox
        },

        deleteStore(state, data) {
            // 删除购物车商品
            for (var i = 0; i < state.ShoppingCart.length; i++) {
                let someStore = state.ShoppingCart[i]
                if (someStore.id == data) {
                    state.ShoppingCart.splice(i, 1)
                }
            }
        },

    },
}