import { Router } from 'express'
import { apiController_lectura } from '../controllers/apiController_lectura'
class ApiRoutes_lectura {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', apiController_lectura.insertar)
        this.router.get('/delete', apiController_lectura.deleteAll)
        this.router.post('/now', apiController_lectura.now)

        this.router.post('/min', apiController_lectura.min)
        this.router.post('/max', apiController_lectura.max)
        this.router.post('/avg', apiController_lectura.avg)

        this.router.post('/minAll', apiController_lectura.minall)
        this.router.post('/maxAll', apiController_lectura.maxall)
        this.router.post('/avgAll', apiController_lectura.avgall)

        this.router.post('/reporteTest', apiController_lectura.reporteIdTest)

        this.router.post('/golpes', apiController_lectura.golpes)
        
        
        
    }
}
const apiRoutes_lectura = new ApiRoutes_lectura();
export default apiRoutes_lectura.router;
