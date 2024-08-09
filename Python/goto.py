from dronekit import connect, VehicleMode, LocationGlobalRelative, mavutil
import time
import math
from math import radians, cos, sin, asin, sqrt
# Connect to the Vehicle (in this case a simulator running the same computer)
vehicle = connect('localhost:3000', wait_ready=False)

def arm_and_takeoff(aTargetAltitude):
    print ("Basic pre-arm checks")
    # Don't try to arm until autopilot is ready
    while not vehicle.is_armable:
    #    print (" Waiting for vehicle to initialise...")
        time.sleep(1)
    print ("Arming motors")
    # Copter should arm in GUIDED mode
    vehicle.mode    = VehicleMode("GUIDED")
    vehicle.armed   = True
    # Confirm vehicle armed before attempting to take off
    while not vehicle.armed:
    #    print (" Waiting for arming...")
        time.sleep(1)
    print ("Taking off!")
    vehicle.simple_takeoff(aTargetAltitude) # Take off to target altitude
    # Wait until the vehicle reaches a safe height before processing the goto (otherwise the command after Vehicle.simple_takeoff will execute immediately).
    while True:
    #    print (" Altitude: ", vehicle.location.global_relative_frame.alt)
        #Break and return from function just below target altitude.
        if vehicle.location.global_relative_frame.alt>=aTargetAltitude*0.95:
            #print ("Reached target altitude")
            break
        time.sleep(1)
# arm_and_takeoff(15)
vehicle.airspeed=2
Lat = [28.75342135930803, 28.753677988787025, 28.753652849600638, 28.753402504872454, 28.75342135930803]
Lon = [77.11599921500824, 77.11605298048387, 77.11619993945058, 77.11615214791668, 77.11599921500824]
alt = 10

def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    a = sin((lat2-lat1)/2)**2 + cos(lat1) * cos(lat2) * sin((lon2-lon1)/2)**2
    c = 2 * asin(sqrt(a))
    return c * 6371 * 1000
    
def travel(lon, lat, alt):
    d = haversine(vehicle.location.global_relative_frame.lon, vehicle.location.global_relative_frame.lat, lon, lat)
    vehicle.simple_goto(LocationGlobalRelative(lat, lon, alt))
    while d>2:
        d = haversine(vehicle.location.global_relative_frame.lon, vehicle.location.global_relative_frame.lat, lon, lat)
        print(d)
        time.sleep(1)

for c in range(len(Lat)):
    travel(Lon[c], Lat[c], alt)
    time.sleep(3)
    
vehicle.mode =  VehicleMode("RTL")