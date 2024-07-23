from dronekit import connect, VehicleMode, LocationGlobalRelative
import time
import math
import threading

# Connect to the vehicle
vehicle = connect('127.0.0.1:14552', wait_ready=True)

waypoints = [
    LocationGlobalRelative(28.75388100595015, 77.11552573884727, 0),
    LocationGlobalRelative(28.753797144981764, 77.11585444715492, 0),
    LocationGlobalRelative(28.75349524493797, 77.11585096876011, 0),
    LocationGlobalRelative(28.753383938135936, 77.11560226353265, 0)
]

def get_distance_metres(aLocation1, aLocation2):
    dlat = aLocation2.lat - aLocation1.lat
    dlong = aLocation2.lon - aLocation1.lon
    return math.sqrt((dlat*dlat) + (dlong*dlong)) * 1.113195e5

proximity_threshold = 2  # Adjusted for ground vehicle

def arm_and_start():
    """
    Arms the vehicle and starts it in GUIDED mode.
    """
    print("Basic pre-arm checks")
    while not vehicle.is_armable:
        print(" Waiting for vehicle to initialise...")
        time.sleep(1)

    print("Arming motors")
    vehicle.mode = VehicleMode("GUIDED")
    vehicle.armed = True

    while not vehicle.armed:
        print(" Waiting for arming...")
        time.sleep(1)

    print("Vehicle armed and in GUIDED mode")

def monitor_proximity():
    while waypoints:
        current_location = vehicle.location.global_relative_frame
        target_location = waypoints[0]

        distance_to_waypoint = get_distance_metres(current_location, target_location)
        print(f"Distance to waypoint 0: {distance_to_waypoint:.2f} meters")

        if distance_to_waypoint < proximity_threshold:
            print(f"Reached waypoint 0")
            waypoints.pop(0)

            if waypoints:
                vehicle.simple_goto(waypoints[0])
            else:
                print("All waypoints reached!")
                break

        time.sleep(1)

def set_next_waypoint():
    if waypoints:
        vehicle.simple_goto(waypoints[0])
        print(f"Setting next waypoint: 0")
    else:
        print("No more waypoints to set.")

proximity_thread = threading.Thread(target=monitor_proximity)
proximity_thread.daemon = True  # Ensure thread closes on script exit
proximity_thread.start()

def mode_change_handler(vehicle, attr_name, value):
    print(f"Mode changed to: {value}")

    if value == 'GUIDED' and waypoints:
        set_next_waypoint()

vehicle.add_attribute_listener('mode', mode_change_handler)

# Arm and start the vehicle
arm_and_start()

# Start with the first waypoint
vehicle.simple_goto(waypoints[0])

# Main loop
while True:
    # Check for other tasks or conditions if needed
    time.sleep(1)
