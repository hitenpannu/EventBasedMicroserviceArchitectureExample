const express = require("express");
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require('cors');
const axios = require("axios");

const commentsByPostId = {};
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (request, response) => {
    response.send(commentsByPostId[request.params.id] || []);
});

app.post("/posts/:id/comments", (request, response) => {
    const newCommentId = randomBytes(4).toString('hex');
    const newCommentBody = request.body.content;
    const postId = request.params.id;
    const newComment = {
        postId,
        id: newCommentId,
        content: newCommentBody
    };

    const previousComments = commentsByPostId[postId] || []
    previousComments.push(newComment)
    commentsByPostId[postId] = previousComments;

    // Post Event
    axios.post("http://localhost:4003/events", {
        type: "commentUpdated",
        data: {...newComment, status: "pending"}
    })
    .then(()=>{})
    .catch(error => { console.log(error) })

    response.send(newComment)
});

app.post("/events", (request, response) => {
    const {type, data} = request.body;
    if (type == "commentModerated") {
        axios.post("http://localhost:4003/events", {
            type: "commentUpdated",
            data
        })
    }
    console.log("New Event Received By Comment Service " + event)
    response.send({status:"Received By Comment Service"})
})

app.listen(4001, ()=> {
    console.log("Comment Service listening on 4001");
})