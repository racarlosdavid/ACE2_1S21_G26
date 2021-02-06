import { Router } from 'express'
import { apiController_user_simple_ } from '../controllers/userSimple'

class ApiRoutes_userSimple {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', apiController_user_simple_.traerTodos)
        this.router.post('/update', apiController_user_simple_.actualizar_usuario)
        this.router.post('/add', apiController_user_simple_.ingresar_usuario)
        this.router.post('/checkEmail', apiController_user_simple_.verificarEmail)
        this.router.post('/checkCredential', apiController_user_simple_.verificarCredenciales)
        this.router.post('/drop', apiController_user_simple_.eliminar_usuario)
    }
}

const apiRoutes_userSimple = new ApiRoutes_userSimple();
export default apiRoutes_userSimple.router;