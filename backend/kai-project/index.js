import express from 'express'
const app = express();
const port = 3000;
import pool from './src/config/db.js';
import repoGroupRoutes from './src/routes/repoGroup.routes.js'
import vulnerability from './src/routes/vulnerability.routes.js'
import dashboard from './src/routes/dashboard.routes.js'
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' http://localhost:3000"
  );
  next();
});
app.use((req, res, next) => {
  res.removeHeader('Content-Security-Policy');
  next();
});
app.use('/repoGroups', repoGroupRoutes)
app.use('/vulnerability', vulnerability)
app.use('/dashboard', dashboard)
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT count(*) FROM vulnerability');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/data', (req, res) => {
  const data = req.body;
  res.send({ message: 'Data received', data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
