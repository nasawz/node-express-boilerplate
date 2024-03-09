```
DEFINE SCOPE user SESSION 1d 
    SIGNUP (CREATE user SET authority = ['USER'], email = $email, password = crypto::argon2::generate($password), name = $name, avatar = '', created = time::now(), lastSignin = time::now(), isEmailValid = false, points = 0) 
    SIGNIN (SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(password, $password))
;

DEFINE INDEX userEmailIndex ON user FIELDS email UNIQUE;

```