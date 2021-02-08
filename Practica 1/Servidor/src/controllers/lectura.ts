import { Request, response, Response } from 'express';
import pool from '../database';

class apiController_lectura {

    public async agregar(req: Request, res: Response) {
        try {
            const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
            const accion2 = await pool.query(`insert into lectura (id_user,tipo,fecha,dato)
            values (${req.body.id_user}, "${req.body.tipo}","${req.body.fecha}", ${req.body.dato})
            `);
            res.json({ status: "c:", mensaje: "se ingreso la lectura" })
        } catch (error) {
            res.json({ status: ":c", mensaje: "problemas para ingresar la lectura" })
        }
    }
    
    public async historial(req:Request, res:Response){
        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`)
        const accion2 = await pool.query(`select fecha,dato from lectura where id_user = ${req.body.iduser} and tipo="${req.body.tipo}" limit 10`)
        res.json({respuesta: accion2})
    }

    public async historialMaximo(req:Request, res:Response){
        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`)
        const accion2 = await pool.query(`select fecha,max(dato) from lectura where id_user = ${req.body.iduser} and tipo="${req.body.tipo}" `)
        res.json({respuesta: accion2})
    }


    public async historialMinimo(req:Request, res:Response){
        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`)
        const accion2 = await pool.query(`select fecha,min(dato) from lectura where id_user = ${req.body.iduser} and tipo="${req.body.tipo}" `)
        res.json({respuesta: accion2})
    }

    public async historialPromedio(req:Request, res:Response){
        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`)
        const accion2 = await pool.query(`select avg(dato) from lectura where id_user = ${req.body.iduser} and tipo="${req.body.tipo}" `)
        res.json({respuesta: accion2})
    }
    public async tiempoReal(req:Request, res:Response){
        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`)
        const accion2 = await pool.query(`select fecha,dato from lectura where id_user = ${req.body.iduser} and tipo="${req.body.tipo}" order by idlectura desc limit 1 `)
        res.json({respuesta: accion2})
    }


    
}
export const apiController_lectura_ = new apiController_lectura();