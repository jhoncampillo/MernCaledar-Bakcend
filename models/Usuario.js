//importo mongoose -- Modelos para GUardar en la BASE DE dTOAS
//const mongoose = require('mongoose')

//destructuring LO QUE NECESITO DEL OBJETO
const { Schema, model } = require("mongoose");

//defino los Modells con  constatnte
//Schema que el el obj que ENVIAMOS al base
const UsuarioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    //no deja gabar duplicados
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//exporto el model con en nombre Usuario y que usa el schema 'UsuarioSchema'
module.exports = model("Usuario", UsuarioSchema);
//lo envio a los controllers auth.js
