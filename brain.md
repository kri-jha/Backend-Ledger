create a environment - npm init-y 

package and express install kiya - npm i express 

app.js use for creating intance 

server.js use for run the server form app.js 

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "npx nodemon server.js", // node package executor jo code karte time sever apne app restarrt karta hai 
    "start": "node server.js" // ye kam production ke time aata hai 
  }, 

  npm i mongoose 

  npm i dotenv
  require("dotenv").config(); // is line ka matlab 
 mongo db connnection file setup details 

 npm run dev to start the server 
 

 user authentication -
 usermodel ke andar -
 const userSchema = new mongoose.Schema({ 
  email: {
    type: String,
    required: true,
    // Simple regex: rejects whitespace and missing @ or dot
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address']
  }
});  
 select:false // ka use case 
userSchema.pre('save',async function(next){
    
}) // for packages -npm i bcrypt js 


userSchema.pre('save',async function(next){
     if(this.isModified("password")){
        return next()
     }

     const hash = await bcrypt.hash(this.password,10)
     this.password =hash
     return next()
})// explain this code in simple word


## bcryptjs MODULE_NOT_FOUND

The application crashed because `user.model.js` imports `bcryptjs`, but the package was not installed. Run `npm install bcryptjs` from the project root.

The password pre-save hook also had its condition reversed. Passwords must be hashed only when the password is modified.



cycle of routes working 

Imagine you click:

Register

Frontend sends:
POST /api/auth/register


1. Request arrives
        ↓
2. server.js
   Server is running
        ↓
3. app.js
   "/api/auth" belongs to authRoutes
        ↓
4. auth.routes.js
   POST "/register" belongs to register()
        ↓
5. auth.controller.js
   register() executes
        ↓
6. User Model
   User.create(...)
        ↓
7. User Schema
   Validate the user data
        ↓
8. MongoDB
   Save user
        ↓
9. Response
   ↓
Frontend




                  REQUEST
                     │
                     ↓
                server.js
              "Start server"
                     │
                     ↓
                  app.js
            "Configure Express"
                     │
                     ↓
                  ROUTES
             "Which URL?"
                     │
                     ↓
               CONTROLLER
             "What to do?"
                     │
                     ↓
                 MODEL
          "Talk to database"
                     │
                     ↓
                 SCHEMA
           "Data structure/rules"
                     │
                     ↓
                MongoDB


                And the response travels back upward:

MongoDB
   ↑
Model
   ↑
Controller
   ↑
Route
   ↑
Express
   ↑
Client


jwt private key secret generator form jwt websites using in env to get the token also add the payload and other concpet 

next ka use use ?

problem i face during this project - api testing using postman 
practise to solve the unreachable code -  jwt code user create hone ke baad or res.json created sucessfuly ke pahle dete hai 

2 - route ka architecture samjhane me 
