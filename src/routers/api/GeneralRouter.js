import express from 'express'
import GeneralController from '../../controllers/api/GeneralController.js'
/* const GeneralController = require('../../controllers/api/GeneralController')
const express = require('express'); */

const generalRouter = express.Router();

generalRouter.get("/", GeneralController.getAll)

export {generalRouter};
/* module.exports = generalRouter */