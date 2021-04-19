import { Usuario } from "./Usuario";

export interface RespuestaGeneral {
    respuesta?:string|boolean;
    usuario?:Usuario;
    dato?:number;
}
