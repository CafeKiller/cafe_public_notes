import random
from multiprocessing import Process
from os import getpid
from time import sleep, time


def download_task(filename):
    print('启动下载进程，进程号[%d].' % getpid())
    print('开始下载文件: [%s]' % filename)
    sleep_time = random.randint(5, 10)
    sleep(sleep_time)
    print('文件: [%s] 下载完成, 耗时: %ds' % (filename, sleep_time))


def main():
    start = time()

    # 单进程单线程
    # download_task('周杰伦纯情演唱教程.pdf')
    # download_task('纯白.avi')

    p1 = Process(target=download_task, args=('周杰伦纯情演唱教程.pdf', ))
    p1.start()
    p2 = Process(target=download_task, args=('纯白.avi', ))
    p2.start()

    p1.join()
    p2.join()

    print('全部下载完成, 总耗时: %ds' % (time() - start))


if __name__ == '__main__':
    main()
