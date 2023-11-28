const { Schema, model } = require("mongoose");

//defino constatnte Schema que el el obj Evento que ENVIAMOS al base
const EventoSchema = new Schema({
  title: {
    type: String,
    require: true,
  },

  notes: {
    type: String,
    required: true,
  },

  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    //le digo a mongoose que va aser una referencia
    type: Schema.Types.ObjectId,
    //la ref esta asociada al Schema de Usuario
    ref: "Usuario",
    required: true,
  },
});
//exporto el model con en nombre Evento y que usa el schema 'EventoSchema'

//Para moificar la vista de la _v y _id en el json de la base

EventoSchema.method("toJSON", function () {
  const { _v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Envento", EventoSchema);
//lo envio a los controllers events.js
//new Date(0) javascripot
