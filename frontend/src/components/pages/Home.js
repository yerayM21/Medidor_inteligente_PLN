import React from "react";
import Panel from "../images/panel-solar.png";
import Paneles from "../images/paneles-solares.png";
import Termometro from "../images/termometro.png";
import { useRef, useState } from "react";
import { Container, Row, Col, Accordion, Button, Card, Modal } from "react-bootstrap";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Home (){
    const [respuesta, setRespuesta] = useState("");
    const { speak } = useSpeechSynthesis();
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [showTotal, setShowTotal] = useState(false);
    const [showTemp, setShowTemp] = useState(false);

    const data = [
        {
            nombre: 'Panel 1',
            watts: 300,
        },
        {
            nombre: 'Panel 2',
            watts: 600,
        },
        {
            nombre: 'Panel 3',
            watts: 100,
        },
        {
            nombre: 'Panel 4',
            watts: 500,
        },
        {
            nombre: 'Panel 5',
            watts: 400,
        }
    ]

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
            setRespuesta(createResponse(transcript));
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
                                data={data}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nombre" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="watts" fill="#8884d8" />
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
                                data={data}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nombre" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="watts" fill="#8884d8" />
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
                                data={data}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nombre" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="watts" fill="#8884d8" />
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

function createResponse (search){
    var s = search;
    var operacion="";
    var objeto="";


    if(s.indexOf("temperatura") !== -1){
        return "La temperatura de hoy es: "
    } else {

        if(s.indexOf("promedio") !== -1){
            operacion="promedio";
        } else if(s.indexOf("varianza") !== -1){
            operacion="varianza";
        } else if(s.indexOf("desviación") !== -1){
            operacion="desviacion";
        } else if(s.indexOf("producción") !== -1){
            operacion="produccion";
        } else{
            return "Error en la busqueda";
        };

        if(s.indexOf("panel 1") !== -1 || s.indexOf("panel uno") !== -1){
            objeto="panel 1";
        } else if(s.indexOf("panel 2") !== -1 || s.indexOf("panel dos") !== -1){
            objeto="panel 2";
        } else if(s.indexOf("panel 3") !== -1 || s.indexOf("panel tres") !== -1){
            objeto="panel 3";
        } else if(s.indexOf("panel 4") !== -1 || s.indexOf("panel cuatro") !== -1){
            objeto="panel 4";
        } else if(s.indexOf("panel 5") !== -1 || s.indexOf("panel cinco") !== -1){
            objeto="panel 5";
        } else {
            return "Error en la busqueda";
        };

        return "Se desea encontrar "+operacion+" de "+objeto;
    }
}

export default Home;