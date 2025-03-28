const socket = io();

// Capturar elementos
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

// Renderizar productos en la lista
const renderProducts = (products) => {
    productList.innerHTML = ""; // Vaciar la lista antes de renderizar
    products.forEach((product) => {
        productList.innerHTML += `
            <li>
                <strong>${product.name}</strong> - $${product.price} - Categoría: ${product.category}
                <button onclick="deleteProduct('${product.id}')">Eliminar</button>
            </li>
        `;
    });
};

// Actualizar productos desde el servidor
socket.on("updateProducts", (products) => {
    renderProducts(products);
});

// Enviar nuevo producto desde el formulario
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value; // Capturar categoría del producto

    // Validar campos antes de enviar
    if (name && price && category) {
        socket.emit("addProduct", { name, price: parseFloat(price), category });
        productForm.reset(); // Limpiar el formulario
    } else {
        alert("Todos los campos son obligatorios"); // Informar al usuario si faltan datos
    }
});

// Eliminar producto mediante su ID
const deleteProduct = (id) => {
    socket.emit("deleteProduct", String(id));
};

// Mostrar usuario desconectado en consola
socket.on("userDisconnected", (userId) => {
    console.log(`Usuario desconectado: ${userId}`);
});