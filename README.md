Instrucciones de instalacion local

importe la base de datos localizada en la carpeta DB (se hizo uso de Xampp para la creacion de la base de datos)

ingrese a la carpeta backend y corra el siguiente comando en la terminal

npm install

configure la conexion acorde a sus datos

const db = mysql.createConnection({
    host:"",
    user:"",
    password:"",
    database:""
})

ingrese en la carpeta frontend y corra el siguiente comando en la terminal

npm install --legacy-peer-deps

Instrucciones para correr

Para correr el proyecto es necesario usar el comando "npm start" tanto en la carpeta backend como en la carpeta frontend
