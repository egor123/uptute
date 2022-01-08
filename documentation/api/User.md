### [Back](./Main.md)

# User

## **CHANGE ACCOUNT INFO**

Type: `Patch`  
Role: `User`  
Path: `account/{UUID}/user`  
RequestBody:

```
{
    "firstName": String,
    "lastName": String,
    "pictureURL": String,
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

## **GET USER INFO**

Type: `Get`  
Path: `/account/{UUID}/user`  
ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "pictureURL": String,
}
```
