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
### query
```sql
SELECT prod_name FROM Products; -- 单行
SELECT prod_name , prod_id FROM Products; -- 多行
SELECT DISTINCT title FROM allnews; -- 多个相同结果只保留一项
```

### 筛选
`LIMIT`， `OFFSET`
```sql
-- 筛选
    -- 返回 n 行数据
SELECT title FROM allnews LIMIT n;

    -- 返回从 x 行开始的 y 行数据 
SELECT title FROM allnews LIMIT y OFFSET x;
```

### 排序
`ORDER BY`，`DESC`
```sql
-- 排序 ORDER BY
-- ORDER BY 必须是SELECT语句中的最后一条自居
SELECT title FROM allnews ORDER BY storeTime;
    -- 按多个列排序
SELECT title FROM allnews ORDER BY storeTime, id;

    -- 降序
SELECT title FROM allnews ORDER BY storeTime DESC;
```

### 过滤
`WHERE`