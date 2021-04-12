import { Request, response, Response } from 'express';
import pool from '../database';

class ApiController_lectura {

    public async insertar(req: Request, res: Response) {
        const accion = await pool.query(`
        insert into lectura(id_user,fecha,hora,t,r,v,d,repeticiones,dt,contadorTest) 
        values(
            ${req.body.id_user},
            "${req.body.fecha}",
            "${req.body.hora}",
            ${req.body.t},
            ${req.body.r},
            ${req.body.v},
            ${req.body.d},
            ${req.body.repeticiones},
            ${req.body.dt},
            (select contadorTest from usuario where iduser=${req.body.id_user})
            )
        `);
        res.json({ text: accion })
    }

    public async historial(req: Request, res: Response) {
        if (req.body.tipo == "T") {
            const accion2 = await pool.query(`select fecha,hora,t as dato from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 10`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            const accion2 = await pool.query(`select fecha,hora,r as dato from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 10`)
            res.json({ respuesta: accion2 })
        }
    }

    public async historialMaximo(req: Request, res: Response) {

        if (req.body.tipo == "T") {
            let accion2 = await pool.query(`select fecha,hora,t from lectura where t=(select max(t) from lectura where id_user = ${req.body.iduser})  limit 1`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            let accion2 = await pool.query(`select fecha,hora,r from lectura where r=(select max(r) from lectura where id_user = ${req.body.iduser})  limit 1`)
            res.json({ respuesta: accion2 })
        }

    }


    public async historialMinimo(req: Request, res: Response) {


        if (req.body.tipo == "T") {
            let accion2 = await pool.query(`select fecha,hora,t from lectura where t=(select min(t) from lectura where id_user = ${req.body.iduser})  limit 1`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            let accion2 = await pool.query(`select fecha,hora,r from lectura where r=(select min(r) from lectura where id_user = ${req.body.iduser})  limit 1`)
            res.json({ respuesta: accion2 })
        }

    }


    public async historialPromedio(req: Request, res: Response) {

        if (req.body.tipo == "T") {
            let accion2 = await pool.query(`select avg(t) as dato from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            let accion2 = await pool.query(`select avg(r) as dato from lectura where id_user = ${req.body.iduser} `)
            res.json({ respuesta: accion2 })
        }

    }
    public async now(req: Request, res: Response) {

        if (req.body.tipo == "T") {
            const accion2 = await pool.query(`select fecha,hora,t as 'dato' from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "R") {
            const accion2 = await pool.query(`select fecha,hora,r as 'dato' from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "V") {
            const accion2 = await pool.query(`select fecha,hora,v as 'dato' from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "RE") {
            const accion2 = await pool.query(`select fecha, hora, repeticiones as 'dato' from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "D") {
            const accion2 = await pool.query(`select fecha, hora, d as 'dato' from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            res.json({ respuesta: accion2 })
        } else if (req.body.tipo == "DT") {
            const accion2 = await pool.query(`select fecha, hora, dt as 'dato' from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            res.json({ respuesta: accion2 })
        }

    }

    public async reporteVelocidad(req: Request, res: Response) {

        const accion2 = await pool.query(`
        select contadorTest as id_test,repeticiones as periodo, min(v) as "min",max(v) as "max" ,avg(v) as "avg" from lectura  where id_user=${req.body.iduser} group by id_test,periodo; 
        `)
        res.json({ respuesta: accion2 })

    }

    public async distanciamedida_repeticion(req: Request, res: Response) {

        const accion2 = await pool.query(`
            select contadorTest as idTest, repeticiones,max(d) as distancia from lectura where id_user=${req.body.iduser} group by idTest,repeticiones
            `)
        res.json({ respuesta: accion2 })


    }
    //select contadorTest,max(repeticiones) from lectura group by contadorTest

    public async reporteConteRepeticiones(req: Request, res: Response) {

        const accion2 = await pool.query(`
        select contadorTest as idTest,max(repeticiones) as periodo from lectura where id_user=${req.body.iduser} group by contadorTest 
        `)
        res.json({ respuesta: accion2 })

    }

    public async reporteMax(req: Request, res: Response) {

        const accion2 = await pool.query(`
        select max(rep) as dato from (select contadorTest as IdTest,max(repeticiones) as rep from lectura where id_user=${req.body.iduser} group by contadorTest) as s
        `)
        res.json({ respuesta: accion2 })    
    }
    public async reporteMin(req: Request, res: Response) {

        const accion2 = await pool.query(`
        select min(rep) as dato from (select contadorTest as IdTest,max(repeticiones) as rep from lectura where id_user=${req.body.iduser} group by contadorTest) as s
        `)
        res.json({ respuesta: accion2 })    
    }
    public async reporteProm(req: Request, res: Response) {

        const accion2 = await pool.query(`
        select avg(rep) as dato from (select contadorTest as IdTest,max(repeticiones) as rep from lectura where id_user=${req.body.iduser} group by contadorTest) as s
        `)
        res.json({ respuesta: accion2 })    
    }

}
export const apiController_lectura = new ApiController_lectura();
