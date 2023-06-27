import { QuadricountController } from "./controller/quadricount/quadricountController"

const express = require("express")
const mongoose = require('mongoose')
const app = express()
const port = 3001;


app.use(express.json())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
})


app.get("/", (req, res) => res.send("Hello World!"))

app.get("/quadricount/", (req, res) => QuadricountController.findAllCounts(req, res))
app.get("/quadricount/:id", (req, res) => QuadricountController.findCount(req, res))
app.post("/quadricount/create", (req, res) => QuadricountController.createCount(req, res))
app.get("/quadricount/delete/:id", (req, res) => QuadricountController.deleteCount(req, res))
app.post("/quadricount/update/count/:id", (req, res) => QuadricountController.updateCount(req, res))
app.post("/quadricount/update/category/:id", (req, res) => QuadricountController.updateCategory(req, res))
app.post("/quadricount/update/contributors/:id", (req, res) => QuadricountController.updateContributors(req, res))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

async function main(){
  await mongoose.connect("mongodb://localhost:27017/QuadriCount")
  console.log("console ok")
}

main().catch(err => console.log(err))