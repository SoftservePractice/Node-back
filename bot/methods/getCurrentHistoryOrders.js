const getCurrentHistoryOrders = (orders) => {
    let current_order = []
    let history_order = []
    for (let i = 0; i < orders.length; i++) {
        if (!orders[i].end) {
            current_order.push(orders[i])
        } else {
            history_order.push(orders[i])
        }
    }
    return {current_order, history_order}
}

module.exports = {getCurrentHistoryOrders}
