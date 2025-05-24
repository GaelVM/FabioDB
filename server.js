const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware para permitir solicitudes desde el frontend
app.use(cors());

app.get('/api/dni', async (req, res) => {
  const { dni } = req.query;

  if (!dni) {
    return res.status(400).json({ error: 'DNI es requerido' });
  }

  try {
    const response = await axios.get(`https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`, {
      headers: {
        Authorization: 'Bearer apis-token-5640.niRlRB2xgPdw0X6-XqTO8dDZetBYHHDk'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Error en la consulta al API de RENIEC'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
