import MessageDao from '../../dao/MessageDao.js'
import { denormalice } from '../../normalizers/MessageNormalizer.js'

class MessageController {

    getAll = async (req, res) => {
        MessageDao.getAll().then(messages => {
            res.render('./messagesTest/MessagesTest', { messages })
        }).catch(err => {
            if(err.error == 404)
                res.render('./messagesTest/MessagesTest', { messages: [] })
            else{
                res.status(err.error)
                res.json(err)
            }
        })
    }

    /* getById = async (req, res) => {
        MessageDao.getById(req.params.id).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    save = async (req, res) => {
        MessageDao.save(req.body).then(response => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    update = (req, res) => {
        MessageDao.update(req.body).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteById = (req, res) => {
        MessageDao.deleteById(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteAll = (req, res) => {
        MessageDao.deleteAll().then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    } */
}
export default new MessageController();
