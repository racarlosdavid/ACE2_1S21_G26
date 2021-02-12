export interface Atleta{
    iduser?:number;  
    nombre?:string;
    apellido?:string;
    edad?:number|string;
    genero?: string;
    peso_lb?: number|string;
    estatura_cm?: number|string;
    contrasena?:string;
    iduser_couch?: number|null;
    email?:string|undefined;
}