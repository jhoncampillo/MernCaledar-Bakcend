//creo la constante PARA JWT
//si es correcto llamoe l next
//configuro las ayudas y el typado

/* EN EL POSTMAN EL TOkEN SE ENVIA POR  LOS HEADER CON x-token*/

const { response } = require("express");

//llamo las funciones para revaliddar el jwt
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, netx) => {
  //como recibo el JWT
  //por Postman lo envio por x-token desde los Headers
  ///x-token
  const token = req.header("x-token");
  console.log(token);
  ///primro valido si el token llega
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay Token en la peticion",
    });
  }
  //validar si hay algo en el token
  try {
    //recibo el pyload
    //  const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
    //esto se puede desestructurar para sacar el payload.uid y el payload.name
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
    // console.log(payload);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  //imprimo en consoloa el jwt
  //console.log(token);
  //lo implemento el la ruta de validar token /routes/auth.js
  netx();
};

//Exporto
module.exports = {
  validarJWT,
};
