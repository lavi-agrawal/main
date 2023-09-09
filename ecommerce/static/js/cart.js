var updateBtns = document.getElementsByClassName("update-cart")

for (i=0; i<updateBtns.length; i++){
    updateBtns[i].addEventListener('click',function(){
        var productId=this.dataset.product
        var action=this.dataset.action
        console.log('productId:',productId,'action: ',action)

        if(user == "AnonymousUser"){
            addCookieItem(productId,action)
        }else{
            updateUserOrder(productId,action)
        }
    })
}

function updateUserOrder(productId,action){

    console.log("user is logged in....")

    var url="/update_item/"

    fetch(url,{
        method:'POST',
        headers:{
            'content-Type':'application/json',
            "X-CSRFToken": csrftoken
        },
        body:JSON.stringify({'productId':productId,'action':action})
    })

    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log('data:',data)
        location.reload()
    })

}


function addCookieItem(productId,action){
    if (action == "add"){
        console.log("it is working")
        if (cart[productId] == undefined){
            cart[productId]= {'quantity': 1}
            console.log(cart)
    
        }
        else{
            cart[productId]['quantity']+=1
            console.log(cart)
        }
    }
   

    if (action == "remove"){
        cart[productId]['quantity'] -= 1

        if (  cart[productId]['quantity']<=0 ){
            console.log("item shoud be deleted")
            delete cart[productId]
        }
    }

    document.cookie = "cart="+JSON.stringify(cart)+";domain=;path=/"
    // location.reload()
   
}
