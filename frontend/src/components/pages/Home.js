import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Accordion, Button, Modal} from "react-bootstrap";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";

function Home (){
    const [respuesta, setRespuesta] = useState("");
    const { speak } = useSpeechSynthesis();
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [startDisabled, setStartDisabled] = useState(false);
    const [stopDisabled, setStopDisabled] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [showTotal, setShowTotal] = useState(false);
    const [showTemp, setShowTemp] = useState(false);
    const[panelData, setPanelData] = useState([]);
    const[tempData, setTepmData] = useState([]);
    const[totalData, setTotalData] = useState([]);

    useEffect(()=>{
        const fetchPanelData = async ()=>{
            try {
                const res = await axios.get("http://localhost:8800/panel");
                setPanelData(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchTempData = async ()=>{
            try {
                const res = await axios.get("http://localhost:8800/temperatura");
                setTepmData(res.data);
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
        fetchTempData();
    }, []);

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

    const fetchPanelNomPromedio = async (nombrePanel)=>{
        try {
            const res = await axios.get('http://localhost:8800/panel/'+nombrePanel+'/promedio');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"AVG(kilowatts)":', "");
                let resp = "El panel especificado tuvo una produccion promedio de: "+auxB.replace('}]]', "")+" kilowatts esta semana";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp }); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPanelNomDesviacion = async (nombrePanel)=>{
        try {
            const res = await axios.get('http://localhost:8800/panel/'+nombrePanel+'/desviacion');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"STDDEV_SAMP(kilowatts)":', "");
                let resp = "La desviacion estandar del panel especificado fue de: "+auxB.replace('}]]', "")+" esta semana";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp }); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPanelNomVarianza = async (nombrePanel)=>{
        try {
            const res = await axios.get('http://localhost:8800/panel/'+nombrePanel+'/varianza');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"VAR_SAMP(kilowatts)":', "");
                let resp = "La varianza del panel especificado fue de: "+auxB.replace('}]]', "")+" esta semana";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp }); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPanelPromedio = async ()=>{
        try {
            const res = await axios.get('http://localhost:8800/panel/promedio');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"AVG(kilowatts)":', "");
                let resp = "Los paneles tuvieron una produccion promedio de: "+auxB.replace('}]]', "")+" kilowatts";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp }); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPanelDesviacion = async ()=>{
        try {
            const res = await axios.get('http://localhost:8800/panel/desviacion');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"STDDEV_SAMP(kilowatts)":', "");
                let resp = "La desviación estandar de los paneles es de: "+auxB.replace('}]]', "")+".";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp }); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPanelVarianza = async ()=>{
        try {
            const res = await axios.get('http://localhost:8800/panel/varianza');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"VAR_SAMP(kilowatts)":', "");
                let resp = "La varianza de los paneles es de: "+auxB.replace('}]]', "")+".";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp }); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCurrentWeather = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/temperatura/actual');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"centigrados":', "");
                let resp = "La temperatura de hoy es de "+auxB.replace('}]]', "")+" grados centigrados";
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

    const fetchWeatherPromedio = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/temperatura/promedio');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"AVG(centigrados)":', "");
                let resp = "La temperatura promedio los ultimos 7 dias fue de "+auxB.replace('}]]', "")+" grados centigrados";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchWeatherDesviacion = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/temperatura/desviacion');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"STDDEV_SAMP(centigrados)":', "");
                let resp = "La desviación estandar de temperatura los ultimos 7 dias fue de "+auxB.replace('}]]', "")+".";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchWeatherVarianza = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/temperatura/desviacion');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"VAR_SAMP(centigrados)":', "");
                let resp = "La varianza de temperatura los ultimos 7 dias fue de "+auxB.replace('}]]', "")+".";
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

    const fetchTotalPromedio = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/produccionTotal/promedio');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"AVG(watts)":', "");
                let resp = "La produccion de los ultimos 7 dias tuvo un promedio de "+auxB.replace('}]]', "")+" kilowatts";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTotalDesviacion = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/produccionTotal/desviacion');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"STDDEV_SAMP(watts)":', "");
                let resp = "La produccion de los ultimos 7 dias tuvo una desviacion estandar de "+auxB.replace('}]]', "")+".";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTotalVarianza = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/produccionTotal/varianza');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            if (auxA === "[[]]") {
                setRespuesta("Error no se pudo encontrar la informacion especificada");
            } else {
                let auxB = auxA.replace('[[{"STDDEV_SAMP(watts)":', "");
                let resp = "La produccion de los ultimos 7 dias tuvo una varianza de "+auxB.replace('}]]', "")+".";
                console.log(resp);
                setRespuesta(resp);
                speak({ text: resp })   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const dataP = panelData.map((panel)=>({label: panel.nombrePanel, bar: panel.kilowatts}));
    const dataTemp = tempData.map((temperatura)=>({label: temperatura.captura, bar: temperatura.centigrados}));
    const dataTotal = totalData.map((total)=>({label: total.captura, bar: total.watts}));

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
        setStopDisabled(false);
        setStartDisabled(true);
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
          continuous: true,
        });
    };

    const stopHandle = () => {
        setIsListening(false);
        setStopDisabled(true);
        setStartDisabled(false);
        if(transcript !== ""){
            generateResponse(transcript);
        } 
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };

    const handleReset = () => {
        setStopDisabled(true);
        setStartDisabled(false);
        resetTranscript();
        setRespuesta("");
    };

    const generateResponse = (search) =>{
        var auxDate="";
        var fecha = "";
        var dia= "";
        var mes= "";
        var año= "";
        var operacion="";

        if (search.indexOf("promedio") !== -1 || search.indexOf("media") !== -1) {
            operacion="promedio";
        } else if (search.indexOf("desviación") !== -1 || search.indexOf("desviación estándar") !== -1 || search.indexOf("desviación típica") !== -1){
            operacion="desviacion";
        } else if (search.indexOf("varianza") !== -1){
            operacion="varianza";
        }

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

        if (search.indexOf("tabla") !== -1 || search.indexOf("grafica") !== -1 || search.indexOf("esquema") !== -1 ){

            if(search.indexOf("temperatura") !== -1 || search.indexOf("clima") !== -1){
                setShowTemp(true);
            } else if(search.indexOf("panel") !== -1 || search.indexOf("paneles") !== -1){
                setShowPanel(true);
            } else if(search.indexOf("total") !== -1 || search.indexOf("general") !== -1 || search.indexOf("suma") !== -1 || search.indexOf("sumatoria") !== -1 ){
                setShowTotal(true);
            } else setRespuesta("Error en busqueda");

        } else if(search.indexOf("panel") !== -1 || search.indexOf("paneles") !== -1){

            var panelN="";

            if (search.indexOf("panel 1") !== -1 || search.indexOf("panel uno") !== -1 || search.indexOf("primer panel") !== -1 || search.indexOf("panel solar 1") !== -1 || search.indexOf("panel solar uno") !== -1 || search.indexOf("primer panel solar") !== -1 ) {
                panelN="panel1"
            } else if (search.indexOf("panel 2") !== -1 || search.indexOf("panel dos") !== -1 || search.indexOf("segundo panel") !== -1 || search.indexOf("panel solar 2") !== -1 || search.indexOf("panel solar dos") !== -1 || search.indexOf("segundo panel solar") !== -1 ) {
                panelN="panel2"
            } else if (search.indexOf("panel 3") !== -1 || search.indexOf("panel tres") !== -1 || search.indexOf("tercer panel") !== -1 || search.indexOf("panel solar 3") !== -1 || search.indexOf("panel solar tres") !== -1 || search.indexOf("tercer panel solar") !== -1 ) {
                panelN="panel3"
            } else if (search.indexOf("panel 4") !== -1 || search.indexOf("panel cuatro") !== -1 || search.indexOf("cuarto panel") !== -1 || search.indexOf("panel solar 4") !== -1 || search.indexOf("panel solar cuatro") !== -1 || search.indexOf("cuarto panel solar") !== -1 ) {
                panelN="panel4"
            } else if (search.indexOf("panel 5") !== -1 || search.indexOf("panel cinco") !== -1 || search.indexOf("quinto panel") !== -1 || search.indexOf("panel solar 5") !== -1 || search.indexOf("panel solar cinco") !== -1 || search.indexOf("quinto panel solar") !== -1 ) {
                panelN="panel5"
            }

            if (fecha !== "") {

                fetchPanelCapture(panelN, fecha);

            } else if(panelN !== ""){

                if(operacion !== ""){
                    
                    switch (operacion) {
                        case "promedio":
                            fetchPanelNomPromedio(panelN);
                            break;
                        case "desviacion":
                            fetchPanelNomDesviacion(panelN);
                            break;
                        case "varianza":
                            fetchPanelNomVarianza(panelN);
                            break;
                        default:
                            break;
                    }

                } else fetchPanelProd(panelN);

            } else {

                switch (operacion) {
                    case "promedio":
                        fetchPanelPromedio();
                        break;
                    case "desviacion":
                        fetchPanelDesviacion();
                        break;
                    case "varianza":
                        fetchPanelVarianza();
                        break;
                    default:
                        break;
                }
            }
           
            
        } else  if (search.indexOf("temperatura") !== -1 || search.indexOf("clima") !== -1) {

            if (fecha !== "") {
                fetchCaptureWeather(fecha);
            } else if (operacion !== ""){
                switch (operacion) {
                    case "promedio":
                        fetchWeatherPromedio();
                        break;
                    case "desviacion":
                        fetchWeatherDesviacion();
                        break;
                    case "varianza":
                        fetchWeatherVarianza();
                        break;
                    default:
                        break;
                }
            }else if (search.indexOf("ayer") !== -1 || search.indexOf("anterior") !== -1 || search.indexOf("antes de") !== -1 ) {
                fetchPreviousWeather();
            } else {
                fetchCurrentWeather();
            }

        } else if(search.indexOf("total") !== -1 || search.indexOf("general") !== -1 || search.indexOf("suma") !== -1 || search.indexOf("sumatoria") !== -1 ){
            if (fecha !== "") {
                fetchCaptureTotal(fecha);
            } else if (operacion !== ""){
                switch (operacion) {
                    case "promedio":
                        fetchTotalPromedio();
                        break;
                    case "desviacion":
                        fetchTotalDesviacion();
                        break;
                    case "varianza":
                        fetchTotalVarianza();
                        break;
                    default:
                        break;
                }
            }else if (search.indexOf("ayer") !== -1 || search.indexOf("anterior") !== -1 || search.indexOf("antes de") !== -1 ) {
                fetchPreviousTotal();
            } else {
                fetchCurrentTotal();
            }
        } else setRespuesta("Error en Busqueda")
    }
    

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
                                    <br/>
                                    <div className="microphone-result-container">
                                            <div className="microphone-result-text">{transcript}</div>
                                    </div>
                                    <br/>
                                    <div className="search-result">
                                        {respuesta}
                                    </div>
                                    <br/>
                                    <div className="control-microphone">
                                        <Button
                                            className="microphone-button-container"
                                            disabled={startDisabled}
                                            ref={microphoneRef}
                                            onClick={handleListing}
                                            >
                                            Iniciar
                                        </Button>
                                        <Button
                                            className="microphone-button-container"
                                            disabled={stopDisabled}
                                            ref={microphoneRef}
                                            onClick={stopHandle}
                                            >
                                            Parar
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
                                        <p>Dicte lo que desea buscar y presione el boton "Parar"</p>
                                        <br/>
                                        <p>Presione el boton "Escuchar" para volver a escuchar el resultado de su busqueda</p>
                                        <br/>
                                        <p>Para realizar una nueva busqueda presione el boton "Reiniciar"</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                    <br/>
                    <div className="examples">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Ejemplos</Accordion.Header>
                                <Accordion.Body>
                                    <p>A continuación se muestran algunos ejemplos de las búsquedas que puede realizar:</p>
                                    <br/>
                                    <p>Para mostrar las tablas de datos:</p>
                                    <p>Muéstrame la tabla de los paneles</p>
                                    <p>Muéstrame la tabla de la temperatura</p>
                                    <p>Muéstrame la tabla del total de watts producidos</p>
                                    <br/>
                                    <p>Para ver la cantidad de kilowatts producidos por un panel:</p>
                                    <p>Muéstrame la producción del panel uno</p>
                                    <br/>
                                    <p>Pare ver la temperatura ambiental:</p>
                                    <p>Muéstrame la temperatura de hoy</p>
                                    <p>Muéstrame la temperatura de ayer</p>
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
                    aria-labelledby="modal-panel">
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
                    aria-labelledby="modal_total">
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
                    aria-labelledby="modal-temperatura">
                    <Modal.Header closeButton>
                        <Modal.Title>Temperatura</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ResponsiveContainer width="100%" aspect={2}>
                            <BarChart 
                                width={500}
                                height={300}
                                data={dataTemp}
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