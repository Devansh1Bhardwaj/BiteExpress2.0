const segments = window.location.pathname.split('/').filter(Boolean);

const last = segments[segments.length - 1].split('.')[0].split('-').join(" ");

document.title = last;

let jsonData;

fetch('../food-items.json')
    .then((res) => res.json())
    .then((data) => {
        const menu = data[last];
        renderContent(menu, last)
    });


function renderContent(data, menu_name) {
    const container = document.getElementById("menu-container");

    container.innerHTML = "";

    const heading = document.createElement('h2');
    heading.textContent = menu_name;
    heading.className = "heading";
    container.appendChild(heading);

    const loader = document.createElement('div');
    loader.className = "loader none";
    container.appendChild(loader);

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "food-card";

        card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="food-info">
        <h3>${item.name}</h3>
        <p class="price">₹${item.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

        card.querySelector(".add-to-cart").addEventListener("click", () => {
            document.querySelector(".loader").classList.remove("none");
            setTimeout(() => {
                document.querySelector(".loader").classList.add("none");
            }, 1000);
            const cartItems = JSON.parse(localStorage.getItem('menu')) || [];
            const existingItem = cartItems.find(
                ct_item => ct_item.name === item.name
            );

            if (existingItem) {
                existingItem.quantity++;
                localStorage.setItem("menu", JSON.stringify(cartItems));
            }
            else {
                cartItems.push({ ...item, quantity: 1 });
                localStorage.setItem('menu', JSON.stringify(cartItems));
            }
            window.location.href = "/cart.html"
        });

        container.appendChild(card);
    });
}



