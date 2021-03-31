export interface RespuestaInsertarActualizar{
    respuesta:boolean;                	//false
    insertId?:number|null;   	//null o 0  o  no estar
    affectedRows?:number|null;	//null o 0  o no estar
}
