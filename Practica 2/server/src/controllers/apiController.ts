import { Request, response, Response } from 'express';
import pool from '../database';

class ApiController {


    public async c_usuario_ingresar(req: Request, res: Response) {
        try {
            const accion = await pool.query(`
            INSERT into usuario (correo,contrasena,nombre,apellido,edad,genero,peso_lb,estatura_cm,estado_sesion,estado_couch,iduser_couch) VALUES   
            ("${req.body.correo}", 
            "${req.body.contrasena}", 
            "${req.body.nombre}", 
            "${req.body.apellido}",
            ${req.body.edad},
            "${req.body.genero}",
            ${req.body.peso_lb},
            ${req.body.estatura_cm},
            ${req.body.estado_sesion},
            ${req.body.estado_couch},
            ${req.body.iduser_couch})
            `);
            res.send(accion)
        } catch (error) {
            res.send({ respuesta: "error al ingresar usuario" })
        }
    }

    public async c_traer_todos(req: Request, res: Response) {
        try {

            const accion = await pool.query(`
            select * from usuario
            `);
            res.send(accion)
        } catch (error) {
            res.send({ respuesta: "error al traer todos los usuarios" })
        }
    }



    public async c_login(req: Request, res: Response) {
        try {
            const accion = await pool.query(`
            select * from usuario where correo="${req.body.correo}" and contrasena="${req.body.contrasena}"
            `);
            if (accion.length != 0) {

                const accion1 = await pool.query(`update usuario set estado_sesion = '1' where correo="${req.body.correo}" and contrasena="${req.body.contrasena}" `)
                res.send({ respuesta: "true", usuario: accion[0] })
                return
            }
            res.send({ respuesta: "false" })
        } catch (error) {
            res.send({ respuesta: "no se pudo verificar las credenciales" })
        }
    }
    public async incrementar(req: Request, res: Response) {
        const accion = await pool.query(`
        update usuario set idtest = idtest +1  where iduser=${req.body.iduser}
        `);
        const accion2 = await pool.query(`
        insert into reporte (id_user,id_test,fecha,hora) values(
            ${req.body.iduser},
            (select idtest from usuario where iduser=${req.body.iduser}),
            "${req.body.fecha}",
            "${req.body.hora}"
        )
        `);
        
        res.json({ text: accion })
    }

}
export const apiController = new ApiController();
