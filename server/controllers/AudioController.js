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

// Function to post audio by admin
const postAudioByAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "userId is required" });
    }

    const audioData = req.file.buffer; // Assuming the audio data is in the request file buffer

    const audio = new Audio({ userId, audioData });
    await audio.save();

    // Additional logic after posting audio data by admin
    console.log("Audio posted by admin successfully!");

    return res.json({
      success: true,
      message: "Audio posted by admin successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Function to get all audio by admin
const getAllAudioByAdmin = async (req, res) => {
  try {
    const allAudio = await Audio.find({}).select("-audioData"); // Exclude audioData for listing

    // Additional logic if needed

    res.json({ success: true, audioList: allAudio });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Exporting the functions as an object
export default {
  postAudio,
  getAudioByUserId,
};
