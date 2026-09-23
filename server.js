require("dotenv").config();
const app = require("./SRC/app"); 

const connnecToDB = require("./SRC/config/db");

connnecToDB();



//RUN  THE SERVER
app.listen(3000,() => {
    console.log("server is running on port 3000")
});