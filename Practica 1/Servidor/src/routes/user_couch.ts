import { Router } from 'express'
import { apiController_lectura_ } from '../controllers/lectura';
import { apiController_user_couch_ } from '../controllers/userCouch'

class ApiRoutes_userCouch {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/', apiController_user_couch_.asignar);
        this.router.post('/quitar', apiController_user_couch_.quitarCouch);
        this.router.post('/listaAtleta', apiController_user_couch_.traerListaAtleta)

    }
}

const apiRoutes_userCouch = new ApiRoutes_userCouch();
export default apiRoutes_userCouch.router;