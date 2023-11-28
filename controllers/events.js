//{
//    ok: true;
//   msg: 'getEventos'
//}

/*
 rutas para acceder a la api
 /api/events

*/

const { response } = require("express");
//Gravo el evento
const Evento = require("../models/Evento");

//Lista evento
const getEventos = async (req, res = response) => {
  console.log(req.body);
  //busca todos los eventos con find() + populate("user") trae todos los datos del usuario
  //populate("user", "name password etc ") = solo trae el name y el id

  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    msg: "getEvento",
    eventos,
  });
};

//Creo Evento
const crearEvento = async (req, res = response) => {
  //verifico que tengo el evento en el body
  console.log(req.body);

  //Creo el evento -una estacia del modelo
  const evento = new Evento(req.body);
  //tarea asincrona
  try {
    //necesto llamar el id del usuario para asignar el evento
    evento.user = req.uid;

    //Grabo el Evento - Tarea Asyncrona
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
  //esto genera error Error [ERR_HTTP_HEADERS_SENT]
  // res.json({
  //   ok: true,
  //   msg: "crearEvento",
  // });
};

//Actualiza Evento
const actualizaEvento = async (req, res = response) => {
  //capturo el parametro id que se coloca en la ruta
  const eventoId = req.params.id;
  //extraigo uid del usuario
  const uid = req.uid;

  //trabajo como promesa
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: "Evento no existe por ese ID",
      });
    }
    //verifico el creador del evento
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }
    //si cumple los parametros traigop todo el evento
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    //Actualizarlos
    //{new:true} retorn el evento actualizado o datos nuevos
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

  // res.json({
  //   ok: true,
  //   msg: "actualizarEvento",
  //   eventiId,
  // });
};

//Elimina evento
const eliminarEvento = async (req, res = response) => {
  //capturo el parametro id que se coloca en la ruta
  const eventoId = req.params.id;
  //extraigo uid del usuario
  const uid = req.uid;

  //trabajo como promesa
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: "Evento no existe por ese ID",
      });
    }
    //verifico el creador del evento
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de eliminar este evento",
      });
    }

    //Actualizarlos
    //{new:true} retorn el evento actualizado o datos nuevos
    await Evento.findByIdAndDelete(eventoId);

    res.json({
      ok: true,
      msg: "eventoEliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

  // res.json({
  //   ok: true,
  //   msg: "deleteEvento",
  // });
};

module.exports = {
  getEventos,
  crearEvento,
  actualizaEvento,
  eliminarEvento,
};
