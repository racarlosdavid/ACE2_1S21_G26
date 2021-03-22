import { Router } from 'express'
import { apiController_lectura } from '../controllers/apiController_lectura'
class ApiRoutes_lectura {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', apiController_lectura.insertar)
        this.router.post('/historial', apiController_lectura.historial)
        this.router.post('/max', apiController_lectura.historialMaximo)
        this.router.post('/min', apiController_lectura.historialMinimo)
        this.router.post('/avg', apiController_lectura.historialPromedio)
        this.router.post('/now', apiController_lectura.now)
        this.router.post('/reportVelocidad', apiController_lectura.reporteVelocidad)
        this.router.post('/reportDistanci',apiController_lectura.distanciamedida_repeticion)
        this.router.post('/reportConteo',apiController_lectura.reporteConteRepeticiones)
        this.router.post('/reportRepeticionesMax',apiController_lectura.reporteMax)
        this.router.post('/reportRepeticionesMin',apiController_lectura.reporteMin)
        this.router.post('/reportRepeticionesProm', apiController_lectura.reporteProm)
    
    }
}
const apiRoutes_lectura = new ApiRoutes_lectura();
export default apiRoutes_lectura.router;
