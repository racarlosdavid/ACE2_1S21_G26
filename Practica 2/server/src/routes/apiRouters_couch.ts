import { Router } from 'express'
import { apiController_couch } from '../controllers/apiController_couch'
class ApiRoutes_couch {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', apiController_couch.getTodos);
        this.router.post('/', apiController_couch.asignarCouch)
        this.router.post('/team', apiController_couch.team)

    }
}
const apiRoutes_couch = new ApiRoutes_couch();
export default apiRoutes_couch.router;
