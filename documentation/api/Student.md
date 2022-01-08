### [Back](./Main.md)

# Student

## **UPGRADE TO STUDENT**

Type: `Post`  
Role: `User`  
Path: `account/{UUID}/student`  
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

## **GET STUDENT INFO**

Type: `Get`  
Path: `account/{UUID}/student`  
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
