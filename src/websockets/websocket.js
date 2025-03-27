import { Server } from "socket.io";

let io;

const initWebSocket = (server, productManager) => {
    io = new Server(server);

    io.on("connection", async (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);

        // Enviar productos actualizados al conectar
        socket.emit("updateProducts", await productManager.getProducts());

        // Manejar creación de productos
        socket.on("addProduct", async (newProduct) => {
            try {
                await productManager.addProduct(newProduct);
                io.emit("updateProducts", await productManager.getProducts());
            } catch (error) {
                console.error("Error al agregar producto:", error);
            }
        });

        // Manejar eliminación de productos
        socket.on("deleteProduct", async (id) => {
            try {
                await productManager.deleteProducts(id);
                io.emit("updateProducts", await productManager.getProducts());
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }
        });
    });

    return io;
};

export { initWebSocket };