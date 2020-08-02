const express =  require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require("axios");

const posts = {}
const app = express();

app.use(bodyParser.json())
app.use(cors())

app.get("/posts", (request, response) => {
    response.send(posts);
});

app.post("/posts", (request, response) => {
    const newPostId = randomBytes(4).toString('hex');
    const postBody = request.body.title;
    const newPost = {
        id: newPostId,
        title: postBody
    }
    posts[newPostId] = newPost


    // Post Event
    axios.post("http://localhost:4003/events", {
        type: "postCreated",
        data: newPost
    })
    .then(()=>{})
    .catch((error)=>{})

    response.send(newPost);
});

app.post("/events", (request, response) => {
    const event = request.body;
    console.log("New Event Received By PostService " + event)
    response.send({status:"Received By PostService"})
})

app.listen(4000, ()=> {
    console.log("Post Service Listening on 4000")
})