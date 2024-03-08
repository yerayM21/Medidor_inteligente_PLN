import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Accordion, Button, Modal} from "react-bootstrap";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
/*importacion de paqueterias de react, speech*/
function Home (){
    const [respuesta, setRespuesta] = useState("");
    const { speak } = useSpeechSynthesis();
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [showTotal, setShowTotal] = useState(false);
    const [showTemp, setShowTemp] = useState(false);
    const[panelData, setPanelData] = useState([]);
    const[PowerData, setPowerData] = useState([]);
    const[totalData, setTotalData] = useState([]);

    /*solictudes de datos al back, datos que estan json, sirven para hacer la grafica estos datos*/
    useEffect(()=>{
        const fetchPanelData = async ()=>{
            try {
                const res = await axios.get("http://localhost:8800/panel");
                setPanelData(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchPowerData = async ()=>{
            try {
                const res = await axios.get("http://localhost:8800/consumo_power");
                setPowerData(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchTotalData = async ()=>{
            try {
                const res = await axios.get("http://localhost:8800/produccionTotal");
                setTotalData(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPanelData();
        fetchTotalData();
        fetchPowerData();
    }, []);

    /*solicitud especifica de dato*/
    const fetchPanelProd = async (nombrePanel)=>{
        try {
            const res = await axios.get('http://localhost:8800/panel/'+nombrePanel);
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"kilowatts":', "");
                let resp = "El panel buscado tuvo una produccion de: "+auxB.replace('}]]', "")+" kilowatts";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp }); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPanelCapture = async (nombrePanel, captura)=>{
        try {
            const res = await axios.get('http://localhost:8800/panel/'+nombrePanel+'/'+captura);
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"kilowatts":', "");
                let resp = "El panel buscado tuvo una produccion de: "+auxB.replace('}]]', "")+" kilowatts";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCurrentPower = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/consumo_now/power');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"Power_W":', "");
                let resp = "La potencia utilizada actual es "+auxB.replace('}]]', "")+" Watts";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCurrent = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/consumo_now/current');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"Current_A":', "");
                let resp = "La corriente circulante es de "+auxB.replace('}]]', "")+" Amperios";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCurrentvoltage = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/consumo_now/voltage');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"Voltage_V":', "");
                let resp = "El voltaje es de  "+auxB.replace('}]]', "")+" Voltios";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }


    const fetchPreviousWeather = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/temperatura/ayer');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"centigrados":', "");
                let resp = "La temperatura de ayer fue de "+auxB.replace('}]]', "")+" grados centigrados";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCaptureWeather = async (captura) =>{
        try {
            const res = await axios.get('http://localhost:8800/temperatura/'+captura);
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"centigrados":', "");
                let resp = "La temperatura de en la fecha especificada fue de "+auxB.replace('}]]', "")+" grados centigrados";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCurrentTotal = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/produccionTotal/actual');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"watts":', "");
                let resp = "La produccion total de hoy es de "+auxB.replace('}]]', "")+" kilowatts";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPreviousTotal = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/produccionTotal/ayer');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"watts":', "");
                let resp = "La produccion total de ayer fue de "+auxB.replace('}]]', "")+" kilowatts";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCaptureTotal = async (captura) =>{
        try {
            const res = await axios.get('http://localhost:8800/produccionTotal/'+captura);
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"watts":', "");
                let resp = "La produccion total en la fecha especificada fue de "+auxB.replace('}]]', "")+" kilowatts";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }
  /*generar graficas*/
    const dataP = panelData.map((panel)=>({label: panel.nombrePanel, bar: panel.kilowatts}));
    const dataPower = PowerData.map((power)=>({label: power.fecha, bar: power.suma_total_value}));
    const dataTotal = totalData.map((total)=>({label: total.captura, bar: total.watts}));

/*funciones para los botenes de escuchar*/
    const microphoneRef = useRef(null);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
        <div className="mircophone-container">
            Buscador no es compatible con busqueda de voz.
        </div>
        );
    }

    const handleListing = () => {
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
          continuous: true,
        });
    };

    const stopHandle = () => {
        setIsListening(false);

        if(transcript !== ""){
            generateResponse(transcript);
        } 
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };

    const handleReset = () => {
        resetTranscript();
        setRespuesta("");
    };
/*generar busqueda de fecha*/
    const generateResponse = (search) =>{
        var auxDate="";
        var fecha = "";
        var dia= "";
        var mes= "";
        var año= "";

        if(search.match(/(\d+ \w{2} \w{4,10} \w{2,3} \d{4})/g)){
            auxDate =""+search.match(/(\d+ \w{2} \w{4,10} \w{2,3} \d{4})/g);
            dia=""+auxDate.match(/(\d{1,2} \w{2})/g);
            dia=""+dia.match(/(\d{1,2})/g);
            mes=""+auxDate.match(/[a-zA-Z]{4,10}/g);
            año=""+auxDate.match(/(\d{4})/g);

            if(dia.length === 1){
                dia="0"+dia;
            }
            switch (mes) {
                case 'enero': mes="01"
                    break;
                case 'febrero': mes="02"
                    break;
                case 'marzo': mes="03"
                    break;
                case 'abril': mes="04"
                    break;
                case 'mayo': mes="05"
                    break;
                case 'junio': mes="06"
                    break;
                case 'julio': mes="07"
                    break;
                case 'agosto': mes="08"
                    break;
                case 'septiembre': mes="09"
                    break;
                case 'octubre': mes="10"
                    break;
                case 'noviembre': mes="11"
                    break;
                case 'diciembre': mes="12"
                    break;
                default:
                    break;
            }
            
            fecha=año+"-"+mes+"-"+dia;
            
            console.log(fecha);
        }
/* palabras claves detectadas en la busque por voz*/

/* envio de datos para la generacion de tablas*/
        if (search.indexOf("tabla") !== -1 || search.indexOf("grafica") !== -1){

            if(search.indexOf("potencia") !== -1 || search.indexOf("watt") !== -1){
                setShowTemp(true);
            } else if(search.indexOf("producción") !== -1 || search.indexOf("paneles") !== -1){
                setShowPanel(true);
            } else if(search.indexOf("total") !== -1){
                setShowTotal(true);
            } else setRespuesta("Error en busqueda");

        } else if(search.indexOf("panel") !== -1){

            var panelN="";
            if (search.indexOf("panel 1") !== -1 || search.indexOf("panel uno") !== -1) {
                panelN="panel1"
            } else if (search.indexOf("panel 2") !== -1 || search.indexOf("panel dos") !== -1) {
                panelN="panel2"
            } else if (search.indexOf("panel 3") !== -1 || search.indexOf("panel tres") !== -1) {
                panelN="panel3"
            } else if (search.indexOf("panel 4") !== -1 || search.indexOf("panel cuatro") !== -1) {
                panelN="panel4"
            } else if (search.indexOf("panel 5") !== -1 || search.indexOf("panel cinco") !== -1) {
                panelN="panel5"
            }

            if (fecha !== "") {
                fetchPanelCapture(panelN, fecha);
            } else {
                fetchPanelProd(panelN);
            }
           
            
        } else  if (search.indexOf("potencia") !== -1 || search.indexOf("Watts") !== -1) {

            if (fecha !== "") {
                fetchCaptureWeather(fecha);
            } else if (search.indexOf("ayer") !== -1 || search.indexOf("anterior") !== -1) {
                fetchPreviousWeather();
            } else {
                fetchCurrentPower();
            }

        } else if(search.indexOf("corriente") !== -1 || search.indexOf("amperaje") !== -1){
            if(search.indexOf("actual") !== -1 || search.indexOf('hoy') !== -1){
                fetchCurrent();
            }else setRespuesta('Error en busqueda')
            

        }else if(search.indexOf("voltaje") !== -1 || search.indexOf("voltios") !== -1){
            if(search.indexOf("actual") !== -1 || search.indexOf('hoy') !== -1){
                fetchCurrentvoltage();
            }else setRespuesta('Error en busqueda')
            

        }else if(search.indexOf("total") !== -1){
            if (fecha !== "") {
                fetchCaptureTotal(fecha);
            } else if (search.indexOf("ayer") !== -1 || search.indexOf("anterior") !== -1) {
                fetchPreviousTotal();
            } else {
                fetchCurrentTotal();
            }
        } else setRespuesta("Error en Busqueda")
    }
    /* parte body html*/
    return (
        <div className="Body">
            <div className="header">
                <br/>
                <Container fluid>
                    <Row>
                        <Col xs={8}>
                            <div className="microphone-wrapper">
                                <Container className="mircophone-container">                            
                                    <div className="microphone-status">
                                        {isListening ? "Escuchando........." : "Presione para Iniciar"}
                                    </div>
                                    {isListening}
                                    <br/>
                                    <div className="microphone-result-container">
                                            <div className="microphone-result-text">{transcript}</div>
                                    </div>
                                    <br/>
                                    <div className="respuesta-busqueda">
                                        {respuesta}
                                    </div>
                                    <br/>
                                    <div className="control-microphone">
                                        <Button
                                            className="microphone-button-container"
                                            ref={microphoneRef}
                                            onMouseDown={handleListing}
                                            onMouseUp={stopHandle}
                                            >
                                            Iniciar
                                        </Button>
                                        <Button onClick={() => speak({ text: respuesta })}>Escuchar</Button>
                                        <Button className="microphone-reset btn" onClick={handleReset}>
                                            Reiniciar
                                        </Button>
                                    </div>
                                    <br/>
                                </Container>
                            </div>
                        </Col>
                        <Col>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Instrucciones</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Presione y sostenga el boton "Iniciar" para activar el microfono</p>
                                        <br/>
                                        <p>Dicte lo que desea buscar y suelte el boton "Iniciar"</p>
                                        <br/>
                                        <p>Presione el boton "Escuchar" para escuchar el resultado de su busqueda</p>
                                        <br/>
                                        <p>Para realizar una nueva busqueda presione el boton "Reiniciar"</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                    <br/>
                    <div className="card-menu">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Ejemplos</Accordion.Header>
                                <Accordion.Body>
                                    <p>A continuación se muestran algunos ejemplos de las búsquedas que puede realizar:</p>
                                    <br/>
                                    <p>Para mostrar las tablas de datos:</p>
                                    <p>Muéstrame la tabla de los paneles</p>
                                    <p>Muéstrame la tabla de la potencia</p>
                                    <p>Muéstrame la tabla del total de watts producidos</p>
                                    <br/>
                                    <p>Para ver la cantidad de kilowatts producidos por un panel:</p>
                                    <p>Muéstrame la producción del panel uno</p>
                                    <br/>
                                    <p>Pare ver la potencia utilizada al momento:</p>
                                    <p>Muéstrame la potencia de hoy</p>
                                    <p>Muéstrame la potencia de ayer</p>
                                    <br/>
                                    <p>Para ver la producción total de watts</p>
                                    <p>Muéstrame la producción total de hoy</p>
                                    <p>Muéstrame la producción total de ayer</p>
                                    <br/>
                                    <p>Si desea buscar un dato en una fecha especifica utilice el formato "día" de "mes" del "año":</p>
                                    <p>Muéstrame la temperatura del 5 de agosto del 2023</p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </Container>

                <Modal 
                    size="lg"
                    show={showPanel}
                    onHide={() => setShowPanel(false)}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Produccion por panel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ResponsiveContainer width="100%" aspect={2}>
                            <BarChart 
                                width={500}
                                height={300}
                                data={dataP}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="bar" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPanel(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal 
                    size="lg"
                    show={showTotal}
                    onHide={() => setShowTotal(false)}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Produccion Total</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ResponsiveContainer width="100%" aspect={2}>
                            <BarChart 
                                width={500}
                                height={300}
                                data={dataTotal}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="bar" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowTotal(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal 
                    size="lg"
                    show={showTemp}
                    onHide={() => setShowTemp(false)}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Potencia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ResponsiveContainer width="100%" aspect={2}>
                            <BarChart 
                                width={500}
                                height={300}
                                data={dataPower}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="bar" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowTemp(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}



export default Home;