const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

// Importar rutas
const authRoutes = require('./routes/auth');
const empleadosRoutes = require('./routes/empleados');
const inventarioRoutes = require('./routes/inventario');
const attendanceRoutes = require('./routes/attendance');
const dashboardRoutes = require('./routes/dashboard');
const scannerRoutes = require('./routes/scanner');

const app = express();
connectDB();

// Configuración de middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/scanner', scannerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
