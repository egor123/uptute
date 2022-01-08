### [Back](./Main.md)

# User

## **UPDATE USER INFO**

Type: `Put`  
Permisions: `Owner???, Moderator`  
Path: `account/{UUID}/user`  
RequestBody:

```
{
    "info": Object
}
```
Info optional params:
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
Permisions: `None`
ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "pictureURL": String,
}
```
Permisions: Moderator, Owner???
ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "pictureURL": String,
}
```
