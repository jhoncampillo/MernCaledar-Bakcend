//Estandar de Errores

# https://restapitutorial.com/httpstatuscodes.html

NEMR
npm init -y - crea packet.json
creo index.js
node index.js
instalo npm i nodemon -g para que el server siempre escuche

nodemon index.js

modifico el package .json y dciono estas lineas
en el pakage.json
'scripts':{
'dev': 'nodemon index.js', -Modo Desarrrollo
'start':'node index.js' - Modo Propuccion
}
npm run dev

Configuro express
installo express
npm i express@4.17.1
inicio en el index.js

//monto directorio publico /public

Variables de entorno
.env
instalo npm i dotenv

Creo los endpoints - rutas /routes/auth.js

instalo express validator: npm i express-validator y lo configuro en /routes/auth.js

instalo Mongoose para conectar la base de datos.

INSTALO BECRYPTjs - /controllers/auth.js
INSTALO JSONWEBTOKEM

instalo cors / puede restringir dominios, ip, rutas. se usa como capa de seguridad

**# 1xx Informational**

100 Continue
101 Switching Protocols
102 Processing (WebDAV)

**# 2xx Success**

- 200 OK
  201 Created
- 202 Accepted
  203 Non-Authoritative Information
- 204 No Conten

**# 3xx Redirection**

300 Multiple Choices

- 304 Not Modified
  301 Moved Permanently
  302 Found
  305 Use Proxy

**# 4xx Client Error**

- 400 Bad Request
  401 Unauthorized
  402 Payment Required
  403 Forbidden
  404 Not Found
  405 Method Not Allowed
  409 Conflict
  406 Not Acceptable
  407 Proxy Authentication Required
  408 Request Timeout
  406 Not Acceptable

**# 5xx Server Error**

- 500 Internal Server Error
  501 Not Implemented
  502 Bad Gateway
  503 Service Unavailable
  504 Gateway Timeout
  505 HTTP Version Not Supported

\*\* #Mongo
db User: campillojh
db Passw : Iw0yrm200

Instalo mongose Para el manejo de la Base de Datos - directirio /Database
npm i mongoose

npm install cors
