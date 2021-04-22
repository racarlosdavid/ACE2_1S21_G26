import { Usuario } from './usuario';

export interface RespuestaGeneral {
    respuesta?:string|boolean;
    usuario?:Usuario;
    dato?:number;
}
