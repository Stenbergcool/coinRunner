import numpy as np


class coinMaker:
    def func():
        coords = np.random.rand(10000, 2) * 2
        return coords

class Coins:

    def __init__(self, lat, long, city, worth = 10):
        self.latitude = lat
        self.longitute = long
        self.worth = worth
        self.city = city

p1 = coinMaker
print(p1.func())

coin = Coins(123, 321, "stockholm")

print(coin.latitude)