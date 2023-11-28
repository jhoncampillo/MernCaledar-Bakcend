//MIDDLEWARE personalizado-Funcion que se ejecuta antes de otra cosa
//vALIDAR CAMPOS a nivel general
//const express = require("express");
//Destructuring
const { response } = require("express");

const { validationResult } = require("express-validator");

//netx es un callcack que se ejecuta en los checks - se llama si todo ejecuta correctamente en los routers
const validarCampos = (req, res = response, next) => {
  const errors = validationResult(req);
  //console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  //el next recorre todos los check por defecto lo middleware hata que llega la controlador
  //o coindiciono validando los campos con el codigo anterior
  next();
};

//lo envio a las rutas
module.exports = {
  validarCampos,
};
