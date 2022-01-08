### [Back](./Main.md)

# User

## **UPDATE USER Details**

Type: `Put`  
Permisions: `Owner???, Moderator`  
Path: `account/{UUID}/user`  
RequestBody:

```
{
    "details": Object
}
```
Details optional params:
```
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "pictureURL": String,
}
```

## **GET USER DETAILS**

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
