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
        this.router.post('/iniciarTest', apiController.incrementar);
        this.router.post('/increFallo', apiController.incrementar_fallo);
        this.router.post('/increRendido', apiController.incrementar_rendio);
        this.router.post('/vecesFallo', apiController.reporteVecesFallo);
        this.router.post('/vecesRendido', apiController.reporteVecesRendido);
    
    }
}
const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
