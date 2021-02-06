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

### ../atleta/
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

### ../atleta/update

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
### ../atleta/add
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

### ../atleta/checkEmail
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


### ../atleta/checkCredential
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

### ../atleta/drop
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

