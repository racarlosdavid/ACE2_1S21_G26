import { Request, response, Response } from 'express';
import pool from '../database';

class apiController_userCouch {

    public async asignar(req: Request, res: Response) {

        try {
            const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
            const accion2 = await pool.query(`
            update usuario set 
            iduser_couch="${req.body.iduser_couch}" 
            where email="${req.body.emailAtleta}"`);
            res.json({ status: "c:", mensaje: "se logro asignar couch al usuario" })
        } catch (error) {
            res.json({ status: ":c", mensaje: "no se pudo asignar al couch" })
        }
    }

    public async quitarCouch(req: Request, res: Response) {
        try {
            const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
            const accion2 = await pool.query(`update usuario set iduser_couch= null where email ="${req.body.emailAtleta}"`);
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
    public async preguntar_si_es_couch(req: Request, res: Response) {
        try {
            const comando = await pool.query(`select couch from usuario where email= "${req.body.email}" `)
            res.json({ respuesta: comando })


        } catch (error) {

        }
    }
}
export const apiController_user_couch_ = new apiController_userCouch();