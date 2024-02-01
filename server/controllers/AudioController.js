import Audio from "../models/Audio.js";
import multer, { memoryStorage } from "multer";

// Function to configure Multer middleware for in-memory storage
const configureMulter = () => {
  const storage = memoryStorage();
  return multer({ storage: storage });
};

const upload = configureMulter().single("audio");

async function saveAudioData(req, res) {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }

      const { userId } = req.body;
      const audioData = req.file.buffer; // Assuming audioData is in the file buffer

      if (!userId || !audioData) {
        return res
          .status(400)
          .json({ success: false, error: "userId and audioData are required" });
      }

      const audio = new Audio({ userId, audioData });
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

async function getAllAudioByAdmin(req, res) {
  try {
    // Add your authentication and authorization logic here (if needed)
    const allAudio = await find({}).select("-audioData"); // Exclude audioData for listing
    res.json({ success: true, audioList: allAudio });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function postAudioByAdmin(req, res) {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }

      const { userId, audioData } = req.body;
      // Add your admin authentication logic here (if needed)
      const audio = new Audio({ userId, audioData });
      await audio.save();
      return res.json({
        success: true,
        message: "Audio posted by admin successfully",
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function deleteAudioByUserId(req, res) {
  try {
    const { userId } = req.body;
    const audio = await findOneAndDelete({ userId });
    if (!audio) {
      return res.status(404).json({ success: false, error: "Audio not found" });
    }
    res.json({ success: true, message: "Audio deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function deleteAudioById(req, res) {
  try {
    const { audioId } = req.body;
    const audio = await Audio.findByIdAndDelete(audioId);
    if (!audio) {
      return res.status(404).json({ success: false, error: "Audio not found" });
    }
    res.json({ success: true, message: "Audio deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export default {
  saveAudioData,
  getAudioByUserId,
  getAllAudioByAdmin,
  postAudioByAdmin,
  deleteAudioByUserId,
  deleteAudioById,
};
