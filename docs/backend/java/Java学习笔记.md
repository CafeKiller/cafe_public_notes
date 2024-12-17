---
category: 笔记
tag:
  - Java
---
<!-- 笔记 -->

# Java 学习笔记

> 主要参考资料/书籍/文章:  
> [廖雪峰的Java教程](https://www.liaoxuefeng.com/wiki/1252599548343744)  

特别说明一下，本人的入坑编程语言就是 java，可以这是最熟悉的编程语言之一，而本笔记更多也是提供给自己复习用，一些过于基础的知识这里不会过多提及。

## 基础

### switch分支

自 Java1.8 以来 Java 中多数的流程控制语句都没有进行过多的更新了。历年来 Java 较多更新的流程控制语句就是 switch 。

switch 语句的版本变化：  

- java7之前：支持整数
- java8：支持枚举和字符串类型
- java12：支持匹配多值，允许返回值（通过 `break` 或 `->` ）
- java13：`break` 不再允许返回值，而是通过 `yield` 返回，而不许要返回值时依旧使用 `break`
- java14：正式实装 12和13 上的变动（此前12和13只是预览版，需要这是 `–enable-preview` 为 `true` ）
- java17: 这是 switch 改动最激烈的一次，首先支持模式匹配（支持传递对象），引入『保护模式』，同时允许空匹配（此前如果值为null会直接抛空指针异常）
- java21：正式实装 java17 中 switch 的模式匹配（是的，17版本中对 switch 的三项更新，只有模式匹配才真正实装了）

```java
// java 17 中引入模式匹配
return switch (obj) {
    case Integer i -> "It is an integer";
    case String s -> "It is a string";
    case Employee s -> "It is a Employee";
    default -> "It is none of the known data types";
};

// 保护模式
return switch (obj) {
    case Integer i -> "It is an integer";
    case String s -> "It is a string";
    // 允许模式匹配时，同时进行属性校验
    case Employee employee && employee.getDept().equals("IT") -> "IT Employee";
    default -> "It is none of the known data types";
};

// 空匹配
case null -> "It is a null object";
```

### 记录类（Record）

从Java 14开始，引入了新的 `Record` 类。我们定义 `Record` 类时，使用关键字 `record`。  

记录类的引入主要是为了解决一个过往 Java 对象过于样板的问题，如：大量的getset、构造方法、重写hasCode、toString等。  

记录类的特点就是：  

- 带有全部参数的构造方法
- public 访问器
- toString(),hashCode(),equals()
- 无 set，get 方法。没有遵循 Bean 的命名规范
- final 类，不能继承 Record，Record 为隐士的 final 类。除此之外与普通类一样
- 不可变类，通过构造创建 Record
- final 属性，不可修改
- 不能声明实例属性，能声明 static 成员

```java
// 定义一个 record
record Point(int x, int y) {}

// 如果将其转换为 class 那大概就是下面这样的
final class Point extends Record {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() { return this.x; }

    public int y() { return this.y; }

    public String toString() {
        return String.format("Point[x=%s, y=%s]", x, y);
    }

    public boolean equals(Object o) { ... }

    public int hashCode() { ... }
}

// 记录类 同样是支持构造函数的 （一般用于限制参数）
public record Point(int x, int y) {
    public Point {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException();
        }
    }
}

// 同样可以添加方法
public record Point(int x, int y) {
    public static Point of() {
        return new Point(0, 0);
    }
    public static Point of(int x, int y) {
        return new Point(x, y);
    }
}
```

### 常见工具类

- BigInteger：大数字处理
- BigDecimal：大浮点数处理
- Math：数学相关
- HexFormat：16进制处理
- Random：随机数相关
- SecureRandom：真随机数

### 异常相关

- 断言
    - 断言（Assertion）是一种调试程序的方式。在Java中，使用assert关键字来实现断言。
    - Java断言的特点是：断言失败时会抛出 `AssertionError`，导致程序结束退出。因此，断言不能用于可恢复的程序错误，只应该用于开发和测试阶段。

## 进阶

### 动态代理

总所周知 java 中的 interface 是不能直接实例化, 但如果我们想要在运行期间, 不通过实现类创建 interface 实例呢?   

Java标准库提供了一种动态代理（Dynamic Proxy）的机制：可以在运行期动态创建某个interface的实例。  

先定义了接口，但是我们并不去编写实现类，而是直接通过JDK提供的一个 `Proxy.newProxyInstance()` 创建了一个 接口对象。  

这种没有实现类但是在运行期动态创建了一个接口对象的方式，我们称为动态代码。JDK提供的动态创建接口对象的方式，就叫动态代理。

```java
// 一个简单的动态代理示例
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class Main {
    public static void main(String[] args) {
        InvocationHandler handler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println(method);
                if (method.getName().equals("morning")) {
                    System.out.println("Good morning, " + args[0]);
                }
                return null;
            }
        };
        Hello hello = (Hello) Proxy.newProxyInstance(
            Hello.class.getClassLoader(), // 传入ClassLoader
            new Class[] { Hello.class }, // 传入要实现的接口
            handler); // 传入处理调用方法的InvocationHandler
        hello.morning("Bob");
    }
}

// 定义接口
public interface Hello {
    void morning(String name);
}

// 将上面的代码转换为静态实现, 大致如下:
public class HelloDynamicProxy implements Hello {
    InvocationHandler handler;
    public HelloDynamicProxy(InvocationHandler handler) {
        this.handler = handler;
    }
    public void morning(String name) {
        handler.invoke(
           this,
           Hello.class.getMethod("morning", String.class),
           new Object[] { name });
    }
}
```

整体步骤基本如下:  

1. 定义一个InvocationHandler实例，它负责实现接口的方法调用；  
2. 通过Proxy.newProxyInstance()创建interface实例，它需要3个参数：  
    1. 使用的ClassLoader，通常就是接口类的ClassLoader；
    2. 需要实现的接口数组，至少需要传入一个接口进去；
    3. 用来处理接口方法调用的InvocationHandler实例。 
3. 将返回的Object强制转型为接口。