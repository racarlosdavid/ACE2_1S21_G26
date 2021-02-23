import { Request, response, Response } from 'express';
import pool from '../database';

class apiController_userSimple {

    public async index(req: Request, res: Response) {
        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
        res.json({ text: 'Bienvenido a la base de datos MYSQL remoto' })
    }

    public async traerTodos(req: Request, res: Response) {

        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
        const accion2 = await pool.query(`select * from usuario`);
        res.json({ usuarios: accion2 })

    }

    public async ingresar_usuario(req: Request, res: Response) {

        try {
            const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
            const accion2 = await pool.query(`
            insert into usuario(nombre, apellido, edad, genero, peso_lb, estatura_cm, contrasena,iduser_couch,email,sesion,couch)
            values ("${req.body.nombre}", "${req.body.apellido}", ${req.body.edad}, "${req.body.genero}", ${req.body.peso_lb}, ${req.body.estatura_cm}, "${req.body.contrasena}", ${req.body.iduser_couch}, "${req.body.email}",0,"${req.body.couch}")
            `);
            res.json({ status: "c:", mensaje: "usuario agregado exitosamente" })
        } catch (error) {
            res.json({ status: ":c", mensaje: "error al insertar usuario, intentarlo de nuevo" })
        }

    }

    public async verificarEmail(req: Request, res: Response) {

        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
        const accion2 = await pool.query(`select email from usuario where email="${req.body.email}"`);
        res.json({ respuesta: accion2 })

    }

    public async cerrarSesion(req: Request, res: Response) {

        const accion = await pool.query(`update usuario set sesion = '0' where email="${req.body.email}"`);
        res.json({ respuesta: accion })

    }

    public async verificarCredenciales(req: Request, res: Response) {

        const accion2 = await pool.query(`select * from usuario where email="${req.body.email}" and contrasena="${req.body.contrasena}"`);
        //cuando las credenciales son correctas se modifica el atributo "sesion" en tabla usuario a "1" que significa que esta activo, 0 significa que esta desactivado
        if (accion2!="[]") {
            const accion = await pool.query(`update usuario set sesion = '1' where email="${req.body.email}" and contrasena="${req.body.contrasena}" `)
        }
        res.json({ respuesta: accion2 })
    }

    public async actualizar_usuario(req: Request, res: Response) {

        try {
            const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
            const accion2 = await pool.query(`
            update usuario set nombre="${req.body.nombre}", apellido="${req.body.apellido}", edad=${req.body.edad}, genero="${req.body.genero}", peso_lb=${req.body.peso_lb}, estatura_cm=${req.body.estatura_cm}, contrasena="${req.body.contrasena}" where email="${req.body.email}"
            `);
            res.json({ status: "c:", respuesta: "el usuario se modifico con exito" })

        } catch (error) {
            res.json({ status: ":c", respuesta: "error al modificar el usuario" })
        }
    }

    public async eliminar_usuario(req: Request, res: Response) {

        const accion1 = await pool.query(`use bmaxrefxhz3hp4r9drdu`);
        const accion2 = await pool.query(`
        delete from usuario where email="${req.body.email}"
        `);
        res.json({ respuesta: accion2 })
    }


}
export const apiController_user_simple_ = new apiController_userSimple();
