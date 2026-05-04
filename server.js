const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const SECRET_KEY = 'sk_live_oWbMWGO6Lx0LgOGYi6oLTM7F5yp4HQhb';
const COMPANY_ID = '208a8500318a44cb84a360f1fb4b214';

app.post('/payment', async (req, res) => {
  try {
    const response = await fetch('https://api.furiapaybrasil.com.br/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + SECRET_KEY,
        'X-Company-ID': COMPANY_ID
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('FuriaPay Backend OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));
