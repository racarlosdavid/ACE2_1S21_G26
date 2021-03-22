
### [GET] 35.209.252.22:3000/user/

Retorna todos los usuarios

respuesta
 ```
{
    "text": [
        {
            "iduser": 1,
            "correo": "...@gmail.com",
            "contrasena": "admin",
            "nombre": "...",
            "apellido": "...",
            "edad": 24,
            "genero": "M",		//M o F
            "peso_lb": 160,
            "estatura_cm": 178,
            "estado_sesion": "0",	//1 esta abierta sus sesion, 0 esta cerrada, al agregar dejarla como 0
            "estado_couch": "1",	//1 couch  ;  0 atleta
            "iduser_couch": null,     ///cuando es couch, enviar un null, de lo contrario enviar el id del couch
            "veces_rendido": 0,         //defecto
            "veces_fallado": 0		//defecto
        },...
}
 ```



### [POST]35.209.252.22:3000/user/add

agrega un nuevo usuario, cuando un usuario se registra 

json 
```
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
            "veces_rendido": 0,
            "veces_fallado": 0
} 
```

respuesta
 ```
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
 ```


###  [POST]35.209.252.22:3000/user/checkEmail
Consulta en la base de datos si el correo que se esta enviando, ya existe?

json 
 ```
{
	"correo":"...@gmail.com"
}
 ```

respueta no encontro el email
 ```
{
    "text": [...]
}
 ```

respuesta si encontro el email
 ```
{
    "text": [
        {
            "correo": "...@gmail.com"
        }
    ]
}
 ```
<<<<<<< HEAD


=======


>>>>>>> 5c63576757aa96a2a0b34f0f73e5b25764dec938
### [POST]35.209.252.22:3000/user/checkCredential
Login, ingresa su correo y la contraseña

json
 ```
{ 
	"correo":"...@gmail.com",
	"contrasena":"admin"
}
 ```
respuesta correcta, retorna toda la informacion del usuario
 ```
{
    "text": [
        {
            "iduser": 1,
            "correo": "...@gmail.com",
            "contrasena": "admin",
            "nombre": "...",
            "apellido": "...",
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
 ```
respuesta incorrecta, osea cuando las credenciales estan malas
 ```
{
    "text": []
}
 ```

###  [POST]35.209.252.22:3000/user/cerrarSesion
Cuando el usuario salga de la pagina, se tiene que cerrar su sesion, solo es necesario que envie su correo

json
 ```
{
	"correo": "...@gmail.com"
}
 ```

respuesta
 ```
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
 ```



### [GET]35.209.252.22:3000/couch/
retornar a todos los couchs que estan registrados en el sistema
respuesta
 ```{
    "text": [
        {
            "iduser": 1,
            "correo": "...@gmail.com",
            "contrasena": "admin",
            "nombre": "...",
            "apellido": "...",
            "edad": 24,
            "genero": "M",
            "peso_lb": 160,
            "estatura_cm": 178,
            "estado_sesion": "0",
            "estado_couch": "1",
            "iduser_couch": null,
            "veces_rendido": 0,
            "veces_fallado": 0
        },{...}...
    ]
}

  ```

### [POST]35.209.252.22:3000/couch/
para cuando un atleta se asigna un couch, para eso se necesita el id del atleta y el id del couch que se quiere adignar
json
```
{
	"iduser_couch":2,
	"iduser":10
}
 ```
 respuesta
 ```
 {
    "text": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 0  Warnings: 0",
        "protocol41": true,
        "changedRows": 0
    }
}
 ```

### [POST]35.209.252.22:3000/couch/team

retorna una lista de los atletas que tiene acargo un couch, solo se necesita ingresar el id del couch

json
```
{
	"iduser_couch":2
}
```
respuesta
```
{
    "text": [
        {
            "iduser": 5,
            "correo": "..@gmail",
            "contrasena": "hola",
            "nombre": "...",
            "apellido": "Fuentes",
            "edad": 30,
            "genero": "M",
            "peso_lb": 190,
            "estatura_cm": 150,
            "estado_sesion": "0",
            "estado_couch": "0",
            "iduser_couch": 2,
            "veces_rendido": 0,
            "veces_fallado": 0
        },{},{}
    ]
}
```



<<<<<<< HEAD
### [post]35.209.252.22:3000/lectura/
=======
### 35.209.252.22:3000/lectura/
>>>>>>> 5c63576757aa96a2a0b34f0f73e5b25764dec938
agrega una lectura 
```
{
	"id_user": 1 ,
	"fecha":"2021/02/15",
	"hora":"",
	"t":8,   //double
	"r":30,  //double
	"v":1,   //double
	"d":1,   //double
	"repeticiones":1  //int
}
```


<<<<<<< HEAD
### [post]35.209.252.22:3000/lectura/historial
=======
### 35.209.252.22:3000/lectura/historial
>>>>>>> 5c63576757aa96a2a0b34f0f73e5b25764dec938
retorna un historial 
```
{
	"iduser": 1,
	"tipo": "R"    //R= ritmo cardiaco, T= temperatura
}
```
respuesta
```
{
    "respuesta": [
        {
            "fecha": "2021/02/15",
            "hora": "",
            "dato": 30
        },
        {
            "fecha": "2021/02/15",
            "hora": "",
            "dato": 30
        },{...},...
    ]
}
```
<<<<<<< HEAD
### [post]35.209.252.22:3000/lectura/max
=======
### 35.209.252.22:3000/lectura/max
>>>>>>> 5c63576757aa96a2a0b34f0f73e5b25764dec938
retorna el valor max registrado en el sistema
```
{
	"iduser": 1,
	"tipo": "R"       //R= ritmo cardiaco, T= temperatura
}
```
respuesta
```
{
    "respuesta": [
        {
            "fecha": "2021/02/15",
            "hora": "",
            "r": 10
        }
    ]
}
```
<<<<<<< HEAD
### [post]35.209.252.22:3000/lectura/min
=======
### 35.209.252.22:3000/lectura/min
>>>>>>> 5c63576757aa96a2a0b34f0f73e5b25764dec938
retorna el valor min registrado en el sistema
```
{
	"iduser": 1,
	"tipo": "R"       //R= ritmo cardiaco, T= temperatura
}
```
respuesta
```
{
    "respuesta": [
        {
            "fecha": "2021/02/15",
            "hora": "",
            "r": 10
        }
    ]
}
```

<<<<<<< HEAD
### [post]35.209.252.22:3000/lectura/avg
=======
### 35.209.252.22:3000/lectura/avg
>>>>>>> 5c63576757aa96a2a0b34f0f73e5b25764dec938
retorna el valor promedio registrado en el sistema
```
{
	"iduser": 1,
	"tipo": "R"       //R= ritmaco,o cardi T= temperatura
}
```
respuesta
```
{
    "respuesta": [
        {
            "dato": 6.575714
        }
    ]
}
```



<<<<<<< HEAD
### [post]35.209.252.22:3000/lectura/now
=======
### 35.209.252.22:3000/lectura/now
>>>>>>> 5c63576757aa96a2a0b34f0f73e5b25764dec938
retorna el ultimo valor registrado en el sistema, asi simula el reporte en tiempo real
```
{
	"iduser": 1,
<<<<<<< HEAD
	"tipo": "R"       //R= ritmo cardiaco, T= temperatura, V= velocidad , RE= repeticion, D= distancia actual, DT= distancia acumulada
=======
	"tipo": "R"       //R= ritmo cardiaco, T= temperatura
>>>>>>> 5c63576757aa96a2a0b34f0f73e5b25764dec938
}
```
respuesta
```
{
    "respuesta": [
        {
            "fecha": "2021/02/15",
            "hora": "",
            "dato": 30
        }
    ]
}
```
<<<<<<< HEAD

### [post]35.209.252.22:3000/lectura/reportVelocidad
Reporte:retorna una lista de test con los periodos y la velocidad min,max,promedio en cada periodo. Se necesita el id del usuario 
json
```
{
	"iduser":1
}
```

respuesta   //recomiendo colocarla en una tabla 
```
{
    "respuesta": [
        {
            "id_test": 5,
            "periodo": 1,
            "min": 15,
            "max": 15.6,
            "avg": 15.366667
        },
        {
            "id_test": 5,
            "periodo": 2,
            "min": 16.01,
            "max": 16.1,
            "avg": 16.07
        }...
    ]
}
```



### [post]35.209.252.22:3000/user/vecesFallo
Reporte: retorna las veces que el usuario a fallado desde que creo su cuenta

json

```
{
	"iduser":1
}
```
respuesta
```
{
    "respuesta": [
        {
            "veces_fallado": 1
        }
    ]
}
```


### [post]35.209.252.22:3000/user/vecesRendido
Reporte: retorna las veces que el usuario se ha rendido desde que creo su cuenta

json

```
{
	"iduser":1
}
```
respuesta
```
{
    "respuesta": [
        {
            "veces_rendido": 1
        }
    ]
}
```



### [post]35.209.252.22:3000/lectura/reportDistanci
reporte: retorna una lista de las repeticiones y la distancia que se registro
json

```
{
	"iduser":1
}
```
respuesta
```
{
    "respuesta": [   //recomiendo ponerla en una tabla
        {
            "idTest": 5,
            "repeticiones": 1,
            "distancia": 10
        },
        {
            "idTest": 5,
            "repeticiones": 2,
            "distancia": 15
        },
        {
            "idTest": 5,
            "repeticiones": 3,
            "distancia": 35
        }
    ]
}
```


### [post]35.209.252.22:3000/lectura/reportConteo
reporte: retorna una lista cuantos periodos hizo un atleta en cada una de los Test

```
{
	"iduser":1
}
```
repuesta
```
{
    "respuesta": [
        {
            "idTest": 5,
            "periodo": 3
        }
    ]
}
```


### 35.209.252.22:3000/lectura/reportRepeticionesMax
reporte: retorna el numero de repeticiones amx que ha hecho un atleta en los test
enviar:
```
{
	"iduser":1
}
```
respuesta
```
{
    "respuesta": [
        {
            "dato": 3
        }
    ]
}
```


### 35.209.252.22:3000/lectura/reportRepeticionesMin
reporte: retorna el numero de repeticiones min que ha hecho un atleta en los test
enviar:
```
{
	"iduser":1
}
```
respuesta
```
{
    "respuesta": [
        {
            "dato": 3
        }
    ]
}
```

### 35.209.252.22:3000/lectura/reportRepeticionesProm
reporte: retorna el numero de repeticiones promedio que ha hecho un atleta en los test
enviar:
```
{
	"iduser":1
}
```
respuesta
```
{
    "respuesta": [
        {
            "dato": 3
        }
    ]
}
```
=======
>>>>>>> 5c63576757aa96a2a0b34f0f73e5b25764dec938
