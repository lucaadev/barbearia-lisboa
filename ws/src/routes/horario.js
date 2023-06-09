const express = require('express');
const horarioController = require('../controller/horario');
const router = express.Router();

router.get('/salao/:id', horarioController.getHorarioOfSalao);

router.post('/', horarioController.newHorario);

router.put('/:id', horarioController.updatedHorario);

router.delete('/:id', horarioController.deletedHorario);

module.exports = router;