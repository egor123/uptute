### [Back](./Main.md)

# Authenticate

## **AUTHENTICATE**

Type: `Post`  
Path: `/auth/{provider}/signin`  
Provider: `facebook, google`
RequestBody:

```
{ "accesToken": String }
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

## **REFRESH TOKEN**

Type: `Post`  
Path: `/auth/refreshToken`  
RequestBody:

```
{ "refreshToken": String }
```

ResponseBody:

```
{
    "jwt": String,
    "tokenType": "Bearer",
    "refrershToken": String,
}
```
