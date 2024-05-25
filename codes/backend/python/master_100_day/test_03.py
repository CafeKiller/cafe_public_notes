from time import time, localtime, sleep
class Clock(object):
    """数字时钟"""
    def __init__(self, hour=0, minute=0, second=0):
        self._hour = hour
        self._minute = minute
        self._second = second
    @classmethod
    def now(cls):
        ctime = localtime(time())
        return cls(ctime.tm_hour, ctime.tm_min, ctime.tm_sec)
    def run(self):
        """走字"""
        self._second += 1
        if self._second == 60:
            self._second = 0
            self._minute += 1
            if self._minute == 60:
                self._minute = 0
                self._hour += 1
                if self._hour == 24:
                    self._hour = 0
    def show(self):
        """显示时间"""
        return '%02d:%02d:%02d' % \
               (self._hour, self._minute, self._second)
    

class Student:
    __slots__ = ['_name', '_age', '_gender']

    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def age(self):
        return self._age

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        self._name = name

    def say(self):
        print('我是%s, 今年%d岁了' % (self._name, self._age))


def main():
    student1 = Student("张三", 13)
    print('我是%s, 今年%d岁了' % (student1.name, student1.age))

    student1.name = '李四'
    student1.say()
    student1._gender = '男'
    # student1._happy = ['唱', '跳', 'rap'] # 此处会报错

    # 通过类方法创建对象并获取系统时间
    clock = Clock.now()
    while True:
        print(clock.show())
        sleep(1)
        clock.run()


if __name__ == '__main__':
    main()
