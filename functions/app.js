const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://codeblocks-c9058-default-rtdb.europe-west1.firebasedatabase.app",
});

const app = express();

const collection = admin.firestore().collection("CodeBlocks");
const port = process.env.PORT || 3000;

app.get("/getValue", async (req, res) => {
  try {
    const key = req.query.key;

    if (!key) {
      return res.status(400).json({ error: "Key parameter is required." });
    }

    const docRef = db.collection("yourCollection").doc(key);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Key not found." });
    }

    const value = doc.data().value;
    res.json({ key, value });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Export the Express app as a Cloud Function
exports.app = functions.https.onRequest(app);
