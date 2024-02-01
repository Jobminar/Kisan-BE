// controllers/audioController.js
import Audio from "../models/Audio.js";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const upload = multer({ storage: storage }).single("audio");

async function saveAudioData(req, res) {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const { userId } = req.body;
      const audio = new Audio({ userId, audioData: req.file.buffer });
      await audio.save();
      return res.json({ success: true, message: "Audio saved successfully" });
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function getAudioByUserId(req, res) {
  try {
    const { userId } = req.body;
    const audio = await findOne({ userId });
    if (!audio) {
      return res.status(404).json({ success: false, error: "Audio not found" });
    }
    res.send(audio.audioData);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export default {
  saveAudioData,
  getAudioByUserId,
};
