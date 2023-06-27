import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {Button, Card, Form} from 'react-bootstrap'
import axios from "axios"


function ViewOneQuadriPage(){
    const [quadriPage, setQuadriPage] = useState([])
    const [duesForm, setDues] = useState([{ "name" : "", "price" : "" , "payedBy" : "" , "currency" : "" }])
    const [newCategory, setNewCategory] = useState({category : ""})
    const [newContributor, setNewContributor] = useState({name : "", email : ""})
    const queryParameters = useParams()
    const idPage = queryParameters["id"]
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/quadricount/"+idPage)
        .then(res => {
            setQuadriPage(res.data)
        })
    }, [])

    let handleChangeDues = (i, e) => {
        let newValues = [...duesForm]
        newValues[i][e.target.name] = e.target.value
        setDues(newValues)
    }


    let handleChangeCategory = (e) => {
        setNewCategory({category : e.target.value})
    }

    let handleChangeContributor = (e) => {
        // newContributor[e.target.name] = e.target.value
        console.log(newContributor)
        setNewContributor({...newContributor, [e.target.name] : e.target.value})
    }

    let newDue = (i) => {
        setDues([...duesForm,  { "name" : "", "price" : "" , "payedBy" : "" , "currency" : "" } ] )
    }

    let deleteDue = (i) => {
        let newValues = [...duesForm]
        newValues.splice(i, 1)
        setDues(newValues)
    }

    let handleSubmitNewCategory = (event) => {
        event.preventDefault()
        let jsonString = 
        {
            "category" : newCategory
        }
        axios.post("http://localhost:3001/quadricount/update/category/"+idPage, jsonString).then((response) => {
            console.log(response);
            window.location.reload("false")
        });
    }

    let handleSubmitNewContributor = (event) => {
        event.preventDefault()
        let jsonString = 
        {
            "contributor" : newContributor
        }

        axios.post("http://localhost:3001/quadricount/update/contributors/"+idPage, jsonString).then((response) => {
            console.log(response);
            window.location.reload("false")
        });
    }

    let handleSubmit = (event) => {
        event.preventDefault()
        let jsonString = null
        if(quadriPage.toPay){
            jsonString = 
            {
                "toPay" : [...quadriPage.toPay, duesForm[0]]
            }
        }else{
            jsonString = 
            {
                "toPay" : [duesForm[0]]
            }
        }
        
        axios.post("http://localhost:3001/quadricount/update/count/"+idPage, jsonString).then((response) => {
            console.log(response);
            navigate("/list")
        });
    }


    return (
        <Card>
        <Card.Body>
            <Card.Title>{quadriPage.pageName}</Card.Title>
            
                Created on {quadriPage.createdOn} by {quadriPage.pageName}<br />
                <br />
                <div>
                    Contributors : 
                    <Form className="forms" id="newDues" onSubmit={handleSubmitNewContributor}>
                        <Form.Group className="mb-3">
                            &nbsp;
                            <div> 
                                <ul>
                                    {   quadriPage.contributors ?
                                            quadriPage.contributors.map((element) => (
                                                <li>{element.name}</li>
                                            ))
                                        :
                                        <div>No contributors</div>
                                    }
                                </ul>

                                <div style={{ display: 'flex' }}>
                                    <Form.Control type="text" name="name" value={newContributor.name || ""} onChange={e => handleChangeContributor(e)} placeholder="Jean" />
                                    <Form.Control type="email" name="email" value={newContributor.email || ""} onChange={e => handleChangeContributor(e)} placeholder="jeandupont@exemple.com" />
                                </div>
                            </div>
                            <Button type="submit">Ajouter le contributeur</Button>
                            
                        </Form.Group>
                    </Form>
                </div>

                <br />

                <div>
                    Dues : 
                    <ul>
                        {   quadriPage.toPay ?
                                quadriPage.toPay.map((element) => (
                                    <li>{element.name} au prix de {element.price}{element.currency} payé par {element.payedBy}</li>
                                ))
                            :
                                <div>No contributors</div>
                        }
                    </ul>
                    <br />
                    <Form className="forms" id="newDues" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contribution :</Form.Label>&nbsp;
                            <Button onClick={() => newDue()} > + </Button>
                            {
                                duesForm.map((element, index) => (
                                    
                                    <div style={{ display: 'flex' }} key={index}>
                                        <Form.Select name="name" onChange={e => handleChangeDues(index, e)} aria-label="Quoi?">
                                            <option>Choisir une catégorie</option>
                                            {
                                                quadriPage.categories ?
                                                    quadriPage.categories.map((element) => (
                                                        <option value={element.category}>{element.category}</option>
                                                    ))
                                                :
                                                <option disabled>Aucune catégorie</option>
                                            
                                            }
                                        </Form.Select>
                                        <Form.Control type="number" name="price" value={element.price || ""} onChange={e => handleChangeDues(index, e)} placeholder="53" />
                                        <Form.Select name="payedBy" onChange={e => handleChangeDues(index, e)} aria-label="Qui?">
                                            <option>Choisir un contributeur</option>
                                            {
                                                quadriPage.contributors ?
                                                    quadriPage.contributors.map((contributor) => (
                                                        <option value={contributor.name}>{contributor.name}</option>
                                                    ))
                                                :
                                                <option disabled>Aucun contributeur</option>
                                            
                                            }
                                        </Form.Select>
                                        <Form.Select name="currency" onChange={e => handleChangeDues(index, e)} aria-label="Devise">
                                            <option value="€">Euro (€)</option>
                                            <option value="$">Dollar ($)</option>
                                        </Form.Select>
                                        <Button onClick={() => deleteDue(index)} > - </Button>
                                    </div>
                                    
                                ))
                            } 
                            <br/>
                            <Button type="submit"> Ajouter les paiements </Button>
                            
                        </Form.Group>
                    </Form>
                </div>
                <div>
                    <Form className="forms" id="newDues" onSubmit={handleSubmitNewCategory}>
                        <Form.Group className="mb-3">
                            <Form.Label>Catégories :</Form.Label>&nbsp;
                            <div> 
                                <ul>
                                    {   quadriPage.categories ?
                                            quadriPage.categories.map((element) => (
                                                <li>{element.category}</li>
                                            ))
                                        :
                                        <div>No categories</div>
                                    }
                                </ul>

                                <div style={{ display: 'flex' }}>
                                    <Form.Control type="text" name="name" value={newCategory.category || ""} onChange={e => handleChangeCategory(e)} placeholder="Courses" />
                                </div>
                            </div>
                            <Button type="submit">Ajouter la catégorie</Button>
                            
                        </Form.Group>
                    </Form>
                </div>
                <div>
                    Calculator :
                </div>
            
        </Card.Body>
        </Card>
    )
    
}

export default ViewOneQuadriPage