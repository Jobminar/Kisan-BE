document.addEventListener("DOMContentLoaded", () => {
  const startRecordBtn = document.getElementById("startRecord");
  const stopRecordBtn = document.getElementById("stopRecord");
  const audioPlayer = document.getElementById("audioPlayer");
  const statusDisplay = document.getElementById("status");

  let mediaRecorder;
  let chunks = [];

  startRecordBtn.addEventListener("click", startRecording);
  stopRecordBtn.addEventListener("click", stopRecording);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/wav" });
      const audioURL = URL.createObjectURL(blob);
      audioPlayer.src = audioURL;
      chunks = [];
    };

    mediaRecorder.start();
    startRecordBtn.disabled = true;
    stopRecordBtn.disabled = false;
    statusDisplay.innerText = "Recording...";
  }

  function stopRecording() {
    mediaRecorder.stop();
    startRecordBtn.disabled = false;
    stopRecordBtn.disabled = true;
    statusDisplay.innerText = "Recording stopped";
  }
});
