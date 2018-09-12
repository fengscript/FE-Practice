# CRUD
- 用 `#` 或者 `/**/` 注释，用 `--` 在行后注释
- 每一句必须以 `;` 结束

## Create
```sql
INSERT INTO Products VALUES('id','name',NULL,'2018-08') -- 数据库中运行 NULL，这里才能 NULL
/*上面这样子插入，严格依赖于表的字段顺序*/

/*表名和 VALUES 里面的字段值必须完全对应，但是插入到表里面时候，会自己匹配，不一定跟表里面顺序完全一致*/
INSERT INTO Products(name, id, time, price) VALUES('name','id',NULL,'2018-08')

```



## Read
```sql
SELECT prod_name FROM Products; -- single row 
SELECT prod_name , prod_id FROM Products; -- multi row
```
