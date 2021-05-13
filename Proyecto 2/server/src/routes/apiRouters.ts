import { Router } from 'express'
import { apiController } from '../controllers/apiController'
class ApiRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', apiController.c_traer_todos);
        this.router.post('/add', apiController.c_usuario_ingresar)
        this.router.post('/checkCredential', apiController.c_login)
        this.router.post('/startTest', apiController.incrementar)
        this.router.post('/actualizar', apiController.modificar)

    }
}
const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
