import { Request, response, Response } from 'express';
import pool from '../database';

class ApiController_lectura {

    public async insertar(req: Request, res: Response) {
        try {
            const accion = await pool.query(`
            insert into lectura(iduser,fecha,hora,inhala,exhala,idtest) 
            values(
                ${req.body.iduser},
                "${req.body.fecha}",
                "${req.body.hora}",
                ${req.body.inhala},
                ${req.body.exhala},
                (select idtest from usuario where iduser=${req.body.iduser})
            )
            `);
            res.json({ text: accion })
        } catch (error) {
            res.send({ respuesta: "error al insertar una lectura" })
        }
    }
    public async deleteAll(req: Request, res: Response) {
        let accion = await pool.query(`delete from lectura`)
        res.json(accion)
    }

    public async now(req: Request, res: Response) {

        try {
            let accion = await pool.query(`select fecha, hora, exhala, inhala from lectura where iduser = ${req.body.iduser} order by idlectura desc limit 1`)
            let x = accion[0]
            res.send(x)
        } catch (error) {
            res.send({ respuesta: "error al reportar lectura en tiempo real" })
        }
    }


    public async exhalamin(req: Request, res: Response) {
        let accion = await pool.query(`
        select idtest,min(exhala) as dato from lectura where iduser=${req.body.iduser}  group by idtest
        `)

        res.json(accion)
    }
    public async exhalamax(req: Request, res: Response) {
        let accion = await pool.query(`
        select idtest,max(exhala) as dato from lectura where iduser=${req.body.iduser}  group by idtest
        `)
        res.json(accion)
    }
    public async exhalaavg(req: Request, res: Response) {
        let accion = await pool.query(`
        select idtest,avg(exhala) as dato from lectura where iduser=${req.body.iduser}  group by idtest
        `)
        res.json(accion)
    }
    public async inhalamin(req: Request, res: Response) {
        let accion = await pool.query(`
        select idtest,min(inhala) as dato from lectura where iduser=${req.body.iduser}  group by idtest
        `)
        res.json(accion)
    }
    public async inhalamax(req: Request, res: Response) {
        let accion = await pool.query(`
        select idtest,max(inhala) as dato from lectura where iduser=${req.body.iduser}  group by idtest
        `)
        res.json(accion)
    }
    public async inhalaavg(req: Request, res: Response) {
        let accion = await pool.query(`
        select idtest,avg(inhala) as dato from lectura where iduser=${req.body.iduser}  group by idtest
        `)
        res.json(accion)
    }

    public async test(req: Request, res: Response) {
        let accion = await pool.query(`
        select id_test as idtest, fecha, hora from reporte where id_user=${req.body.iduser}
        `)
        res.json(accion)
    }
    public async grafica(req: Request, res: Response) {
        let accion = await pool.query(`
        select inhala,exhala,fecha,hora,idtest from lectura where iduser=${req.body.iduser}
        `)
        res.json(accion)
    }

}
export const apiController_lectura = new ApiController_lectura();
