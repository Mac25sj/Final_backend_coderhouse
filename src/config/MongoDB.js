//MonngoDb con Mongoose (ODM)
// MONGO_URI=mongodb+srv://mac25sj:Coderhouse_1234_Backend@db.ku4ub.mongodb.net/db?retryWrites=true&w=majority&appName=db
import mongoose from 'mongoose'; 

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB se ha conectado correctamente");
  } catch (err) {
    console.error("Error al conectar con MongoDB:", err);
  }
};

export default connectDB;
