import express from 'express'
import GeneralWebController from '../../controllers/web/GeneralWebController.js'
/* const GeneralController = require('../../controllers/api/GeneralController')
const express = require('express'); */

const generalWebRouter = express.Router();

generalWebRouter.get("/LogIn", GeneralWebController.getLogIn)

generalWebRouter.post("/LogIn", GeneralWebController.postLogIn)

generalWebRouter.post("/LogOut", GeneralWebController.postLogOut)

export {generalWebRouter};
/* module.exports = generalRouter */