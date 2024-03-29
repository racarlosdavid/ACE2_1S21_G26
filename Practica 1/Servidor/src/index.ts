import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import apiRoutes_userSimple from './routes/user_simple'
import apiRoutes_userCouch from "./routes/user_couch";
import apiRoutes_lectura from "./routes/lectura";

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config()
        this.routes()

    }
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    routes(): void {
        this.app.use('/atleta', apiRoutes_userSimple)
        this.app.use('/couch', apiRoutes_userCouch)
        this.app.use('/lectura',apiRoutes_lectura)
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }

}

export const server = new Server();
server.start();