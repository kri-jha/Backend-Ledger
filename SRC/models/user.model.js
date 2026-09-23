const mongoose = require("mongoose")
 
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true, 'Email is required'],
        trim:true,
        lowercase:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'], // This regex checks for a valid email format
        unique:[true, 'Email already exists.']
    },

    name: {
        type:String,
        required:[true, 'Name is required'],

    },
    password: {
        type:String,
        required:[true, 'Password is required'],
        minlength:[6, 'Password must be at least 6 characters long'],
        select: false // This will prevent the password from being returned in queries by default
    }
    

} , {
    timestamps:true // This will automatically add createdAt and updatedAt fields to the schema
})
userSchema.pre("save",async function(){
     if(!this.isModified("password")){
        return ;
     } // ! yaha not ka matlab hai ki agar password modify nahi hua hai to next() call kar do aur function se bahar aa jao. Agar password modify hua hai to neeche ka code execute hoga.

    //    this.password = await bcrypt.hash(this.password,10);
   

     const hash = await bcrypt.hash(this.password,10);

      this.password =hash
        return;
    

  
});



userSchema.methods.comparePassword = async function(password){

return await bcrypt.compare(password, this.password)
}


const userModel = mongoose.model("User",userSchema)

module.exports = userModel