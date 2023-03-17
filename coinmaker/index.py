import numpy as np
import geojson
import json
import random
from shapely.geometry import shape, Point



class coinMaker:
    """
    Fetches polygon shapes and randomly creates Latitude and Longitude for Coins
    """
    def create_points_in_polygon(geometry, num_points):
        points = []
        num_pints = num_points + 1
        values = [1] * int(num_pints * 0.85) + [5] * int(num_pints * 0.1) + [10] * int(num_pints * 0.05)
        random.shuffle(values)
        while len(points) < num_points:
            point = Point(geometry.bounds[0] + (geometry.bounds[2] - geometry.bounds[0]) * random.random(),
                        geometry.bounds[1] + (geometry.bounds[3] - geometry.bounds[1]) * random.random())
            if geometry.contains(point):
                point_obj = {'longitude': point.x, 'latitude': point.y, 'value': values.pop()}
                points.append(point_obj)
        # Convert points to a JSON array of objects
        point_objs = json.dumps(points)
        return point_objs
    def insert_into_database():
        with open('stockholm.geojson') as f:
            data = geojson.load(f)
            feature = data['features'][0]  # Access the first feature in the "features" array
            geometry = shape(feature['geometry'])
            print("hello")
            print(p1.create_points_in_polygon(geometry, 10))

p1 = coinMaker
p1.insert_into_database()