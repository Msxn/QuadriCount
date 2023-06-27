import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import {Button, Row, Col, Card} from 'react-bootstrap'
import axios from "axios"


function ViewQuadriPages(){

    const [listQuadriPages, setListQuadriPage] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/quadricount/")
        .then(res => {
            setListQuadriPage(res.data)
        })
    }, [])

    let deletePage = (id) => (
        axios.get("http://localhost:3001/quadricount/delete/"+id).then((response) => {
            console.log(response);
            window.location.reload("false")
        })
    )

    let createNewCount = () => (
        navigate("/create-new-count")
    )
    

    

    return(
        <div>
            <Row>
                
                    {
                        listQuadriPages.map((quadriPage, index) => 
                        (
                            <Col >
                                <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{quadriPage.pageName}</Card.Title>
                                    <Card.Text>
                                        Created on {quadriPage.createdOn} by {quadriPage.pageName}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => navigate("/quadricount/"+quadriPage._id)}>Ouvrir</Button>
                                    <Button onClick={() => deletePage(quadriPage._id)} >Supprimer</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                
            </Row>
            <Row>
                <Button onClick={() => createNewCount()} >Créer un nouveau quadricount</Button>
            </Row>
        </div>

    )
}

export default ViewQuadriPages;