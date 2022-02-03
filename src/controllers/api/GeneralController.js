import ProductTestDao from '../../dao/ProductTestDao.js'
import MessageDao from '../../dao/MessageDao.js'
import UserDao from '../../dao/UserDao.js'

class GeneralController {

    getAll =  async (req, res) => {
        try {
            let productList = await ProductTestDao.getAll()
            let messages = await MessageDao.getAll()
            res.render('index', { productList, messages })
        }
        catch(err) {
            res.json(err)
        }
    }

    getLogIn =  async (req, res) => {
        res.render('./index/LogIn')
    }

    postLogIn =  async (req, res) => {
        const { username, password } = req.body

        const user = await UserDao.getByUsername(username)
      
        if(!user || user.password != password) {
            return res.send('login-error')
        }
    
        req.session.username = username
        req.session.contador = 0
    
        res.redirect('/products')
    }

}
export default new GeneralController();
