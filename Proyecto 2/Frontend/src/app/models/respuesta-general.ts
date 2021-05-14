import { Usuario } from 'src/app/models/usuario';
export interface RespuestaGeneral {
    respuesta?:string|boolean;
    usuario?:Usuario;
    dato?:number;
    affectedRows?:number;
}
