# EventBasedMicroserviceArchitectureExample
Event Bus based Micro-service architecture's very basic implementation for understanding.

A very basic exmaple for understanding the EventBased Micro-Service architecture with react based client.

Client -> 
1. Allow user to create Posts
2. Show All the posts created by all users
3. Allow user to add comments to specific posts.
4. Show All comments for the post inside the Post component.
5. Show comment based on if the comment is approved or rejected.

PostService -> 
1. Provides endpoint for creating Post.
2. Send Event to EventBus after Post is created.

CommentService ->
1. Provide Endpoint for creating Comment for Post
2. Send Event to EventBust After comment is created.
3. Recieve Events related to comment moderation and send Event of comment updated to event bus.

QueryService ->
1. Provides Endpoint for receiving all posts with their comments.
2. Handles Comment Updated Event and updated local database to show latest status of comment.

Comment-Moderation->
1. Handles Event of type CommentUpdated and status pending.
2. Decides if comment should be approved or rejected.
3. Send Event of CommentModerated to Event Bus

Event Bus ->
1. Recieves Events from all the services.
2. Send Received Events to all the services.

![Untitled_9](https://user-images.githubusercontent.com/11689419/89121992-ee62a000-d4ed-11ea-98cc-0a9b547499a3.jpg)
