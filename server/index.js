const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://codeblocks-c9058-default-rtdb.europe-west1.firebasedatabase.app",
});
const db = admin.firestore();

const PORT = process.env.PORT || 3001;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const alreadyUsedDict = {};

app.get("/getCode", async (req, res) => {
  try {
    const title = req.query.title;

    if (!title) {
      return res.status(400).json({ error: "Key parameter is required" });
    }

    const codeBlocksCollection = db.collection("CodeBlocks");
    const querySnapshot = await codeBlocksCollection
      .where("title", "==", title)
      .get();

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "Title not found." });
    }

    const code = querySnapshot.docs[0].data().code;
    const goldencode = querySnapshot.docs[0].data().goldencode;

    //BBBBBBBBBBBBBBBBBBBBBBBBBBB
    let firstTime = false;
    if (!(title in alreadyUsedDict)) {
      firstTime = true;
      alreadyUsedDict[title] = true;
    }
    res.json({ code, goldencode, firstTime });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/getListOfTitles", async (req, res) => {
  try {
    const codeBlocksCollection = db.collection("CodeBlocks");
    const querySnapshot = await codeBlocksCollection.get();

    const titles = [];
    querySnapshot.forEach((doc) => {
      const title = doc.data().title;
      titles.push(title);
    });

    res.json({ titles });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

io.on("connection", (socket) => {
  console.log(`User Connecteed ${socket.id} `);

  socket.on("join_page", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.page).emit("receive_message", data);
    console.log(data);
  });
});

server.listen(PORT, () => {
  console.log("Server is running");
});
