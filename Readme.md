How to download a video and save to "/Downloads", if you have access to fs

```
const os = require('os')
const fs = require('fs')
const path = require('path')
const youtubedl = require("youtube-dl-exec");

async function download(){

    const downloadDir = path.join(os.homedir(), "Downloads");
    const savePath = path.join(downloadDir, 'video.mp4')

    console.log(downloadDir)
    console.log(savePath)

     // Ensure Downloads folder exists (should be, but just in case)
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    try{
        
        await youtubedl("https://www.youtube.com/watch?v=LvsgCdWss4I", {
            format: "best",           
            output: savePath,  
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        })
        console.log("Download success! ", savePath)
    }
    catch(e){
        console.log("Download failed")
    }
    
}

download()

