# Servidor

## Instalar dependencias de node

```
sudo npm run i
```
automaticamente creara una carpeta llamada "node_modules"

## Construir Proyecto

```
npm run build
```
Creara una carpeta llamada "build" que contiene los archivos [*.js]

## Levantar servidor

```
npm run dev
```
Este comando ejecuta el archivo build/index.js el cual levanta los servicios del servidor, por el momento es local asi que se tiene que consultar localhost:3000/

## URL's

### atleta/
[GET] devulve un json con todos los atletas y couch asociados a la base de datos
```json
{
    "usuarios": [
        {...},{...},{...},{...},...
    ]
}
```

estructura:
* id_user= entero (identificador)
* nombre= cadena de caracteres, 20 max
* apellido= cadena de caracteres, 20 max
* edad= entero
* genero= femenino(F) o masculino(M)
* peso_lb= decimal (2decimales)
* estatura_cm= decimal (2 decimales)
* contrasena= cadena de caracteres, max 8
* iduser_couch= codigo identificador couch
* email=cadena de caracteres, 20 max

### atleta/update

[POST] actualiza los datos de los atletas o usuarios segun el email 

enviar

```json
{
	"nombre": "...",
    "apellido": "...",
    "edad": ...,
    "genero": "...",
    "peso_lb": ...,
    "estatura_cm": ... ,
    "contrasena": "...",
    "email": "..."
}
```

respuesta

```json
{
    "status": "c:",
    "respuesta": "el usuario se modifico con exito"
}
```
### atleta/add
[POST] agregar un usuario a la base de datos, un atleta por defecto no tiene couch, solo se le pude asignar 1 couch
enviar
```json
{
	"nombre": "...",
    "apellido": "...",
    "edad": ...,
    "genero": "...",
    "peso_lb": ...,
    "estatura_cm": ...,
    "contrasena": "...",
    "iduser_couch": null,
    "email": "..."
}
```
respuesta

```json
{
    "status": "c:",
    "mensaje": "usuario agregado exitosamente"
}
```

### atleta/checkEmail
[POST] revisa si un correo electronico ya existe en el sistema, esto es al momento de registrarse y asi evitar que los email's se repitan
```json
{
	"email":".."
}
```
respuesta cuando encuentra el correo

```json
{
    "respuesta": [
        {
            "email": "..."
        }
    ]
}
```

respuesta cuando no encuentra el correo
```json
{
    "respuesta": []
}
```


### atleta/checkCredential
[POST] verifica si el correo y contraseña son correctas, LOGIN
```json
{
	"email":"...",
	"contrasena": "..."
}
```
respuesta cuando las credenciales son correctas; retorna toda la informacion de ese usuario
```json
{
    "respuesta": [
        {
            "iduser": ...,
            "nombre": "...",
            "apellido": "...",
            "edad": ...,
            "genero": "...",
            "peso_lb": ...,
            "estatura_cm": ...,
            "contrasena": "...",
            "iduser_couch": ...,
            "email": "..."
        }
    ]
}
```
respuesta cuando las credenciales son incorrectas
```json
{
    "respuesta": []
}
```

### atleta/drop
[POST] eliminar la cuenta del usuario (atleta o couch)
enviar
```json
{
	"email":"..."
}

```
respuesta 
```json
{
    "respuesta": {
        ...
    }
}

```

### couch/
[post] se asigna couch a atleta, enviar nombre y apellido del atleta , asi como tambien el iduser_couch
```json
{
	"iduser_couch":"...",
	"nombre":"...",
	"apellido":"..."
}
```
respuesta
```json
{
    "status": "c:",
    "mensaje": "se asigno couch al usuario ..."
}
```
### couch/quitar
[post] se le quita couch al atleta, solo se necesita el nombre y apellido del usuario 
```json
{
	"nombre":"...",
	"apellido":"..."
}
```
respuesta
```json
{
    "status": "c:",
    "mensaje": "se quito couch a este "
}
```
### couch/listaAtleta
[post] devuelve una lista de atletas que estan asignadas a un couch
```json
{
	"iduser_couch": ...
}
```
respuesta
```json
{
    "respuesta": [
        {
            "iduser": ...,
            "nombre": "...",
            "apellido": "...",
            "edad": ...,
            "genero": "...",
            "peso_lb": ...,
            "estatura_cm": ...,
            "contrasena": "...",
            "iduser_couch": ...,
            "email": "..."
        },
        {
            "iduser": ...,
            "nombre": "...",
            "apellido": "...",
            "edad": ...,
            "genero": "...",
            "peso_lb": ...,
            "estatura_cm": ...,
            "contrasena": "...",
            "iduser_couch": ...,
            "email": "..."
        }, ...
    ]
}
```


### lectura/
[POST] inserta una lectura a la base de datos
estructura:
- id_user=codigo del usuario 
- tipo= Oxigenacion(O) o temperatura (T) o ritmo cardiaco(R)  
- fecha= año/mes/dia
- dato=lectura a ingesar


envia
```json
{
	"id_user":1,
	"tipo":"...",
	"fecha":"20/01/21",
	"dato": 79
}
```
respuesta

```json
{
    "status": "c:",
    "mensaje": "se ingreso la lectura"
}
```
### lectura/historial
[POST] retorna un array de 10 lecturas mas recientes de un atleta , para ello se necesita enviar el id del atleta y el tipo= "O" (oxigenamcion) | "T" (temperatura) | "R" (ritmo)


```json
{
	"iduser": 2,
	"tipo": "T"
}
```
respuesta del atleta 2 de sus lecturas mas recientes de temperatura:
```json
{
    "respuesta": [
        {
            "fecha": "2020-01-01T06:00:00.000Z",
            "dato": ...
        },
        {
          ...
        },
        {
          ...
        },
        ...
    ]
}
```
### lectura/historialMax
[POST] muestra la lectura maxima de oxigenacion "O" o temperatura"T" o ritmo cardiaco "R"  de un atleta
enviar
```json
{
	"iduser": ...,
	"tipo": "..."
}
```
respuesta
```json
{
    "respuesta": [
        {
            "fecha": "2020-01-01T06:00:00.000Z",
            "max(dato)": ...
        }
    ]
}
```
### lectura/historialMin
[POST]muestra la lectura minima de oxigenacion "O" o temperatura"T" o ritmo cardiaco "R" de un atleta
```json
{
	"iduser": ...,
	"tipo": "..."
}
```
respuesta
```json
{
    "respuesta": [
        {
            "fecha": "2020-01-01T06:00:00.000Z",
            "min(dato)": ...
        }
    ]
}
```
### lectura/historialProm
[POST]muestra la lectura promedio de oxigenacion "O" o temperatura "T" o ritmo cardiaco "R" de un atleta
```json
{
	"iduser": ...,
	"tipo": "..."
}
```
respuesta 
```json
{
    "respuesta": [
        {
            "avg(dato)": ...
        }
    ]
}
```
### lectura/now
[POST]muestra la lectura mas reciente de un atleta, para ello se necesita el tipo de lectura que se requiere(t,o,r)
```json
{
	"iduser": ...,
	"tipo": "T"
}
```
respuesta
```json
{
    "respuesta": [
        {
            "fecha": "2020-01-11T06:00:00.000Z",
            "dato": ...
        }
    ]
}
```