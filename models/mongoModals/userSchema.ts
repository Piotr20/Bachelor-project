import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    experienceYears: Number,
    department: String,
    location: String,
    role: String,
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    skills: [{ name: String, expertise: String }],
    imageUrl: String,
});

const User = models.User || model("User", userSchema);

export default User;
