import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = new mongoose.Schema(
    {
   name: {type: String, required: true, trim: true},
   email: {type: String, required: true, unique: true,trim: true },
   password: {type: String, required: true, minlength: 6 },
   role: {type: String, enum: ["user", "admin"],  default: "user"}, // role based access control
   bio: {type: String, maxlength: 300}, //Opttional user bio
   avatar:{type: String}, //Store image url for user profile pic
   studyInterests: {type: [String]},   //Array of subjects user is interested in
   studyGroups: [{type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup"}], // Study groups user is part of
   isActive:{type: Boolean, default: true},
    },
   {
    timestamps: true,   //Adds createdAt and updatedAt
   }
   
);
//  Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  //  Compare password for login
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const User = mongoose.model("User", userSchema);
  export default User;