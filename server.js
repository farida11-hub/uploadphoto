import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import blogRoutes from './routs/blogRoutes.js';

const app = express();
const PORT = 3001;

app. use(express.urlencoded({extended: true}));
app. use('/uploads', express.static('uploads'));
app.set('view engine','ejs');    

// file and folder setup
if(!fs.existsSync('posts.json'))fs.writeFileSync('posts.json', '[]');
if(!fs.existsSync('uploads'))fs.mkdirSync('uploads');

//multer set up
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb)=>{
        cb(null, Date.now()+ path.extname(file.originalname));
    }
});

const upload = multer({storage});
// rout handling
app.use('/', (blogRoutes(upload)));


app.listen(PORT, ()=>{
    console.log("server is started");
});

