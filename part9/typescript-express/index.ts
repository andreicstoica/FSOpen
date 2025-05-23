import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged the api');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});