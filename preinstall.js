const fs=require("fs"); 
fs.writeFileSync("./config.json", process.env.GOOGLE_CONFIG, (err) => {});