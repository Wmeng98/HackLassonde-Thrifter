const fs=require("fs"); 
fs.writeFile("./config.json", process.env.GOOGLE_CONFIG, (err) => {});