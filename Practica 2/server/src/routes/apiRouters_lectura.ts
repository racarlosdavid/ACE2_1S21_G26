import { Router } from 'express'
import { apiController_lectura } from '../controllers/apiController_lectura'
class ApiRoutes_lectura {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', apiController_lectura.insertar)
        this.router.post('/now', apiController_lectura.now)
        this.router.get('/delete', apiController_lectura.deleteAll)
        this.router.post('/exhalamin', apiController_lectura.exhalamin)
        this.router.post('/exhalamax', apiController_lectura.exhalamax)
        this.router.post('/exhalaavg', apiController_lectura.exhalaavg)
        this.router.post('/inhalamin', apiController_lectura.inhalamin)
        this.router.post('/inhalamax', apiController_lectura.inhalamax)
        this.router.post('/inhalaavg', apiController_lectura.inhalaavg)
        this.router.post('/test', apiController_lectura.test)
        this.router.post('/grafica', apiController_lectura.grafica)
        this.router.post('/vo2/add', apiController_lectura.insertar_vo2);
        this.router.post('/vo2', apiController_lectura.get_vo2);
        
        
        
    }
}
const apiRoutes_lectura = new ApiRoutes_lectura();
export default apiRoutes_lectura.router;
