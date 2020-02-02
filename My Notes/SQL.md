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
`WHERE` 字句的操作符（视不同的DBMS系统而定）： `=`，`>=`，`<=`，`!=`，`>`，`<`，`!>`，`<>`，`BETWEEN`，`IS NULL`；

```sql
SELECT title FROM allnews WHERE id = 200 ORDER BY storeTime DESC;

SELECT title FROM allnews WHERE id BETWEEN 160 AND 180 ORDER BY storeTime DESC;
```
**引号**：与字符串类型的列作比较时，用引号限定

#### 高级过滤
`NOT`，`IN`，`AND`，`OR`

`NOT`：否定它后面的所有条件，同 `<>`

`IN`：指定范围搜索

**求值顺序**： `OR` 优先于 `AND`，反正，上`()`明确的分组就OK

判断非空： `IS NOT NULL`

```sql
SELECT title FROM allnews WHERE id > 120 AND keyWords IS NOT NULL ORDER BY storeTime DESC;

-- IN
SELECT title FROM allnews WHERE id IN (180 , 200) AND keyWords IS NOT NULL ORDER BY storeTime DESC;
```
`IN` 相当于另一种 `OR`，但是性能更高，而且可以包含其他 `SELECT`，且与其他 `AND`，`OR`组合时，求值顺序更易管理