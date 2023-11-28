//genero los JWT
const jwt = require("jsonwebtoken");
//Mando como Pyload uid y el name del usuario
const generarJWT = (uid, name) => {
  //si el Token es Manipulado no es valido

  //Retorno una promesa
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    //genero le Token
    //mando el payload y una cadena de cartacteres que ratifique que yo nevio el token
    //la configuro como una variable de entorno en .env - hay que reiniciar el nodemon
    //SECRET_JWT_SEED = semilla que permie validar el token
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        //Token expira en dos Horas
        expiresIn: "2h",
      },
      //callback llamAdo cuando no se genera el jwt
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el Token");
        }
        //Si todo sale bien resuelve el Token
        resolve(token);
      }
    );
  });
};

//exporto
module.exports = {
  generarJWT,
};
