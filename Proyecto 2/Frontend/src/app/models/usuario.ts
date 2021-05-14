export interface Usuario {
    iduser?: number;
    correo:string;
    contrasena:string;
    nombre:string;
    apellido:string;
    edad:number|null;
    genero:string;		//M o F
    peso_lb:number|null;
    estatura_cm:number|null;
    estado_sesion:number|null;	//1 esta abierta sus sesion, 0 esta cerrada, al agregar dejarla como 0
    estado_couch:number|null;	//1 couch  ;  0 atleta
    iduser_couch:number|null; 
    id_test_contador:number|null;
}
