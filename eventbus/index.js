const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json())


app.post("/events", (request, response) => {

    const event = request.body;
    console.log("Received Event "+ event)

    axios.post("http://localhost:4000/events", event).then((response)=>{console.log(response.data)}).catch((error)=>{});
    axios.post("http://localhost:4001/events", event).then((response)=>{console.log(response.data)}).catch((error)=>{});
    axios.post("http://localhost:4002/events", event).then((response)=>{console.log(response.data)}).catch((error)=>{});
    axios.post("http://localhost:4004/events", event).then((response)=>{console.log(response.data)}).catch((error)=>{});

    response.status(200).send({status:"ok"});
})

app.listen(4003, () =>{
    console.log("Event Bus Listening on port 4003")
})