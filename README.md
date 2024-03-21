## Introducción al Proyecto de Medidor Inteligente
Este proyecto lo realicé como método de titulación para la carrera de Ingeniería Eléctrica.

Realizamos un fork del trabajo hecho por Irving Vanegas, quien fue estudiante de mi asesor, el Dr. Juan Olivares, dado que este será la base para poder hacer el proyecto.

Desarrollé una interfaz web en la cual, por método de voz, se pueden hacer las peticiones específicas sobre o relacionado al consumo eléctrico del hogar. Se despliegan los datos por método de gráfica o de igual forma en texto y voz que despliega la interfaz web.

Los datos del hogar son extraídos por una Raspberry Pi 4 conectada a un módulo de [SMART PI 3.0](https://enerserve.eu/en/products/smartpi.html), con el cual tiene un software de descarga para la configuración adecuada para las Raspberry Pi 4.

La extracción de los datos se hizo a través de la API de la interfaz web que entrega el software de las Smart Pi.

## Mi rol en el proyecto
1. Análisis y comprensión del código para saber cómo funciona, y realizar las modificaciones necesarias para que, al hacer un 'prompt', se obtenga el output esperado.
2. Extracción de datos, limpieza y procesamiento de datos (se pueden ver en la carpeta de procesamiento de datos).
3. Creación de base de datos en SQL.
4. Desde SQL, creación de otras bases de datos con los datos obtenidos, pero filtrando los datos más relevantes.
5. Uso de herramientas de AWS para establecer una conexión en la web de forma remota (con un método de puente inverso de SSH).
6. La compra de un dominio y su registro en AWS, para que se pueda acceder a la web desde el nombre del dominio.

## Instrucciones de instalación local
1. Instalación de XAMPP.
2. Clonación del repositorio.
3. Ejecutamos XAMPP, entramos a localhost:80 (en mi caso es el puerto 80) y procedemos a entrar a phpMyAdmin.
4. Hacemos la importación de datos. Estos se encuentran en la carpeta de DB y se importarían todos los datos que empiecen con "data", dado que estas son las mediciones eléctricas.
5. En phpMyAdmin, click en "Base de datos". Donde dice nombre de base de datos pones para la primera "data_meter" junto con la base de datos de "data_meter_total_power.sql", segundo "data_meter_now" = "data_meter_info.sql" y para el último nombre sería "data_meter_time" = "data_meter_periodo_tiempo2.sql" (estos parámetros para que no requiere de realizar una configuración en el index.js del backend con respecto a la conexión de los datos).
6. Para este paso tenemos en cuenta que contamos con Node.js. Accedemos a la carpeta de backend y podremos correr backend con el comando "npm install".
7. Ingresamos a la carpeta frontend y corremos este siguiente comando: npm install --legacy-peer-deps.
8. Para correr el proyecto es necesario usar el comando "npm start" tanto en la carpeta backend como en la carpeta frontend.
9. Esperar que se despliegue la página.

## Caso de falla
Corroborar que en la carpeta de backend, en el archivo index.js, las conexiones de base de datos estén acorde a las configuradas.

Configure la conexión acorde a sus datos:

const db = mysql.createConnection({
    host:"",
    user:"",
    password:"",
    database:""
})
Importe la base de datos localizada en la carpeta DB (se hizo uso de XAMPP para la creación de la base de datos).
Ingrese a la carpeta backend y corra el siguiente comando en la terminal:

npm install

Ingrese en la carpeta frontend y corra el siguiente comando en la terminal:

npm install --legacy-peer-deps
