import { Request, response, Response } from 'express';
import pool from '../database';

class ApiController_couch {


    public async getTodos(req: Request, res: Response) {
        const accion = await pool.query(`
        select * from usuario where estado_couch=1
        `);
        res.json({ text: accion })
    }
    public async asignarCouch(req: Request, res: Response) {
        const accion = await pool.query(`
        update usuario set iduser_couch = '${req.body.iduser_couch}' where iduser="${req.body.iduser}"
        `);
        res.json({ text: accion })
    }

    public async team(req: Request, res: Response) {
        const accion = await pool.query(`
        select * from usuario where iduser_couch="${req.body.iduser_couch}"
        `);
        res.json({ text: accion })
    }


}
export const apiController_couch = new ApiController_couch();
