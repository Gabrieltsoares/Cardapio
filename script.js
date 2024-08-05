const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModal = document.getElementById('close-modal-btn');
const cartCount = document.getElementById('cart-count');
const adressInput = document.getElementById('adress');
const adressWarn = document.getElementById('adress-warn');

let cart=[];

cartBtn.addEventListener("click", function (){
    updateCartModal()
    cartModal.style.display = "flex"
})

cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModal.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click" , function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        
        addToCart(name,price)
    }   
})


function addToCart (name,price){
    const existingItem = cart.find (item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
    
        })
    }
    updateCartModal()
}

function updateCartModal (){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item =>{
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex" , "justify-between" , "mb-4", "flex-col")
        
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                    <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
               

            </div>
        `
        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement)
    })
    cartTotal.textContent = total.toLocaleString("pt-br",{
        style: "currency",
        currency: "BRL"
    });

    cartCount.innerHTML = cart.length;
}

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex( item => item.name === name);

    if(index !==1){
        const item = cart[index];
        if(item.quantity >1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index,1);
        updateCartModal();
    }

}

adressInput.addEventListener("click",function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
        adressInput.classList.remove("border-red-500")
        adressWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", function(){
    const isOpen = checkHour();
    if(!isOpen){
        alert("RESTAURANTE FECHADO NO MOMENTO!")
        return;
    }


    if(cart.length === 0) return;
    if(adressInput.value === ""){
        adressWarn.classList.remove("hidden")
        adressInput.classList.add("border-red-500")
        return;
    }
})

function checkHour(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkHour();

if(isOpen){
    spanItem.classList.remove(bg-red-500);
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
    spanItem.textContent = "Restaurante Fechado";
    spanItem.classList.add("font-medium")
    spanItem.classList.add("text-white")
}