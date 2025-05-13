const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes

app.get("/api/:apiKey/:id", async (req, res) => {
  const { apiKey, id } = req.params;
  const url = `https://superheroapi.com/api/${apiKey}/${id}`;

  try {
    console.log(`Fetching data from: ${url}`);
    // Fetch data from the external API
    const response = await fetch(url);
    console.log(`Response status: ${response.status}`);
    if (!response.ok) {
      const errorText = await response.text(); // Log the error response body
      console.error(`Error response from API: ${errorText}`);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data", details: errorText });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error during fetch:", error); // Log the error stack trace
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
