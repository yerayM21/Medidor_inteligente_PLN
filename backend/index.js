import Express from "express";
import mysql from "mysql";
import cors from "cors";

const app = Express();
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nueva"
})

const dbMeter = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "data_meter"
})

const dbNow = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "data_meter_now"
})

const dbTime = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "data_meter_time"
})
/*solicitud de datos a la base de datos mysql*/
app.use(Express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hola este es el backend")
})

app.get("/consumo_power",(req,res)=>{
    const q = "SELECT * FROM total_power LIMIT 10"
    dbMeter.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/consume_time",(req,res)=>{
    const q = "SELECT * FROM periodo_tiempo WHERE parametro = 'current_1' LIMIT 15"
    dbTime.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/consumo_now/consumo",(req,res)=>{
    const q = "SELECT energyconsumed FROM info LIMIT 1"
    dbNow.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})


app.get("/consumo_now/voltage",(req,res)=>{
    const q = "SELECT Voltage_V FROM info LIMIT 1"
    dbNow.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/consumo_now/current",(req,res)=>{
    const q = "SELECT Current_A FROM info LIMIT 1"
    dbNow.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/consumo_now/power",(req,res)=>{
    const q = "SELECT Power_W FROM info LIMIT 1"
    dbNow.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/panel", (req,res)=>{
    const q = "SELECT * FROM (SELECT * FROM panel ORDER BY idPanel DESC LIMIT 5) VAR1 ORDER BY idpanel ASC"
    db.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/temperatura", (req,res)=>{
    const q = "SELECT * FROM (SELECT * FROM temperatura ORDER BY idtemperatura DESC LIMIT 7) VAR1 ORDER BY idtemperatura ASC"
    db.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/produccionTotal", (req,res)=>{
    const q = "SELECT * FROM (SELECT * FROM totalwatts ORDER BY idwatts DESC LIMIT 7) VAR1 ORDER BY idwatts ASC"
    db.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/panel/:nombrePanel", (req,res)=>{
    const panelName = req.params.nombrePanel;
    const q = "SELECT kilowatts FROM panel WHERE nombrePanel = ? ORDER BY idPanel DESC LIMIT 1";
    db.query(q, [panelName], (err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/panel/:nombrePanel/:captura", (req,res)=>{
    const panelName = req.params.nombrePanel;
    const captura = req.params.captura;
    const q = "SELECT kilowatts FROM panel WHERE nombrePanel = ? AND captura = ?";
    db.query(q, [panelName, captura], (err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/temperatura/actual", (req,res)=>{
    const q = "SELECT centigrados FROM temperatura ORDER BY idtemperatura DESC LIMIT 1";
    db.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/temperatura/ayer", (req,res)=>{
    const q = "SELECT centigrados FROM temperatura ORDER BY idtemperatura DESC LIMIT 1,1";
    db.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/temperatura/:captura", (req,res)=>{
    const q= "SELECT centigrados FROM temperatura WHERE captura = ?";
    const captura = req.params.captura;
    db.query(q, [captura], (err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/produccionTotal/actual", (req,res)=>{
    const q = "SELECT watts FROM totalwatts ORDER BY idwatts DESC LIMIT 1";
    db.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/produccionTotal/ayer", (req,res)=>{
    const q = "SELECT watts FROM totalwatts ORDER BY idwatts DESC LIMIT 1,1";
    db.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/produccionTotal/:captura", (req,res)=>{
    const q= "SELECT watts FROM totalwatts WHERE captura = ?";
    const captura = req.params.captura;
    db.query(q, [captura], (err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("conexion al backend");
})