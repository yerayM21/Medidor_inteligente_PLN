import React, { useEffect, useRef, useState } from "react";
import Panel from "../images/panel-solar.png";
import Paneles from "../images/paneles-solares.png";
import Termometro from "../images/termometro.png";
import { Container, Row, Col, Accordion, Button, Card, Modal} from "react-bootstrap";
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

    const dataP = panelData.map((panel)=>({label: panel.nombrePanel, bar: panel.kilowatts}));
    const dataTemp = tempData.map((temperatura)=>({label: temperatura.captura, bar: temperatura.centigrados}));
    const dataTotal = totalData.map((total)=>({label: total.captura, bar: total.watts}));

    const listaTemp = tempData.map((td)=>(td.centigrados));
    const listaPanel = panelData.map((td)=>(td.kilowatts));
    const listaTotal = totalData.map((td)=>(td.watts));

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
            if (transcript.indexOf("tabla") !== -1){
                setShowPanel(true);
            }else{
                setRespuesta(createResponse(transcript, listaPanel, listaTemp, listaTotal));
            }
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
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={Panel} />
                            <Card.Body>
                                <Card.Title>Produccion diaria por pannel</Card.Title>
                                <Card.Text>
                                    Muestra la produccion generada por cada panel el dia de hoy
                                </Card.Text>
                                <Button variant="primary" onClick={() => setShowPanel(true)}>Mostrar</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={Paneles} />
                            <Card.Body>
                                <Card.Title>Produccion semanal</Card.Title>
                                <Card.Text>
                                    Muestra la produccion total de los ultimos 7 dias
                                </Card.Text>
                                <Button variant="primary" onClick={() => setShowTotal(true)}>Mostrar</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={Termometro} />
                            <Card.Body>
                                <Card.Title>Temperarura ambiental</Card.Title>
                                <Card.Text>
                                    Muestra la temperatura ambiental de los ultimos 7 dias
                                </Card.Text>
                                <Button variant="primary" onClick={() => setShowTemp(true)}>Mostrar</Button>
                            </Card.Body>
                        </Card>
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

function createResponse (search, panelData, tempData, totalData){
    var s = search;
    var objeto="";
    var produccion=0;
    const panelD = [panelData];
    const tempD = [tempData];
    const totalD = [totalData];


    if(s.indexOf("total") !== -1){
        let currentTot = totalD.at(totalD.length-1);
        return "La produccion total de hoy es de: "+currentTot+""
    } else if(s.indexOf("temperatura") !== -1 || s.indexOf("clima") !== -1){
        let currentTemp = tempD.at(tempD.length-1);
        return "La temperatura de hoy es: "+currentTemp+""
    } else {

        if(s.indexOf("panel 1") !== -1 || s.indexOf("panel uno") !== -1){
            objeto="panel 1";
            produccion = panelD.at(0);
        } else if(s.indexOf("panel 2") !== -1 || s.indexOf("panel dos") !== -1){
            produccion = panelD.at(1);
            objeto="panel 2";
        } else if(s.indexOf("panel 3") !== -1 || s.indexOf("panel tres") !== -1){
            produccion = panelD.at(2);
            objeto="panel 3";
        } else if(s.indexOf("panel 4") !== -1 || s.indexOf("panel cuatro") !== -1){
            produccion = panelD.at(3);
            objeto="panel 4";
        } else if(s.indexOf("panel 5") !== -1 || s.indexOf("panel cinco") !== -1){
            produccion = panelD.at(4);
            objeto="panel 5";
        } else {
            return "Error en la busqueda";
        };

        return "La produccion del "+objeto+" es de "+produccion+"";
    }
}

export default Home;