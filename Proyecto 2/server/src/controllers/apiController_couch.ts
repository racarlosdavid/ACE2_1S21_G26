import { Request, response, Response } from 'express';
import pool from '../database';

class ApiController_couch {


    public async getTodos(req: Request, res: Response) {

        try {

            const accion = await pool.query(`
            select * from usuario where estado_couch=1
            `);
            res.send(accion)
        } catch (error) {
            res.send({ respuesta: "error al traer todos los couch" })
        }
    }
    public async asignarCouch(req: Request, res: Response) {

        try {

            const accion = await pool.query(`
            update usuario set iduser_couch = '${req.body.iduser_couch}' where iduser="${req.body.iduser}"
            `);
            let x = accion
            res.send(x)

        } catch (error) {
            res.send({ respuesta: "error al asignar un couch a un usuario" })
        }

    }

    public async team(req: Request, res: Response) {
        try {

            const accion = await pool.query(`
            select * from usuario where iduser_couch="${req.body.iduser_couch}"
            `);
            res.send(accion)
        } catch (error) {
            res.send({ respuesta: "error al retornar el team de un entrenador" })
        }
    }


}
export const apiController_couch = new ApiController_couch();
