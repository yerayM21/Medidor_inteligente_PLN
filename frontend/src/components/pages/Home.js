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
            let auxB = auxA.replace('[[{"kilowatts":', "");
            let resp = "El panel buscado tuvo una produccion de: "+auxB.replace('}]]', "")+" kilowatts";
            console.log(resp);
            setRespuesta(resp);
            speak({ text: resp })
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCurrentWeather = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/temperatura/actual');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            let auxB = auxA.replace('[[{"centigrados":', "");
            let resp = "La temperatura de hoy es de "+auxB.replace('}]]', "")+" grados centigrados";
            console.log(resp);
            setRespuesta(resp);
            speak({ text: resp })
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPreviousWeather = async () =>{
        try {
            const res = await axios.get('http://localhost:8800/temperatura/ayer');
            let aux = [res.data];
            let auxA = JSON.stringify(aux);
            let auxB = auxA.replace('[[{"centigrados":', "");
            let resp = "La temperatura de ayer es de "+auxB.replace('}]]', "")+" grados centigrados";
            console.log(resp);
            setRespuesta(resp);
            speak({ text: resp })
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
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
          continuous: true,
        });
    };
    const stopHandle = () => {
        setIsListening(false);

        if(transcript !== ""){
            if (transcript.indexOf("tabla") !== -1 || transcript.indexOf("grafica") !== -1){

                if(transcript.indexOf("temperatura") !== -1){
                    setShowTemp(true);
                } else if(transcript.indexOf("panel") !== -1){
                    setShowPanel(true);
                } else if(transcript.indexOf("total") !== -1){
                    setShowTotal(true);
                } else setRespuesta("Error en busqueda");

            } else if(transcript.indexOf("panel 1") !== -1 || transcript.indexOf("panel uno") !== -1){
                fetchPanelProd("panel1");
            } else if(transcript.indexOf("panel 2") !== -1 || transcript.indexOf("panel dos") !== -1){
                fetchPanelProd("panel2");
            } else if(transcript.indexOf("panel 3") !== -1 || transcript.indexOf("panel tres") !== -1){
                fetchPanelProd("panel3");
            } else if(transcript.indexOf("panel 4") !== -1 || transcript.indexOf("panel cuatro") !== -1){
                fetchPanelProd("panel4");
            } else if(transcript.indexOf("panel 5") !== -1 || transcript.indexOf("panel cinco") !== -1){
                fetchPanelProd("panel5");
            } else  if (transcript.indexOf("temperatura") !== -1 || transcript.indexOf("clima") !== -1) {
                if (transcript.indexOf("ayer") !== -1 || transcript.indexOf("anterior") !== -1) {
                    fetchPreviousWeather();
                } else {
                    fetchCurrentWeather();
                }

            } else if(transcript.indexOf("total") !== -1){
                if (transcript.indexOf("ayer") !== -1 || transcript.indexOf("anterior") !== -1) {
                    
                } else {
                    
                }
            }
            setRespuesta("Error en busqueda");
        }
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };
    const handleReset = () => {
        resetTranscript();
        setRespuesta("");
    };
    

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
                                        <Button onClick={() => fetchCurrentWeather()}>
                                            aux
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
                                    <p>Ejemplos</p>
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