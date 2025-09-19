const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const urlRoute = require("./routes/url");
app.use("/api/url", urlRoute);
app.get("/:code", async (req, res) => {
  const Url = require("./models/Url");
  const url = await Url.findOne({ urlCode: req.params.code });
  if (url) return res.redirect(url.longUrl);
  res.status(404).json("No URL found");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
