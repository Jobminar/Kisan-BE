import Audio from "../models/Audio.js";
import multer from "multer";
import path from "path";
import fileType from "file-type";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["audio/wav", "audio/mpeg"]; // Add more types if needed
  const fileMimeType = fileType.fromFile(file.path)?.mime;

  if (allowedTypes.includes(fileMimeType)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB limit
  },
}).single("audio");

const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    next();
  });
};

async function saveAudioData(req, res) {
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
}

async function postAudioByAdmin(req, res) {
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
}

export default {
  saveAudioData,
  handleFileUpload,
  getAudioByUserId,
  getAllAudioByAdmin,
  postAudioByAdmin,
  deleteAudioByUserId,
  deleteAudioById,
};
