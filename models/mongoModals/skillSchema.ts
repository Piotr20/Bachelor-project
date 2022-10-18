import { Schema, model, models } from "mongoose";

const skillSchema = new Schema({
    name: String,
    imageURL: String,
    docs: String,
});

const Skill = models.Skill || model("Skill", skillSchema);

export default Skill;
