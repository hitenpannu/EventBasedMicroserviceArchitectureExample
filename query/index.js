const express = require('express');
const cors = require("cors");
const axios = require('axios');

const queryDatabase = {}
const app = express();

app.use(cors());
app.use(express.json());

app.post("/events", (request, response) => {
    const {type, data} = request.body;
    console.log("QueryService")
    console.log(type)
    console.log(data);
    if(type == "postCreated") {
        const {id, title} = data;
        queryDatabase[id] = { id, title, comments:{} }
    } else if (type == "commentUpdated") {
        const {postId, id, content, status} = data;
        queryDatabase[postId]["comments"][id] = {id, content, status} 
    }

    response.send({status:"Event Received by Query Service"})
})

app.get("/posts", (request, response) => {
    response.send(queryDatabase)
})

app.listen(4002, () =>{
    console.log("Query Service Listening on port 4002")
})