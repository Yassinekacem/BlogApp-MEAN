// importation des bibliothèques
const express = require('express');  
const mongoose = require('mongoose'); 
const config = require('config'); 
const cors = require('cors'); 
const users = require('./routes/api/users');  
const posts = require('./routes/api/posts'); 
const comments = require('./routes/api/comments');
const likes = require('./routes/api/likes');    
const invitations = require('./routes/api/Invitations');


// initialisation de l'application
const app = express();  
app.use(express.json()) 
app.use(cors());  


// connection à la base de données
const mongo_url = config.get('mongo_url');
mongoose.set('strictQuery', true); 
mongoose
.connect(mongo_url,)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect to MongoDB', err));

// routes
app.use("/api/users" , users)   
app.use("/api/posts" , posts)
app.use("/api/comments" , comments) 
app.use("/api/likes" , likes)  
app.use("/api/invitations" , invitations)  
app.use("/getImage", express.static('./images'));



const port = process.env.PORT || 2000;  
app.listen(port, () => console.log(`Server is running on port ${port}`)); 

