import numpy as np


class coinMaker:
    def func():
        coords = np.random.rand(10000, 2) * 2
        return coords

p1 = coinMaker
print(p1.func())