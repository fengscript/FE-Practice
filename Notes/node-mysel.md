[文档](https://github.com/mysqljs/mysql#pooling-connections)
# 使用

## 开辟一个连接
```javascript
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
```


## 连接池
`createConnection `只能一个一个的开，如果有好多个，可以直接开一个池子
```javascript
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'example.org',
  user            : 'bob',
  password        : 'secret',
  database        : 'my_db'
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
```
`pool.query` 是 `pool.getConnection() -> connection.query() -> connection.release()` 流的快捷方式，而使用 `pool.getConnection()` 可以在后面的操作中共享查询状态：
```javascript
pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!

  // Use the connection
  connection.query('SELECT something FROM sometable', function (error, results, fields) {
    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
});
```
上面的 `release` 也可以用`connection.destroy()`代替，它会关闭连接并从池里面去掉这个连接

### pool事件钩子

- enquene
- acquire
- connection
- release

```javascript
pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});
```


# CURD
## 基础查询
1. ` .query(sqlString, callback) ` 
```javascript
connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});
```

2. `.query(sqlString, values, callback)` 占位符
```javascript
connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});
```


3. `.query(options, callback)`



# 踩坑
1. 报错 Error:ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'from) VALUES('供应链抢先爆料华为Mate20：全新系统+最强芯片 售' at line 1

很大可能是字段使用了保留字，比如 `from`