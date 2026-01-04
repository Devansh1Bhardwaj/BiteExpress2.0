let cartItems = JSON.parse(localStorage.getItem('menu')) || [];
const cancel_pay_qr = document.querySelector(".pay-cancel-btn");
const qr_section = document.querySelector(".qr-section");
const pay_amount = document.querySelector(".pay-amount");

cancel_pay_qr.addEventListener('click', () => {
    qr_section.classList.add("hide");
})


function renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = "";

    // EMPTY CART
    if (cartItems.length === 0) {
        const empty = document.createElement("h1");
        empty.textContent = "Cart is empty";
        empty.style.textAlign = "center";
        document.querySelector(".checkout").innerHTML = "";
        cartContainer.appendChild(empty);
        return;
    }


    let totalPrice = 0;

    cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        // CARD
        const card = document.createElement("div");
        card.className = "cart-item-card";

        // IMAGE
        const img = document.createElement("img");
        img.className = "cart-item-image";
        img.src = item.image;
        img.alt = item.name;

        // INFO
        const info = document.createElement("div");
        info.className = "cart-item-info";

        const name_price_div = document.createElement('div');
        name_price_div.className = "name-price-div";

        const name = document.createElement("h4");
        name.className = "cart-item-name";
        name.textContent = item.name;

        const price = document.createElement("p");
        price.className = "cart-item-price";
        price.textContent = `₹${item.price}`;

        name_price_div.append(name, price);

        // QUANTITY CONTROLS
        const qtyWrapper = document.createElement("div");
        qtyWrapper.className = "qtyWrapper";

        const minus = document.createElement("button");
        minus.className = "qtyBtn";
        minus.textContent = "-";
        minus.onclick = () => {
            if (item.quantity > 1) {
                item.quantity--;
                updateCart();
            }
        };

        const qty = document.createElement("span");
        qty.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.className = "qtyBtn";
        plus.textContent = "+";
        plus.onclick = () => {
            item.quantity++;
            updateCart();
        };

        qtyWrapper.append(minus, qty, plus);

        // ITEM TOTAL
        const finalPrice = document.createElement("p");
        finalPrice.textContent = `₹${itemTotal}`;

        info.append(name_price_div, qtyWrapper, finalPrice);

        const remove = document.createElement("button");
        remove.textContent = "remove";
        remove.className = "remove-item-btn";
        remove.onclick = () => {
            cartItems = cartItems.filter((cartItem) => item.name != cartItem.name);
            updateCart();
        }

        card.append(img, info, remove);
        cartContainer.appendChild(card);
    });

    // TOTAL SECTION
    const totalBox = document.createElement("div");
    totalBox.className = "totalBox";

    const totalText = document.createElement("h3");
    totalText.textContent = `Total: ₹${totalPrice}`;

    const checkout = document.createElement("button");
    checkout.className = "checkout-btn"
    checkout.textContent = "Proceed to checkout";
    checkout.onclick = () => {
        pay_amount.textContent = `Amount: ₹${totalPrice}`
        // removing the class to show the qr section
        qr_section.classList.remove("hide");
    }
    totalBox.append(totalText, checkout);

    document.querySelector(".checkout").append(totalBox);
}

function updateCart() {
    document.querySelector(".checkout").innerHTML = "";
    localStorage.setItem("menu", JSON.stringify(cartItems));
    renderCart();
}


renderCart();