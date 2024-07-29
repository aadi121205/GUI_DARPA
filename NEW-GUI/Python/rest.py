from dronekit import connect, VehicleMode

# Define connection parameters
connection_string = '127.0.0.1:14552'

# Connect to the vehicle
print("Connecting to vehicle on: %s" % connection_string)
vehicle = connect(connection_string, wait_ready=True)

# Now you can interact with the vehicle
print("Connected to vehicle")

# Example: Change vehicle mode to GUIDED
vehicle.mode = VehicleMode("GUIDED")
print("Vehicle mode set to GUIDED")

# Close the vehicle object
vehicle.close()
print("Vehicle connection closed")
