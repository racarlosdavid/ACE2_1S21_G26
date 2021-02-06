import { Router } from 'express'
import { apiController_user_couch_ } from '../controllers/userCouch'

class ApiRoutes_userCouch {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', apiController_user_couch_.index);
        this.router.get('/usuario/getAll', apiController_user_couch_.consulta1);
    }
}

const apiRoutes_userCouch = new ApiRoutes_userCouch();
export default apiRoutes_userCouch.router;