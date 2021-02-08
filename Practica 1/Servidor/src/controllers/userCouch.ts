import { Request, response, Response } from 'express';
import pool from '../database';

class apiController_userCouch {

    public async asignar(req: Request, res: Response) {

        try {
            const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
            const accion2 = await pool.query(`update usuario set iduser_couch="${req.body.iduser_couch}" where nombre="${req.body.nombre}" and apellido="${req.body.apellido}"`);
            res.json({ status: "c:", mensaje: "se asigno couch al usuario " + req.body.nombre + " " + req.body.apellido })
        } catch (error) {
            res.json({ status: ":c", mensaje: "no se pudo asignar al couch" })
        }
    }

    public async quitarCouch(req: Request, res: Response) {
        try {
            const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
            const accion2 = await pool.query(`update usuario set iduser_couch= null where nombre="${req.body.nombre}" and apellido="${req.body.apellido}"`);
            res.json({ status: "c:", mensaje: "se quito couch a este " })

        } catch (error) {

        }
    }
    public async traerListaAtleta(req: Request, res: Response) {
        try {
            const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`)
            const accion2 = await pool.query(`select * from usuario where iduser_couch = ${req.body.iduser_couch}`)
            res.json({ respuesta: accion2 })

        } catch (error) {

        }
    }
}
export const apiController_user_couch_ = new apiController_userCouch();