import Express from "express";
import mysql from "mysql";
import cors from "cors";

const app = Express();
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"agrovoltaica"
})

app.use(Express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hola este es el backend")
})

app.get("/panel", (req,res)=>{
    const q = "SELECT * FROM panel"
    db.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/temperatura", (req,res)=>{
    const q = "SELECT * FROM temperatura"
    db.query(q,(err,data)=>{
        if(err) return res.json("Ha ocurrido un error")
        return res.json(data)
    })
})

app.get("/produccionTotal", (req,res)=>{
    const q = "SELECT * FROM totalwatts"
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

app.listen(8800, ()=>{
    console.log("conexion al backend");
})