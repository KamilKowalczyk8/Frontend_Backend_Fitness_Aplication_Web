const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000; // Backend na innym porcie niż React

app.use(cors()); // Pozwala Reactowi komunikować się z backendem
app.use(express.json()); // Obsługa JSON w żądaniach

app.get("/api/message", (req, res) => {
  res.json({ message: "Witaj z backendu Express!" });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
