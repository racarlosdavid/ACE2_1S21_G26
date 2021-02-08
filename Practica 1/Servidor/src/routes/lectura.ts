import { Router } from 'express'
import { apiController_lectura_ } from '../controllers/lectura'

class ApiRoutes_lectura {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/', apiController_lectura_.agregar)
        this.router.post('/historial', apiController_lectura_.historial )       
        this.router.post('/historialMax', apiController_lectura_.historialMaximo )     
        this.router.post('/historialMin', apiController_lectura_.historialMinimo )     
        this.router.post('/historialProm', apiController_lectura_.historialPromedio)
        this.router.post('/now',apiController_lectura_.tiempoReal)
    }
}

const apiRoutes_lectura = new ApiRoutes_lectura();
export default apiRoutes_lectura.router;