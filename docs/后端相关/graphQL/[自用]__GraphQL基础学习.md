# [自用]__GraphQL基础学习

参考文章：
> https://www.freecodecamp.org/chinese/news/a-detailed-guide-to-graphql/   
> https://graphql.cn/learn/  

## 何为 GraphQL

GraphQL 是一种面向数据的 API 查询风格。  

传统的 API 拿到的是前后端约定好的数据格式，GraphQL 对 API 中的数据提供了一套易于理解的完整描述，客户端能够准确地获得它需要的数据，没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。

## 概述

GraphQL 是一个用于 API 的查询语言，是一个使用基于类型系统来执行查询的服务端运行时（类型系统由你的数据定义）。GraphQL 并没有和任何特定数据库或者存储引擎绑定，而是依靠你现有的代码和数据支撑。

一个 GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数。

例如，一个 GraphQL 服务告诉我们当前登录用户是 me，这个用户的名称可能像这样：

```graphql
type Query {
  me: User
}
 
type User {
  id: ID
  name: String
}
```

一并的还有每个类型上字段的解析函数：

```graphql
function Query_me(request) {
  return request.auth.user;
}
 
function User_name(user) {
  return user.getName();
}
```

一旦一个 GraphQL 服务运行起来（通常在 web 服务的一个 URL 上），它就能接收 GraphQL 查询，并验证和执行。接收到的查询首先会被检查确保它只引用了已定义的类型和字段，然后运行指定的解析函数来生成结果。

```graphql
# 查询
{
  me {
    name
  }
}

# 结果 （JSON格式）
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

## 重要概念

> 一些基础概念可以通过官网文档进行更详细的了解：https://graphql.cn/learn/queries/#fields （其中也有很多高级的操作如：指令、联合类型、内联片段等）

### 操作类型 Operation Type

GraphQL 的操作类型可以是 query、mutation 或 subscription，描述客户端希望进行什么样的操作

1. query 查询：获取数据，比如查找，CRUD 中的 R
2. mutation 变更：对数据进行变更，比如增加、删除、修改，CRUD 中的 CUD
3. substription 订阅：当数据发生更改，进行消息推送

```graphql
# 这些操作类型都将在后文实际用到，比如这里进行一个查询操作
query {
  user { id }
}
```

### 对象类型和标量类型 Object Type & Scalar Type

如果一个 GraphQL 服务接受到了一个 `query`，那么这个 `query` 将从 `Root Query` 开始查找，找到对象类型（Object Type）时则使用它的解析函数 Resolver 来获取内容，如果返回的是对象类型则继续使用解析函数获取内容，如果返回的是标量类型（Scalar Type）则结束获取，直到找到最后一个标量类型。

1. 对象类型：用户在 schema 中定义的 type
2. 标量类型：GraphQL 中内置有一些标量类型 String、Int、Float、Boolean、ID，用户也可以定义自己的标量类型

```graphql
# 比如在 Schema 中声明：
type User {
  name: String!
  age: Int
}
```