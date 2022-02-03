import PermissionsException from "../exceptions/PermissionsException.js";

function adminMiddleware(req, res, next) {
    /* if(req.headers.admin == true) */
    if(true)
        next();
    else{
            res.status(401)
            res.json(new PermissionsException(-1, `Ruta ${req.originalUrl} método ${req.method} no autorizada.`))
        }
}

export { adminMiddleware };