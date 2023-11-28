//1-Configuro express
const express = require("express");

//MAnejo de Varibles de entorno .env
//6-Requiero el dotenv para manejo de claves y password
require("dotenv").config();

//Requiero la base de datos
const { dbConnection } = require("./database/config");
///Requiero Cors- caoa de seguridad de la API
const cors = require("cors");

console.log("Procesos", process.env);

//2-crear el servidor de Express
const app = express();

//LLamo la base de datos de ./database/config.js
dbConnection();

///******CORS * CONFIGURACION DE ACCESOS(restricciones de dominios) A LA API/

app.use(cors());

//5-Directorio Publico - midellware*funcion que se ejecuto cuando alguien hace una peticion al servidor
// - Para direcionar a la Pagina index.html path="public"
app.use(express.static("public"));

//****Midelware***Lectura y Parseo del Body- las peticiones que llegen en formato json seran procesadas y extraer su contenido**/
///luego hay que definir la creacion en el ./controller/auth.js
/*************importante para el manejo de los controllers- y parceo del Body****************** */

//peticiones en formato json
app.use(express.json());

//4-******RUTAS*****RUTAS******RUTAS ************************/////////////////////////
//Todo lo que este archivo exporta ./routes/auth lo habilita en /api/auth
app.use("/api/auth", require("./routes/auth"));

//******************RUTAS DE EVENTOS - maneja modelo, controller y routes*********************/
app.use("/api/events", require("./routes/events"));

//Escuchar peticiones*********************************************//

//las variables de entorno se sacan con el process.env
//una de ellas es Port. entonce slo cambio
//3-Escuchar
app.listen(process.env.PORT, () => {
  console.log(`Servidor Escuchando en puerto=${process.env.PORT}`);
});
