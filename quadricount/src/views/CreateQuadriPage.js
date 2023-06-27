import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios"

function CreateQuadriPage(){

    const [contributorsList, setContributor] = useState([ { name : "", email : "" } ])
    const [quadripage, setQuadripage] = useState({ pageName : "" })
    const navigate = useNavigate()
    

    let handleChangeQuadripage = (e) => {
        const value = e.target.value
        setQuadripage({ pageName : value })
    }

    let handleChangeContributors = (i, e) => {
        let newValues = [...contributorsList]
        newValues[i][e.target.name] = e.target.value
        setContributor(newValues)
    }

    let newContributor = (i) => {
        setContributor([...contributorsList,  {name : "", email : ""}  ] )
    }

    let deleteContributor = (i) => {
        let newValues = [...contributorsList]
        newValues.splice(i, 1)
        setContributor(newValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault()
        let jsonString = 
        {
            pageName : quadripage.pageName,
            contributors : contributorsList
        }
        console.log(jsonString)
        axios.post("http://localhost:3001/quadricount/create", jsonString).then((response) => {
            console.log(response);
            navigate("/list")
        });
        
    }

    return (
        <Row className="justify-content-md-center">
            <Col xs lg="6">
                <Form className="forms" id="newQuadriPage" onSubmit={handleSubmit}>
                    {/* <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Entrer un e-mail :" />
                        <Form.Text className="text-muted">
                            Nous ne transmettrons votre e-mail a personne sans votre accord.
                        </Form.Text>
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId="pageName">
                        <Form.Label>Nom du QuadriCount:</Form.Label>
                        <Form.Control type="text" value={quadripage.pageName} onChange={e => handleChangeQuadripage(e)} placeholder="Nouveau Quadricount" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contributeurs :</Form.Label>&nbsp;
                        <Button onClick={() => newContributor()} > + </Button>
                        {
                            contributorsList.map((element, index) => (
                                
                                <div style={{ display: 'flex' }} key={index}>
                                    <Form.Control type="text" name="name" value={element.name || ""} onChange={e => handleChangeContributors(index, e)} placeholder="Tom Holland" />
                                    <Form.Control type="email" name="email" value={element.email || ""} onChange={e => handleChangeContributors(index, e)} placeholder="tom.holland@example.com" />
                                    <Button onClick={() => deleteContributor(index)} > - </Button>
                                </div>
                                
                            ))
                        } 
                        
                    </Form.Group>
                    

                    <Button variant="primary" type="submit">
                        Créer
                    </Button>
                </Form>
            </Col>
        </Row>
        
    );
}

export default CreateQuadriPage;