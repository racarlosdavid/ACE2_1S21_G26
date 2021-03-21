import { Router } from 'express'
import { apiController } from '../controllers/apiController'
class ApiRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/',apiController.c_traer_todos);
        this.router.post('/add', apiController.c_usuario_ingresar)
        this.router.post('/checkEmail', apiController.c_verificarEmail)
        this.router.post('/checkCredential', apiController.c_login)
        this.router.post('/cerrarSesion', apiController.c_cerrarSesion)
    
    }
}
const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
