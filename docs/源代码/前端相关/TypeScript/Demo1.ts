// 类装饰器

// 类装饰器的类型描述如下: 
/* type ClassDecorator = (
    value: Function,
    context: {
      kind: 'class';
      name: string | undefined;
      addInitializer(initializer: () => void): void;
    }
) => Function | void; */
// 类装饰器接受两个参数：value（当前类本身）和context（上下文对象）。其中，context对象的kind属性固定为字符串class。

function Greeter(value, context) {
    if (context.kind === 'class') {
      value.prototype.greet = function () {
        console.log('你好');
      };
    }
}
@Greeter
class User{}

let u = new User()
u.greet()

function countInstances(value:any, context:any) {
    let instanceCount = 0;
  
    const wrapper = function (...args:any[]) {
      instanceCount++;
      const instance = new value(...args);
      instance.count = instanceCount;
      return instance;
    } as unknown as typeof MyClass;
  
    wrapper.prototype = value.prototype; // A
    return wrapper;
}

@countInstances
class MyClass {}

const inst1 = new MyClass();
inst1 instanceof MyClass // true
inst1.count // 1

// 上面示例中，类装饰器@countInstances返回一个函数，替换了类MyClass的构造方法。
// 新的构造方法实现了实例的计数，每新建一个实例，计数器就会加一，并且对实例添加count属性，表示当前实例的编号。
