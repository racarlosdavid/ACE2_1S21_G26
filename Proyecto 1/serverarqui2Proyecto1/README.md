----------------------------------------------------------------------------------
[GET] 35.209.252.22:3000/user/

respuesta
{
    "text": [
        {
            "iduser": 1,
            "correo": "bmoisesg@gmail.com",
            "contrasena": "admin",
            "nombre": "Moises",
            "apellido": "Gonzalez",
            "edad": 24,
            "genero": "M",		//M o F
            "peso_lb": 160,
            "estatura_cm": 178,
            "estado_sesion": "0",	//1 esta abierta sus sesion, 0 esta cerrada
            "estado_couch": "1",	//1 couch  ;  0 atleta
            "iduser_couch": null,     ///cuando es couch, enviar un null, de lo contrario enviar el id del couch
            "veces_rendido": 0,         //defecto
            "veces_fallado": 0		//defecto
        },...
}


----------------------------------------------------------------------------------
[POST]35.209.252.22:3000/user/add
json
{
            "correo": "hsdsfdsai@gmail.com",
            "contra": "123",
	        "nombre": "hhhhh",
            "apellido": "fuentes",
            "edad": 25,
            "genero": "F",
            "peso_lb": 163,
            "estatura_cm": 157,
            "estado_sesion": 0,
            "estado_couch": 0,
            "iduser_couch": 1,
            "veces_rendido": 10,
            "veces_fallado": 11
}

respuesta
{
    "text": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 9,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}

----------------------------------------------------------------------------------
[POST]35.209.252.22:3000/user/checkEmail
json 
{
	"correo":"mardia@gmail.com"
}

respueta no encontro el email
{
    "text": [...]
}

respuesta si encontro el email
{
    "text": [
        {
            "correo": "bmoisesg@gmail.com"
        }
    ]
}

----------------------------------------------------------------------------------
[POST]35.209.252.22:3000/user/checkCredential
json{ 
	"correo":"bmoisesg@gmail.com",
	"contrasena":"admin"
	
}
respuesta correcta
{
    "text": [
        {
            "iduser": 1,
            "correo": "bmoisesg@gmail.com",
            "contrasena": "admin",
            "nombre": "Moises",
            "apellido": "Gonzalez",
            "edad": 24,
            "genero": "M",
            "peso_lb": 160,
            "estatura_cm": 178,
            "estado_sesion": "0",
            "estado_couch": "1",
            "iduser_couch": null,
            "veces_rendido": 0,
            "veces_fallado": 0
        }
    ]
}
respuesta incorrecta, osea cuando las credenciales estan malas
{
    "text": []
}

----------------------------------------------------------------------------------
[POST]35.209.252.22:3000/user/cerrarSesion
json
{
	"correo": "bmoisesg@gmail.com"
}

respuesta
{
    "text": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 34,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
