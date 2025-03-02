const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:3000" })); // Permitir peticiones del frontend
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/attendance', require('./routes/attendance')); // Nueva ruta de asistencia
app.use('/api/dashboard', require('./routes/dashboard')); // Nueva ruta de Dashboard
app.use('/api/scanner', require('./routes/scanner')); // Nueva ruta para el escáner

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
