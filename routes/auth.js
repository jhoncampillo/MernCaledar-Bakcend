/*
Rutas de Usuarios /Auth
 host + /api/auth
*/

//const express = require('express')
const { Router } = require("express");
// esta linea se puede oviar desestructurando arriba el router
//const router = express.Router;

//instalo espress-validator - llamo check() para validar un campo en particular
const { check } = require("express-validator");

//ejecuto la funcion router a la que le asigno de express en Router()
const router = Router();

//Importo el Middleware personalizado de validacion de campos
const { validarCampos } = require("../middlewares/validar-campos");

//1.se crean en ./controller/auth.js y exporto
//2.TRAIGO la funcion crearUsuario, loginUsuario y RevalidarToken del ./controller/auth.js
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");

//llamo el renew token

const { validarJWT } = require("../middlewares/validar-jwt");

//3.Rutas iniciales de acceso - pero quiero que entre al index.html
//adiciono un array de middleware asiciadas al express-validator
router.post(
  "/new",
  [
    //middleware express-validator - asociaciada la validationResult en ./controler/auth
    check("name", "Nombre es obligatorio").not().isEmpty(),
    check("email", "Email es obligatorio").isEmail(),
    check("password", "Password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    /*check("password", "No cumple con los parametros").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])[0-9a-zA-Z]{8,}$/,
      "i"
    ),*/
    validarCampos,
  ],
  crearUsuario
);

//Login
router.post(
  "/",
  [
    //MIDDLEWARE
    check("email", "Email es obligatorio Para login").isEmail(),
    check("password", "Password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    // check("password", "No cumple con los parametros de Passwd").matches(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    //   "i"
    // ),
    validarCampos,
  ],
  loginUsuario
);

//Renew***********************************
router.get("/renew", validarJWT, revalidarToken);

//exporto el modulo
module.exports = router;
