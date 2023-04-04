
class OrderController{
    async SendOrder(order){
        console.log("enter in SendOrder");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                    order
                })
        };
        await fetch('/serverC#/order/new',requestOptions)
            .then(response => response.json())
            .then(res=>data=res)    
            return data;
    }
    
}

module.exports = new OrderController();