
const axios = require('axios');

module.exports = async (req, res) => {
  const { dni } = req.query;

  if (!dni) {
    return res.status(400).json({ error: 'DNI es requerido' });
  }

  try {
    const response = await axios.get(`https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_RENIEC_TOKEN}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
