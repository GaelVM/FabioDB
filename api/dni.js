
const axios = require('axios');

module.exports = async (req, res) => {
  const { dni } = req.query;

  if (!dni) {
    return res.status(400).json({ error: 'DNI es requerido' });
  }

try {
    const response = await axios.get(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=${process.env.API_PERU_TOKEN}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
