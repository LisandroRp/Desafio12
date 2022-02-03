import ProductTestDao from '../../dao/ProductTestDao.js'
import AuthenticationException from '../../exceptions/AuthenticationException.js'
import MessageDao from '../../dao/MessageDao.js'
import UserDao from '../../dao/UserDao.js'

class GeneralWebController {

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
        try {
            const user = await UserDao.getByUsername(username)
      
                     if(!user || user.password != password) {
                         res.json(new AuthenticationException(401, "La contraseña es Incorrecta"))
                    }
                console.log(req.session)
                    req.session.username = username
                    req.session.contador = 0 
                    res.redirect('/products')
        }
        catch(err) {
            console.log(err)
            res.json(new AuthenticationException(401, "El usuario no existe"))
        }

    }

    postLogOut =  async (req, res) => {
        res.render('./index/LogOut', {username: req.session.username})
    }

}
export default new GeneralWebController();
