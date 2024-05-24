import this
import turtle

if __name__ == '__main__':
    print('#####'*10)
    
    # 打印程序员之禅
    print(this)

    print('#####'*10)
    # 使用海龟绘图
    turtle.pensize(8)
    turtle.pencolor('deepskyblue')

    turtle.forward(100)
    turtle.right(90)
    turtle.forward(100)
    turtle.right(90)
    turtle.forward(100)
    turtle.right(90)
    turtle.forward(100)

    turtle.mainloop()

    # 定义变量
    a,b,c,d,e = 100, 3.14, 1+5j, "hello", True
    print(type(a))
    print(type(b))
    print(type(c))
    print(type(d))
    print(type(e))

    num1 = int(input('num1 = '))
    num2 = int(input('num2 = '))
    print('%d + %d = %d' % (num1, num2, num1 + num2))
