import { Request, response, Response } from 'express';
import pool from '../database';

class ApiController {
    public async index(req: Request, res: Response) {
        const accion1 = await pool.query(`use mydb`);
        res.json({ text: 'Bienvenido!' })
    }

    public async c_usuario_ingresar(req: Request, res: Response) {
        const accion = await pool.query(`
        INSERT into usuario (correo,contrasena,nombre,apellido,edad,genero,peso_lb,estatura_cm,estado_sesion,estado_couch,iduser_couch,veces_rendido,veces_fallado) VALUES   
        ("${req.body.correo}", "${req.body.contra}", "${req.body.nombre}", "${req.body.apellido}",${req.body.edad},"${req.body.genero}",${req.body.peso_lb},${req.body.estatura_cm},${req.body.estado_sesion},${req.body.estado_couch},${req.body.iduser_couch},${req.body.veces_rendido},${req.body.veces_fallado})
        `);
        res.json({ text: accion })
    }

    public async c_traer_todos(req: Request, res: Response) {
        const accion = await pool.query(`
        select * from usuario
        `);
        res.json({ text: accion })
    }

    public async c_verificarEmail(req: Request, res: Response) {
        const accion = await pool.query(`
        select correo from usuario where correo="${req.body.correo}"
        `);
        res.json({ text: accion })
    }

    public async c_cerrarSesion(req: Request, res: Response) {
        const accion = await pool.query(`
        update usuario set estado_sesion = '0' where correo="${req.body.correo}"
        `);
        res.json({ text: accion })
    }
    public async c_login(req: Request, res: Response) {
        const accion = await pool.query(`
        select * from usuario where correo="${req.body.correo}" and contrasena="${req.body.contrasena}"
        `);
        if (accion!="[]") {
            const accion = await pool.query(`update usuario set estado_sesion = '1' where correo="${req.body.correo}" and contrasena="${req.body.contrasena}" `)
        }
        res.json({ text: accion })
    }

}
export const apiController = new ApiController();
