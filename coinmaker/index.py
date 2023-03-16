import numpy as np
import geojson
import random
from shapely.geometry import shape, Point



class coinMaker:
    """
    Fetches polygon shapes and randomly creates Latitude and Longitude for Coins
    """
    def func(geometry, num_points):
        points = []
        while len(points) < num_points:
            point = Point(geometry.bounds[0] + (geometry.bounds[2] - geometry.bounds[0]) * random.random(),
                        geometry.bounds[1] + (geometry.bounds[3] - geometry.bounds[1]) * random.random())
            if geometry.contains(point):
                points.append(point)
        return points

class Coin:
    """
    coin class, contain latitude longitude for markers on map.
    also worth of coin and city it is in
    """
    def __init__(self, lat, long, city, worth = 10):
        self.latitude = lat
        self.longitute = long
        self.worth = worth
        self.city = city

p1 = coinMaker
with open('stockholm.geojson') as f:
        data = geojson.load(f)
        feature = data['features'][0]  # Access the first feature in the "features" array
        geometry = shape(feature['geometry'])
        print(p1.func(geometry, 1000))

coin = Coin(123, 321, "stockholm")

print(coin.latitude)