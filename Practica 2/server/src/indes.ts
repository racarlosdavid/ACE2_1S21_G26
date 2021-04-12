import  express, {Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import apiRoutes from './routes/apiRouters'
import apiRoutes_couch from './routes/apiRouters_couch'
import apiRoutes_lectura from './routes/apiRouters_lectura'


class Server {
    public app: Application;
    constructor() {
        this.app= express();
        this.config()
        this.routes()
        
    }
    config():void{
        this.app.set('port', process.env.PORT ||3000);
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
    }

    routes():void{
        this.app.use('/user',apiRoutes);
        this.app.use('/couch',apiRoutes_couch);
        this.app.use('/lectura',apiRoutes_lectura);
    }
    start():void{
        this.app.listen(this.app.get('port'),() =>{
            console.log('Server on port ', this.app.get('port'));
        });
    }
}


export const server= new Server();
server.start();
