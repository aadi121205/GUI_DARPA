from dronekit import connect,VehicleMode,Command,LocationGlobalRelative, APIException

import time

Vehicle = connect('127.0.0.1:14550',wait_ready=True)
""" 
def arm_and_takeoff(aTargetAltitude):
    while not Vehicle.is_armable:
        print(" Waiting for vehicle to initialise...")
        time.sleep(1)
        
    print("Arming motors")
    Vehicle.mode = VehicleMode("GUIDED")
    Vehicle.armed = True
    
    while not Vehicle.armed:
        print(" Waiting for arming...")
        time.sleep(1)
        
    print("Taking off!")
    Vehicle.simple_takeoff(aTargetAltitude)
    
    while True:
        print(" Altitude: ", Vehicle.location.global_relative_frame.alt)
        if Vehicle.location.global_relative_frame.alt >= aTargetAltitude*0.95:
            print("Reached target altitude")
            break
        time.sleep(1)

arm_and_takeoff(10)

while True:
    print(" Altitude: ", Vehicle.location.global_relative_frame.alt)
    if Vehicle.location.global_relative_frame.alt >= 9.5:
        print("Reached target altitude")
        break
    time.sleep(1)

print("Returning to Launch")
Vehicle.mode = VehicleMode("RTL") """

while True:
    print(" Altitude: ", Vehicle.location.global_relative_frame.alt)


Vehicle.close()
print("Completed")