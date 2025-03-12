const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Check-in (marcar entrada)
router.post('/check-in', async (req, res) => {
  try {
    const checkIn = new Attendance({ employeeId: req.user.userId, checkIn: new Date() });
    await checkIn.save();
    res.status(201).json({ message: 'Check-in registrado', checkIn: checkIn.checkIn });
  } catch (err) {
    res.status(500).json({ message: 'Error en el check-in' });
  }
});

// Check-out (marcar salida)
router.post('/check-out', async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ employeeId: req.user.userId, checkOut: null });
    if (!attendance) return res.status(400).json({ message: 'No hay check-in activo' });

    attendance.checkOut = new Date();
    attendance.totalHours = (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);
    await attendance.save();

    res.status(200).json({ message: 'Check-out registrado', totalHours: attendance.totalHours });
  } catch (err) {
    res.status(500).json({ message: 'Error en el check-out' });
  }
});

// Obtener el historial de asistencia de un empleado
router.get('/', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ employeeId: req.user.userId });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener registros de asistencia' });
  }
});

module.exports = router;
