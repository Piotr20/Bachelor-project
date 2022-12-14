import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        name: String,
        email: String,
        department: String,
        location: String,
        role: String,
        phone: String,
        projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
        skills: [
            {
                skill: {
                    type: Schema.Types.ObjectId,
                    ref: "Skill",
                },
                expertise: String,
            },
        ],
        imageURL: String,
    },
    { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
