### [Back](./Main.md)

# Tutor

## **UPGRADE TO TUTOR**

Type: `Post`  
Role: `Student`  
Path: `account/{UUID}/tutor`  
RequestBody:

```
{
    "jwt": String,
    "info": Object
}
```

ResponseBody:

```
{
    "jwt": String,
    "tokenType": "Bearer",
    "refrershToken": String,
    "UUID": String,
    "roles": Array
}
```

<br>

## **GET TUTOR INFO**

Type: `Get`  
Path: `/account/{UUID}/tutor`  
RequestBody:

```
{ "jwt": String }
```

ResponseBody:

```
{
    "info": Object,
    "jwt": String,
    "tokenType": "Bearer",
    "refrershToken": String,
    "UUID": String,
    "roles": Array
}
```
