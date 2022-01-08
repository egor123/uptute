### [Back](./Main.md)

# Tutor

## **UPGRADE TO TUTOR**

Type: `Post`  
Role: `Student`  
Path: `account/{UUID}/tutor`  
RequestBody:

```
{
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
