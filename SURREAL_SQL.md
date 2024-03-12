```
DEFINE SCOPE user SESSION 1d 
    SIGNUP (CREATE user SET authority = ['USER'], email = $email, password = crypto::argon2::generate($password), name = 'Guest', avatar = '', type = 'Guest', expired = 0, created = time::now(), lastSignin = time::now(), isEmailValid = false, point = 5) 
    SIGNIN (SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(password, $password))
;

DEFINE INDEX userEmailIndex ON user FIELDS email UNIQUE;


DEFINE TABLE code SCHEMALESS
	PERMISSIONS
		FOR select,create,update,delete NONE
;

DEFINE TABLE fee SCHEMALESS
	PERMISSIONS
		FOR select,create,update,delete NONE
;


```