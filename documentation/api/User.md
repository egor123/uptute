### [Back](./Main.md)

# User

## **CHANGE ACCOUNT INFO**

Type: `Patch`  
Role: `User`  
Path: `account/{UUID}/user`  
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
