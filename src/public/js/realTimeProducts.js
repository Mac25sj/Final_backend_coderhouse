const socket = io();

// Capturar elementos
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

// Función para renderizar productos
const renderProducts = (products) => {
    productList.innerHTML = "";
    products.forEach((product) => {
        productList.innerHTML += `
            <li>
                ${product.name} - $${product.price}
                <button onclick="deleteProduct('${product.id}')">Eliminar</button>
            </li>
        `;
    });
};

// Escuchar actualización de productos
socket.on("updateProducts", (products) => {
    renderProducts(products);
});

// Enviar nuevo producto a la lista (main)
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    if (name && price) {
        socket.emit("addProduct", { name, price: parseFloat(price) });
        productForm.reset();
    }
});

// Eliminar producto
const deleteProduct = (id) => {
    socket.emit("deleteProduct", String(id));
};

