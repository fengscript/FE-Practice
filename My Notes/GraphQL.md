`GraphQL` 是一个用于 `API` 的查询语言，使用基于类型系统来执行查询的服务端运行时

一个 GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数

```graphql
type User {
  id: ID
  name: String
}

//解析函数：
function User_name(user) {
  return user.getName();
}

```
