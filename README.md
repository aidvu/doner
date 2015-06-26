# doner
A Done List API

## DB Setup
Schema create SQL with some demo data is in api/doner.sql  
```
mysql -u[user] -p[pass] < api/doner.sql
```

## API Setup

### Class Autoloader
Composer is used for autoloading, so you need to get it and run in api/  
```
php composer.phar update
```

### config.php

DB settings are the usual stuff.    
Auth Class should be a namespaced class name: ```\Doner\Authorization\CookieAuthorization```  
