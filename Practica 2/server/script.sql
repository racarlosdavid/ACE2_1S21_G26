
CREATE DATABASE /*!32312 IF NOT EXISTS*/ `db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `practica2`;


CREATE TABLE `usuario` (
  `iduser`        int          NOT NULL AUTO_INCREMENT,
  `correo`        varchar(20)  NOT NULL,
  `contrasena`    varchar(8)   NOT NULL,
  `nombre`        varchar(20)  NOT NULL,
  `apellido`      varchar(20)  NOT NULL,
  `edad`          int          NOT NULL,
  `genero`        varchar(1)   NOT NULL,
  `peso_lb`       decimal(6,2) NOT NULL,
  `estatura_cm`   decimal(6,2) NOT NULL,
  `estado_sesion` varchar(1)   NOT NULL,
  `estado_couch`  varchar(1)   NOT NULL,
  `iduser_couch`  int                  ,
  `idtest`        int NOT NULL DEFAULT 1,
  PRIMARY KEY (`iduser`)
) ;


CREATE TABLE lectura (
	idlectura int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  iduser    int not null,
	inhala 	  int not null,
	exhala    int not null,
	fecha 	  varchar(20) not null,
	hora 	  varchar(20) not null,
  idtest int not null

);

/* INSERT into usuario 
(correo,contrasena,nombre,apellido,edad,genero,peso_lb,estatura_cm,estado_sesion,estado_couch,iduser_couch,idtest) VALUES   
("bmoisesg@gmail.com", "admin", "Moises", "Gonzalez",24,"M",160,178,0,1,null,1),
("maria@gmail.com","123","Maria","Diaz",23,"F",140,160,0,1,null,1),
("luis@gmail","0000","Luis","Merida",15,"M",150,180,0,0,1,1),
("nicki@gmail","arqui","Nicki","Nicole",22,"F",140,140,0,0,1,1),
("edwin@gmail","hola","Edwin","Fuentes",30,"M",190,150,0,0,2,1),
("yes@gmail","hi","Yesenia","Gonzalez",15,"F",150,180,0,0,2,1);  */


create table reporte(
	id int not null primary key auto_increment,
    id_user int not null,
    id_test int not null,
    fecha 	varchar(20) not null,
    hora 	varchar(20) not null
);

