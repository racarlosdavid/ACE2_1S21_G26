import { Request, response, Response } from 'express';
import pool from '../database';

class apiController_userCouch {

    public async index(req: Request, res: Response) {
        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
        res.json({ text: 'Bienvenido a la base de datos MYSQL remoto' })
    }

    public async consulta1(req: Request, res: Response) {
        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
        const accion2 = await pool.query(`select * from usuario`);
        res.json({ text: accion2 })
    }

}
export const apiController_user_couch_ = new apiController_userCouch();