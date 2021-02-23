import { Request, response, Response } from 'express';
import pool from '../database';

class apiController_lectura {

    public async agregar(req: Request, res: Response) {
        try {
            //const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
            const accion2 = await pool.query(`insert into lectura 
            (id_user,fecha,t,o,r)
            values (
                ${req.body.id_user},
                "${req.body.fecha}", 
                ${req.body.t},
                ${req.body.o},
                ${req.body.r}
                )
            `);
            res.json({ status: "c:", mensaje: "se ingreso la lectura" })
        } catch (error) {
            res.json({ status: ":c", mensaje: "problemas para ingresar la lectura", otromensaje: error })
        }
    }

    public async historial(req: Request, res: Response) {
        if (req.body.tipo == "T") {
            const accion2 = await pool.query(`select fecha,t as dato from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 10`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "O") {
            const accion2 = await pool.query(`select fecha,o as dato from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 10`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            const accion2 = await pool.query(`select fecha,r as dato from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 10`)
            res.json({ respuesta: accion2 })
        }
    }

    public async historialMaximo(req: Request, res: Response) {
        //const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`)

        if (req.body.tipo == "T") {
            const accion2 = await pool.query(`select fecha,max(t) as 'max(dato)' from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "O") {
            const accion2 = await pool.query(`select fecha,max(o) as 'max(dato)' from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            const accion2 = await pool.query(`select fecha,max(r) as 'max(dato)' from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        }

    }


    public async historialMinimo(req: Request, res: Response) {
       
        if (req.body.tipo == "T") {
            const accion2 = await pool.query(`select fecha,min(t) as 'min(dato)' from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "O") {
            const accion2 = await pool.query(`select fecha,min(o) as 'min(dato)' from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            const accion2 = await pool.query(`select fecha,min(r) as 'min(dato)' from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        }

    }

    public async historialPromedio(req: Request, res: Response) {


        if (req.body.tipo == "T") {
            const accion2 = await pool.query(`select avg(t) as 'avg(dato)' from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "O") {
            const accion2 = await pool.query(`select avg(o) as 'avg(dato)' from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            const accion2 = await pool.query(`select avg(r) as 'avg(dato)' from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        }

    }
    public async tiempoReal(req: Request, res: Response) {

        if (req.body.tipo == "T") {
            const accion2 = await pool.query(`select fecha,t as 'dato' from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "O") {
            const accion2 = await pool.query(`select fecha,o as 'dato' from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            const accion2 = await pool.query(`select fecha,r as 'dato' from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            res.json({ respuesta: accion2 })
        }

    }



}
export const apiController_lectura_ = new apiController_lectura();