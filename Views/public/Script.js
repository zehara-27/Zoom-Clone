const socket = io("/");
const myPeer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3000",
});
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;
let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });

myPeer.on("open", (id) => {
  socket.emit("jion-room", Room_ID, id);
});

socket.on("user-connected", (userId) => {
  connectToNewUser(userId);
});

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

function connectToNewUser(userId) {
  console.log("zi front", userId);
}
