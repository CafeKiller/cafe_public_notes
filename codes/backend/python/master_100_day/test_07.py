from random import randint
from threading import Thread, Lock
from time import sleep


class Account(object):

    def __init__(self, balance):
        self._balance = balance
        self._lock = Lock()

    def deposit(self, money):
        # 先获得锁, 才能执行后续代码
        self._lock.acquire()
        try:
            new_balance = self._balance + money
            # 随机暂停0 - 1秒
            # sleep(randint(0, 2))
            sleep(0.1)
            self._balance = new_balance
        finally:
            # 保证锁的释放
            self._lock.release()

    @property
    def balance(self):
        return self._balance


class AccountThread(Thread):

    def __init__(self, account: Account, money):
        super().__init__()
        self._account = account
        self._money = money

    def run(self):
        self._account.deposit(self._money)


def main():
    account = Account(0)
    threads = []
    for _ in range(100):
        t = AccountThread(account, 1)
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    print('当前账户余额: %d' % account.balance)


if __name__ == '__main__':
    main()
