const fs=require("fs"); 
fs.writeFileSync("/app/google-credentials-heroku.json", process.env.GOOGLE_CONFIG, (err) => {});