// Importing necessary modules and functions
import Audio from "../models/Audio.js";
import multer from "multer";
import path from "path";
import { fileTypeFromBuffer } from "file-type";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File type validation middleware
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["audio/wav", "audio/mpeg"];
  const fileMimeType = fileTypeFromBuffer(file.buffer)?.mime;

  if (allowedTypes.includes(fileMimeType)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Multer configuration with storage, fileFilter, and size limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB limit
  },
}).single("audio");

// Middleware to handle file upload
const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    next();
  });
};

// Function to save audio data
const saveAudioData = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "userId is required" });
    }

    const audioPath = req.file.path;

    const audio = new Audio({ userId, audioPath });
    await audio.save();

    // Additional logic after saving audio data
    console.log("Audio data saved successfully!");

    return res.json({ success: true, message: "Audio saved successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
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

// Function to get audio by user ID
const getAudioByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const audio = await Audio.findOne({ userId });

    if (!audio) {
      return res.status(404).json({ success: false, error: "Audio not found" });
    }

    // Additional logic if needed

    res.send(audio.audioData); // Adjust as per your audio data structure
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
  saveAudioData,
  postAudioByAdmin,
  handleFileUpload,
  getAudioByUserId,
  getAllAudioByAdmin,
};
