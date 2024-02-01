// models/Audio.js
import { Schema, model } from "mongoose";

const audioSchema = new Schema({
  userId: { type: String },
  audioData: {
    type: Buffer,
    required: true,
  },
});

const Audio = model("Audio", audioSchema);

export default Audio;
