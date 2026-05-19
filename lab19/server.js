import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/exchange', (req, res) => {
  const baseUsd = 45.00;
  const baseEur = 52.80;
  const baseGbp = 60.95;

  const offset = Math.random();

  const data = [
    {
      cur: 'USD',
      buy: baseUsd + offset,
      sell: baseUsd + 0.50 + offset
    },
    {
      cur: 'EUR',
      buy: baseEur + offset,
      sell: baseEur + 0.50 + offset
    },
    {
      cur: 'GBP',
      buy: baseGbp + offset,
      sell: baseGbp + 0.50 + offset
    }
  ];

  res.json(data); //send data in json content type
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});