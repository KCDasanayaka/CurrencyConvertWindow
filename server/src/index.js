const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

// getAllCurrencies
app.get("/getAllCurrencies", async (req, res) => {
   const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=ee8238a25b8c47c0be10812afe57d8dc";
 
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
 
//get target amount 
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=ee8238a25b8c47c0be10812afe57d8dc`;
    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;

    // Calculate target amount
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json(targetAmount.toFixed(2));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.listen(5000, () => {
  console.log("SERVER STARTED");
});
