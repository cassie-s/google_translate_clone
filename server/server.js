const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8001;


app.get('/languages', async (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
  };
  
  try {
    const response = await axios(
      'https://g-translate1.p.rapidapi.com/languages',
      options
    );
    const arrayOfData = Object.keys(response.data.data).map(
      (key) => response.data.data[key]
    );
    res.status(200).json(arrayOfData);
  } catch (err) {
    console.error('Error in /languages:', err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to fetch languages' });
  }
});

app.get('/translation', async (req, res) => {
  const { textToTranslate, outputLanguage, inputLanguage } = req.query;
  
  const options = {
    method: 'GET',
    params: {
      text: textToTranslate,
      tl: outputLanguage,
      sl: inputLanguage,
    },
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
  };
  
  try {
    const response = await axios(
      'https://g-translate1.p.rapidapi.com/translate',
      options
    );
    res.status(200).json(response.data.data.translation);
  } catch (err) {
    console.error('Error in /translation:', err.response?.data || err.message);
    res.status(500).json({ message: 'Translation failed' });
  }
});

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
