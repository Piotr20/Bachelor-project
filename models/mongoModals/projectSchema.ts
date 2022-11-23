import { Schema, model, models } from "mongoose";

const projectSchema = new Schema(
    {
        name: String,
        tag: String,
        imageURL: String,
        startDate: Date,
        endDate: Date,
        description: String,
        backgroundImageURL: String,
        featuredWork: [
            {
                type: Object,
                name: String,
                jiraURL: String,
            },
        ],
        people: [{ type: Schema.Types.ObjectId, ref: "User" }],
        skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    },
    { timestamps: true }
);

const Project = models.Project || model("Project", projectSchema);

export default Project;
