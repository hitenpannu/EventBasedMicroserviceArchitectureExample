const express = require('express');
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/events", (request, response) => {
    const {type, data} = request.body;
    if (type == "commentUpdated") {
        const {postId, id, content, status } = data
        if (status == "pending") {
            setTimeout(() => {
                let newStatus = content.toLowerCase().includes("orange") ? "rejected" : "approved"
                axios.post("http://localhost:4003/events", {
                        type: "commentModerated",
                        data: {postId, id, content, status: newStatus}
                    })
            }, 5000)
            
        }
    }

    response.send({status: "Received by Comment-Moderation"})
})

app.listen(4004, ()=> {
    console.log("Comment Moderation Service listening on PORT 4004")
})