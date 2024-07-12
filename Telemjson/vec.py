from dronekit import connect, VehicleMode
import time
import json
import argparse
import sys

# Parse command line arguments

parser = argparse.ArgumentParser(description='Send telemetry data to a JSON file')

parser.add_argument('--connect', default='127.0.0.1:14450', help="Vehicle connection target. Default")
parser.add_argument('--output', default='telem.json', help="Output file")

args = parser.parse_args()

# Connect to the Vehicle

print("Connecting to vehicle on: %s" % args.connect)

vehicle = connect(args.connect, wait_ready=True)

# Open the output file

with open(args.output, 'w') as f:
        # Add a listener to the vehicle for changes in telemetry data
    
        def location_callback(self, attr_name, value):
            data = {
                'time': time.time(),
                'mode': vehicle.mode.name,
                'armed': vehicle.armed,
                'lat': vehicle.location.global_frame.lat,
                'lon': vehicle.location.global_frame.lon,
                'alt': vehicle.location.global_frame.alt
            }
            f.write(json.dumps(data) + '\n')
    
        vehicle.add_attribute_listener('location.global_frame', location_callback)
    
        # Wait for the user to exit
    
        while True:
            try:
                time.sleep(1)
            except KeyboardInterrupt:
                break