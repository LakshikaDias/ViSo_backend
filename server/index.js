const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./routes/user");
const bodyParser = require("body-parser");

require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// Setup the server
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", user);

// ChatGPT Endpoint

app.post("/api/download", async (req, res) => {
  const education = req.body;

  const prompt = `Summarize the following paragraph into short bullet points: ${education}`;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      n: 1,
      max_tokens: 60,
    });
    console.log(completion.data);

    res.json({ response: completion.data.choices[0].text });
  } catch (error) {
    console.log(error.response.data);
  }
});

//connect to the database
mongoose
  .connect(process.env.MONDODB_URL)
  .catch((error) => console.log(`${error} did not connect`));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
