### [Back](./Main.md)

# User

## **UPDATE USER DETAILS**

Type: `Put`  
Permisions: `Owner???, Moderator`  
Path: `account/{UUID}/user`  
RequestBody:

```
{
    "firstName": String, //optional
    "lastName": String, //optional
    "email": String, //optional
    "pictureURL": String, //optional
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
Permisions: `Owner???, Moderator`
ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "pictureURL": String,
}
```
