// La parte del cliente esta en public
import { Server } from "socket.io";

let io;

const initWebSocket = (server, productManager) => {
    io = new Server(server);

    io.on("connection", async (socket) => {
        console.log(`Usuario conectado con el ID: ${socket.id}`);

        // Envío de productos (esto es para cuando actualiza)
        socket.emit("updateProducts", await productManager.getProducts());

        // Para crear los productos
        socket.on("addProduct", async (newProduct) => {
            try {
                await productManager.addProduct(newProduct);
                io.emit("updateProducts", await productManager.getProducts());
            } catch (error) {
                // console.error("Error al agregar producto:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log(`Usuario desconectado: ${socket.id}`);
        });


// Eliminar Productos
        socket.on("deleteProduct", async (id) => {
            try {
                await productManager.deleteProducts(id);
                io.emit("updateProducts", await productManager.getProducts());
                console.log("Producto Eliminado")
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }
        });
    });
    

    return io;
};

export { initWebSocket };