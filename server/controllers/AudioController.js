// Importing necessary modules and functions
import Audio from "../models/Audio.js";

// Multer configuration
const postAudio = async (req, res) => {
  const { userId, audioData } = req.body;

  try {
    // Save the audio data to MongoDB
    const newAudio = await Audio.create({ userId, audioData });
    res.status(201).json(newAudio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller logic to get audio data by userId
const getAudioByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all audio data for the specified userId
    const audioList = await Audio.find({ userId });
    res.status(200).json(audioList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller logic to post audio by admin
const postAudioByAdminId = async (req, res) => {
  const { adminId, audioData } = req.body;

  try {
    if (!adminId || !audioData) {
      return res
        .status(400)
        .json({ error: "Admin ID and audio data are required." });
    }

    // Save the audio data with adminId to MongoDB
    const newAudio = await Audio.create({
      userId: adminId,
      audioData,
      isAdmin: true,
    });
    res.status(201).json(newAudio);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error posting audio by admin: ${error.message}` });
  }
};

// Controller logic to get all audio data
const getAllAudio = async (_req, res) => {
  try {
    // Find all audio data in the system
    const audioList = await Audio.find();

    if (!audioList || audioList.length === 0) {
      return res.status(404).json({ error: "No audio data found." });
    }

    res.status(200).json(audioList);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error getting all audio data: ${error.message}` });
  }
};

const postReplyAudio = async (req, res) => {
  try {
    const { userId, adminId, audioData } = req.body;

    if (!userId && !adminId) {
      return res
        .status(400)
        .json({ error: "Either userId or adminId is required." });
    }

    // Save the audio data to MongoDB with userId or adminId
    const newAudio = await Audio.create({
      userId: userId || adminId,
      audioData,
      isAdmin: !!adminId, // Set isAdmin to true if adminId is provided
    });

    res.status(201).json(newAudio);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error posting reply audio: ${error.message}` });
  }
};

// Exporting the functions as an object
export default {
  postAudio,
  getAudioByUserId,
  postAudioByAdminId,
  postReplyAudio,
  getAllAudio,
};
