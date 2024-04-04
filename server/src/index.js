const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

// getAllCurrencies
app.get("/getAllCurrencies", async (req, res) => {
   const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=3a1af94dd2d044a89c19b1acb4dd5b68";
 
   try {
     const nameResponse = await axios.get(nameURL, {
       // Remove proxy settings
       proxy: false
     });
     const nameData = nameResponse.data;
     return res.json(nameData);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: "Internal Server Error" });
   }
 });
 

app.listen(5000, () => {
  console.log("SERVER STARTED");
});
