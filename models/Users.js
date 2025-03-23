import mongoose from "mongoose";



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


const User = mongoose.model("Users", userSchema);

export default User;
