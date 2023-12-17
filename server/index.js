const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

// private key is not stored in github.
serviceAccount.private_key_id = process.env.PRIVATE_KEY_ID;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://codeblocks-c9058-default-rtdb.europe-west1.firebasedatabase.app",
});
const db = admin.firestore();

const PORT = process.env.PORT || 3001;

app.use(cors());

const server = http.createServer(app);

// cors origin will be replaced with a more specific address to improve security.
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const alreadyUsedDict = {};

// get from the DB the code of a given title
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

// get the list of titles from the data base
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

//
io.on("connection", (socket) => {
  socket.on("join_page", (data) => {
    socket.join(data);
  });

  // send update message only to those who are on the same page.
  socket.on("send_message", (data) => {
    socket.to(data.page).emit("receive_message", data);
    console.log(data);
  });
});

server.listen(PORT, () => {
  console.log("Server is running");
});
