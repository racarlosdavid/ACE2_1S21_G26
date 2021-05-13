CREATE TABLE `lectura` (
    `idlectura` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_user` int NOT NULL,
    `id_test` int NOT NULL,
    `fecha` varchar(20) NOT NULL,
    `hora` varchar(20) NOT NULL,
    `t` decimal(6, 2) NOT NULL, 
    `r` decimal(6, 2) NOT NULL,
    `c` int NOT NULL,
    `f` decimal(6, 2) NOT NULL
);


create table `test`(
    `id_user` int not NULL,
    `id_test` int not NULL,
    `fecha` varchar(20) NOT NULL,
    `hora` varchar(20) NOT NULL,
    `c` INT NOT NULL
);

CREATE TABLE `usuario` (
    `iduser` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `correo` varchar(20) NOT NULL,
    `contrasena` varchar(8) NOT NULL,
    `nombre` varchar(20) NOT NULL,
    `apellido` varchar(20) NOT NULL,
    `edad` int NOT NULL,
    `genero` varchar(1) NOT NULL,
    `peso_lb` decimal(6, 2) NOT NULL,
    `estatura_cm` decimal(6, 2) NOT NULL,
    `estado_sesion` varchar(1) NOT NULL,
    `estado_couch` varchar(1) NOT NULL,
    `iduser_couch` int,
    `id_test_contador` int DEFAULT 1   
);
alter TABLE test ADD FOREIGN KEY (id_user) REFERENCES usuario(iduser);


INSERT into usuario (
        correo,
        contrasena,
        nombre,
        apellido,
        edad,
        genero,
        peso_lb,
        estatura_cm,
        estado_sesion,
        estado_couch,
        iduser_couch
    )
VALUES (
        "bmoisesg@gmail.com",
        "admin",
        "Moises",
        "Gonzalez",
        24,
        "M",
        160,
        178,
        0,
        1,
        null
    ),
    (
        "maria@gmail.com",
        "123",
        "Maria",
        "Diaz",
        23,
        "F",
        140,
        160,
        0,
        1,
        null
    ),
    (
        "luis@gmail",
        "0000",
        "Luis",
        "Merida",
        15,
        "M",
        150,
        180,
        0,
        0,
        1
    ),
    (
        "nicki@gmail",
        "arqui",
        "Nicki",
        "Nicole",
        22,
        "F",
        140,
        140,
        0,
        0,
        1
    ),
    (
        "edwin@gmail",
        "hola",
        "Edwin",
        "Fuentes",
        30,
        "M",
        190,
        150,
        0,
        0,
        2
    ),
    (
        "yes@gmail",
        "hi",
        "Yesenia",
        "Gonzalez",
        15,
        "F",
        150,
        180,
        0,
        0,
        2
    );
