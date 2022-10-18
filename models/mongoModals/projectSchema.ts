import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
    name: String,
    tag: String,
    imageUrl: String,
    startDate: Date,
    endDate: Date,
    people: [{ type: Schema.Types.ObjectId, ref: "User" }],
    skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
});

const Project = models.Project || model("Project", projectSchema);

export default Project;
