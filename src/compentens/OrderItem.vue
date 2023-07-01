<template></template>
<script>
import { getMyOrder } from '../service/index'
export default {
    data() {
        return {
            orders: [],
        }
    },
    mounted() {
        getMyOrder(this.$store.state.user.user.user_id).then(res => {
            this.orders = res.data.orders
            this.$emit('sendOrder', this.orders)
            let total = []
            for (let i = 0; i < this.orders.length; i++) {
                const item = this.orders[i]
                let totalnum = 0
                let totalprice = 0
                for (let j = 0; j < item.length; j++) {
                    const temp = item[j]
                    totalnum = totalnum + temp.product_num
                    totalprice = totalprice + temp.product_num * temp.product_price
                }
                total.push({ totalnum, totalprice })
            }
            this.$emit('sendAllsum', total)
        })
    },
}
</script>