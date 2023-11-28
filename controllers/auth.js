//Funciones de Control - EndPonts
//Los Controles son las Funciones que se invovan el las RUtas
//para activar el inteligence del JS llamo el expreess  y lo asigno a la res =
//const express = require("express");
//desestruturo y omito esto en la funcion

//req- lo que solicta el usuario- res- lo que nosotros respondemos
const { response } = require("express");
//const { validationResult } = require("express-validator");
//Validator-Result de express-validator

///importo el modelo de modells PARA GRABAR EN LO DB
const Usuario = require("../models/Usuario");

//instalo bcryptjs #npm i bcryptjs
const bcrypt = require("bcryptjs");
/********************************************************************************/
///llamo el JWT

const { generarJWT } = require("../helpers/jwt");

/**************************************************************************** */
//res = response = activa el inteligence
// lo convierto el promesa para que de la espera que grave el registro/ pruebopostman
//se recomienda try y catch para manejo de errores
const crearUsuario = async (req, res = response) => {
  console.log("Mucha Inf- mirar el  body", req);
  //Muestra en la consola
  console.log(req.body);
  // desestructuro el user del body
  const { email, password } = req.body;

  try {
    ///valido los errores - si no estan vacios

    //validacion manual -- no se puede rtornar varias veces el res.statu por que genera error
    //solo se puede neviar una respuesta.
    //validacion remplazada por express-validator- se  inica configurando lo middlewares en el ./router/auth
    //   if (name.length < 5) {
    //     return res.status(400).json({
    //       ok: false,
    //       msg: "El nombre de usuario debe ser de 5 letras",
    //     });
    //   }

    //voy a verificar los email de los usuarios si ya existen
    //verifico el email que biene en el request
    let usuario = await Usuario.findOne({ email: email });
    //si el usuario existe devuelvo  status 400
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El Usuario-email ya existe",
      });
    }
    /* ************** */
    //llamo el modelo y le envio el req.body que tiene  { name, email, password }
    /// y asume los campos definidos en el schema Usuario de modells
    usuario = new Usuario(req.body);
    //PIlas que esta funcion es la que grava

    //Encripto la contrasenna genSaltSync() que recibe el nuemero de vueltas que voltrea la contrasena . entremas vueltas mas compleja. pero mas pesado
    //10 vueltas por defceto
    const salt = bcrypt.genSaltSync();
    //encripyto
    usuario.password = bcrypt.hashSync(password, salt);

    //GRAVAR EN LA BASE DE DATOS
    await usuario.save();

    /* **********************************************/
    //Cuando creo el Usuario  gernero el JWT******************************** es una promesa por eso usa await/
    const token = await generarJWT(usuario.id, usuario.name);

    //status 201 es estado ok de creacion
    res.status(201).json({
      //muestro el usuario creado
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      //token:token,
      token,
      msg: "Usuario Creado",
      //envio el usaurio por postman
      // user: req.body,
      // name,
      // email,
      // password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte al admin",
    });
  }
};
/*************/ ////////////////////////////////******************************************************************************/
const loginUsuario = async (req, res = response) => {
  //Hago una respuesta para que noi de bloquee
  const { email, password } = req.body;
  /****************************** */
  try {
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El Usuario/Email no es correcto",
      });
    }
    //Confirmo los password - comparo el password que voy a enviar con el de la base de datos usuario.password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    //si no es valido
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "email-password incorrectos",
      });
    }
    //SI TODO SALE BIEN GENERA EL JWT- AUTENTICACION EN FORMA PASIVA
    /**Genero el JWT cuando es un usuario Autenticado  - await por que es promesa*/
    const token = await generarJWT(usuario.id, usuario.name);

    //Si todo sale Bien Generammos el JWT y los password hacen match
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
      msg: "Usuario Logueado OK",
    });
    /********************************************* */
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte al admin",
    });
  }
  /************************** */
};
/*********************************/
//epecifilo la ruta /

const revalidarToken = async (req, res = response) => {
  //mando el uid  para revalidar
  const uid = req.uid;
  const name = req.name;

  //Genero un nuevo JWT y retornarlo en esta peticion.
  const token = await generarJWT(uid, name);

  // console.log("Se requiere el /");
  //Hago una respuesta para que no se bloquee vacio
  res.json({
    ok: true,
    uid,
    name,
    token,
    //uid: uid,
    // name: name,
    msg: "renew Token jj",
  });
};

/*********************************/
//Exporto un objeto por que son varias funciones a exportar.
module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};

//https://jwt.io/ verificar token
