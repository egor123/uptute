### [Back](./Main.md)

# Student

## **UPGRADE TO STUDENT**

Type: `Post`  
Role: `User`  
Path: `account/{UUID}/student`
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

> Needs all user details to be filled

<br>

## **GET STUDENT INFO**

Type: `Get`  
Path: `account/{UUID}/student`  
ResponseBody:

```
{
    "info": Object,
}
```
