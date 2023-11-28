/*
 rutas parf acceder a la api
 /api/events

*/

//Importo isDate(())
//const { isDate } = require("../helpers/isDate");

//Importo Reouterr
const { Router } = require("express");

//Valido rutas con  JWT - midellware -
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getEventos,
  crearEvento,
  actualizaEvento,
  eliminarEvento,
} = require("../controllers/events");

const router = Router();

//VAlidacion JWt  de todas las rutas -lo subo de nivel
//todas la peticiones haci abajo estan validadas por el jwt
//se borra de todas las rutas.
router.use(validarJWT);

//Valido Campos Enviados
//instalo espress-validator - llamo check() para validar un campo en particular
const { check } = require("express-validator");

//Importo el Middleware personalizado Validacion
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
//Creo los  Crud

//Todas la peticiones pasan por la validacion del Token
//Creo en los Controladores events.js

//Obtener Eventos- llamo del controler getEventos
router.get("/", getEventos);

//Crear nuevo evento-llamo del controler crear evento
router.post(
  "/",
  [
    //middleware express-validator - asociaciada la validationResult en ./controler/auth
    check("title", "Titulo es obligatorio").not().isEmpty(),
    //con custom() valido la fechas con un helpers perosnalizado.
    check("start", "Fecha de Inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion  es obligatoria").custom(isDate),
    // check("password", "Password debe de ser de 6 caracteres").isLength({
    //   min: 6,
    // }),
    /*check("password", "No cumple con los parametros").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])[0-9a-zA-Z]{8,}$/,
      "i"
    ),*/
    validarCampos,
  ],

  crearEvento
);

//Actualizar Evento-llamo del controler actualizaEvento
router.put("/:id", actualizaEvento);

//Borar Evento-llamo del controler EliminarEvento
router.delete("/:id", eliminarEvento);

module.exports = router;
