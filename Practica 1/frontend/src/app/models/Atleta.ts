export interface Atleta{
    iduser?:number;  
    nombre?:string;
    apellido?:string;
    edad?:number;
    genero?: string;
    peso_lb?: number;
    estatura_cm?: number;
    contrasena?:string;
    iduser_couch?: number|null;
    email?:string;
}