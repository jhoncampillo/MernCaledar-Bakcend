//importo mongogose Para el manejo de la base de datos 
const mongoose = require("mongoose");
//Elimina Warnings de conexion Mcompas 1.33.1

mongoose.set("strictQuery", true);

//creo la constante de la base d datos 
//process.env.DB_CNN = cadena de conexion defininida en los evioroment .env
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      //Manejadorees de warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, Noesta soportado atlas
    });
    //como todo esto es una promesa muestro estado de conexion
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de visualizar la base de datos");
  }
};

//Exporto la funcion al index
module.exports = {
  dbConnection,
};
