const express = require('express')
const cors = require('cors')
const youtubedl = require("youtube-dl-exec");
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"]
  })); 

app.get('/', (req,res)=>{
    res.send('backend is running')
})

app.post('/download', async(req,res)=>{
    const {url} = req.body;
    console.log(url)
   try{
        const output = await youtubedl(url, { 
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        })
        res.json({
            message:"Download success",
            url: output.url
        })
    }
    catch(e){
        res.json({
            message:"Download failed",
            e
        })
    }
    
})

app.listen(3000, ()=>{
    console.log('app running on 3000')
})

 

