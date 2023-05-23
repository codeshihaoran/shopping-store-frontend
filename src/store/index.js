import Vuex from 'vuex'
import user from './modules/user'
import ShoppingCart from './modules/ShoppingCart'

export default new Vuex.Store({
    strict: true,
    modules: {
        user,
        ShoppingCart
    }
})