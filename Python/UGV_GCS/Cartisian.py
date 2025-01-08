import numpy as np
import matplotlib.pyplot as plt

# Function to convert lat/lon to Cartesian coordinates (x, y) in meters
def latlon_to_cartesian(lat, lon, lat_origin, lon_origin):
    # Approximate Earth radius in kilometers (mean radius)
    R = 6371.0 * 1000  # Convert radius to meters
    
    # Convert lat/lon from degrees to radians
    lat = np.radians(lat)
    lon = np.radians(lon)
    lat_origin = np.radians(lat_origin)
    lon_origin = np.radians(lon_origin)
    
    # Calculate differences
    delta_lat = lat - lat_origin
    delta_lon = lon - lon_origin
    
    # Vectorized x and y coordinate calculations in meters
    x = R * delta_lon * np.cos(lat_origin)  # Lon distance (in meters)
    y = R * delta_lat  # Lat distance (in meters)
    
    return x, y

def cartesian_to_latlon(x, y, lat_origin, lon_origin):
    # Approximate Earth radius in kilometers (mean radius)
    R = 6371.0 * 1000  # Convert radius to meters
    
    # Convert lat/lon from degrees to radians
    lat_origin = np.radians(lat_origin)
    lon_origin = np.radians(lon_origin)
    
    # Vectorized lat and lon calculations in degrees
    lat = np.degrees(y / R) + lat_origin
    lon = np.degrees(x / (R * np.cos(lat_origin))) + lon_origin

def cart():

    # Load waypoints from file into numpy arrays
    waypoints = np.loadtxt('waypoints.txt', delimiter=',')
    lats, lons = waypoints[:, 0], waypoints[:, 1]

    # Origin point (can be adjusted)
    lat_origin = 28.75342705639587
    lon_origin = 77.11610768049533

    # Convert lat/lon to Cartesian coordinates using vectorization (in meters)
    x_coords, y_coords = latlon_to_cartesian(lats, lons, lat_origin, lon_origin)


    with open('waypoints_flat.txt', 'w') as f:
        for x, y in zip(x_coords, y_coords):
            f.write(f'{x}, {y}\n')

def latlong():
    # Load waypoints from file into numpy arrays
    waypoints = np.loadtxt('waypoints_flat.txt', delimiter=',')
    x_coords, y_coords = waypoints[:, 0], waypoints[:, 1]

    # Origin point (can be adjusted)
    lat_origin = 28.75342705639587
    lon_origin = 77.11610768049533

    # Convert Cartesian coordinates to lat/lon using vectorization (in degrees)
    lats, lons = cartesian_to_latlon(x_coords, y_coords, lat_origin, lon_origin)

    with open('waypoints_latlon.txt', 'w') as f:
        for lat, lon in zip(lats, lons):
            f.write(f'{lat}, {lon}\n')


cart()