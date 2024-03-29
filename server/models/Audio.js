// models/Audio.js
import { Schema, model } from "mongoose";

const audioSchema = new Schema({
  userId: { type: String, required: false },
  audioData: {
    type: String,
    required: true,
  },
});

const Audio = model("Audio", audioSchema);

export default Audio;
