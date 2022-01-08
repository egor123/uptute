### [Back](./Main.md)

# User

## **CHANGE ACCOUNT INFO**

Type: `Patch`  
Role: `Owner???, Moderator`  
Path: `account/{UUID}/user`  
RequestBody:

```
{
    "firstName": String,
    "lastName": String,
    "email": String,
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
Role: `None`
ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "pictureURL": String,
}
```
Role: Moderator, Owner???
ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "pictureURL": String,
}
```
