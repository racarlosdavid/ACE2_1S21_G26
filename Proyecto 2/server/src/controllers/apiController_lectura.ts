import { Request, response, Response } from 'express';
import pool from '../database';

class ApiController_lectura {

    public async insertar(req: Request, res: Response) {
        try {
            const accion = await pool.query(`
            insert into lectura(id_user,fecha,hora,t,r,f,c,id_test) 
            values(
                ${req.body.iduser},
                "${req.body.fecha}",
                "${req.body.hora}",
                ${req.body.t},
                ${req.body.r},
                ${req.body.f},
                "0",
                (select id_test_contador from usuario where iduser=${req.body.iduser})
            )
            `);
            res.json({ text: accion })
        } catch (error) {
            console.log(error);

            res.send({ respuesta: "error al insertar una lectura" })
        }
    }

    public async deleteAll(req: Request, res: Response) {
        let accion = await pool.query(`delete from lectura`)
        let accion2 = await pool.query(`delete from test`)
        res.json(accion)
    }

    public async now(req: Request, res: Response) {

        try {
            let accion = await pool.query(`select fecha, hora, t,r,f,c from lectura where id_user = ${req.body.iduser} order by idlectura desc limit 1`)
            let x = accion[0]
            res.send(x)
        } catch (error) {
            res.send({ respuesta: "error al reportar lectura en tiempo real" })
        }
    }


    public async min(req: Request, res: Response) {
        let accion

        if (req.body.opcion=="t"){
            
            accion = await pool.query(`
            select id_test as idtest,min(t) as dato from lectura where id_user=${req.body.iduser}  group by id_test
            `)
            
        }else if (req.body.opcion=="r"){
            
            accion = await pool.query(`
            select id_test as idtest,min(r) as dato from lectura where id_user=${req.body.iduser}  group by id_test
            `)

        }else if (req.body.opcion=="f"){

            accion = await pool.query(`
            select id_test as idtest,min(f) as dato from lectura where id_user=${req.body.iduser}  group by id_test
            `)

        }

        res.json(accion)
    }

    public async max(req: Request, res: Response) {
        let accion

        if (req.body.opcion=="t"){
            
            accion = await pool.query(`
            select id_test as idtest,max(t) as dato from lectura where id_user=${req.body.iduser}  group by id_test
            `)
            
        }else if (req.body.opcion=="r"){
            
            accion = await pool.query(`
            select id_test as idtest,max(r) as dato from lectura where id_user=${req.body.iduser}  group by id_test
            `)

        }else if (req.body.opcion=="f"){

            accion = await pool.query(`
            select id_test as idtest,max(f) as dato from lectura where id_user=${req.body.iduser}  group by id_test
            `)

        }

        res.json(accion)
    }

    public async avg(req: Request, res: Response) {
        let accion

        if (req.body.opcion=="t"){
            
            accion = await pool.query(`
            select id_test as idtest,avg(t) as dato from lectura where id_user=${req.body.iduser}  group by id_test
            `)
            
        }else if (req.body.opcion=="r"){
            
            accion = await pool.query(`
            select id_test as idtest,avg(r) as dato from lectura where id_user=${req.body.iduser}  group by id_test
            `)

        }else if (req.body.opcion=="f"){

            accion = await pool.query(`
            select id_test as idtest,avg(f) as dato from lectura where id_user=${req.body.iduser}  group by id_test
            `)

        }

        res.json(accion)
    }

    public async minall(req: Request, res: Response) {
        let accion

        if (req.body.opcion=="t"){
            
            accion = await pool.query(`
            select min(t) as dato from lectura where id_user=${req.body.iduser}  
            `)
            
        }else if (req.body.opcion=="r"){
            
            accion = await pool.query(`
            select min(r) as dato from lectura where id_user=${req.body.iduser}  
            `)

        }else if (req.body.opcion=="f"){

            accion = await pool.query(`
            select min(f) as dato from lectura where id_user=${req.body.iduser}  
            `)

        }

        res.json(accion[0])
    }

    public async maxall(req: Request, res: Response) {
        let accion

        if (req.body.opcion=="t"){
            
            accion = await pool.query(`
            select max(t) as dato from lectura where id_user=${req.body.iduser}  
            `)
            
        }else if (req.body.opcion=="r"){
            
            accion = await pool.query(`
            select max(r) as dato from lectura where id_user=${req.body.iduser}  
            `)

        }else if (req.body.opcion=="f"){

            accion = await pool.query(`
            select max(f) as dato from lectura where id_user=${req.body.iduser}  
            `)

        }

        res.json(accion[0])
    }

    public async avgall(req: Request, res: Response) {
        let accion

        if (req.body.opcion=="t"){
            
            accion = await pool.query(`
            select avg(t) as dato from lectura where id_user=${req.body.iduser}  
            `)
            
        }else if (req.body.opcion=="r"){
            
            accion = await pool.query(`
            select avg(r) as dato from lectura where id_user=${req.body.iduser}  
            `)

        }else if (req.body.opcion=="f"){

            accion = await pool.query(`
            select avg(f) as dato from lectura where id_user=${req.body.iduser}  
            `)

        }

        res.json(accion[0])
    }

    public async reporteIdTest(req: Request, res: Response) {
      
        let accion = await pool.query(`
            select id_user as iduser,id_test as idtest,fecha,hora,c  from test where id_user=${req.body.iduser}  
            `)
        res.json(accion)
    }

    public async golpes(req: Request, res: Response) {

        if(req.body.opcion=="min"){   
            let accion = await pool.query(`
            select min(c) as dato  from test where id_user=${req.body.iduser}  
            `)
            res.json(accion[0])
        }else if(req.body.opcion=="max"){   
            let accion = await pool.query(`
            select max(c) as dato  from test where id_user=${req.body.iduser}  
            `)
            res.json(accion[0])
        }else if(req.body.opcion=="avg"){   
            let accion = await pool.query(`
            select avg(c) as dato  from test where id_user=${req.body.iduser}  
            `)
            res.json(accion[0])
        }
    }

}
export const apiController_lectura = new ApiController_lectura();
