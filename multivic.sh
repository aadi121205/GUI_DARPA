#!/bin/bash

. ~/.profile

# Function to start a SITL instance
start_sitl_instance() {
    local instance_id=$1
    local port=$((5760 + instance_id * 10))
    local instance_dir="instance_$instance_id"

    # Create a separate directory for each instance
    mkdir -p $instance_dir
    cd $instance_dir

    # Start the SITL instance
    sim_vehicle.py -v ArduCopter -I$instance_id --out=udp:127.0.0.1:$port &

    # Return to the base directory
    cd ..
}

# Number of instances to start
num_instances=3

# Start SITL instances
for ((i=0; i<$num_instances; i++)); do
    start_sitl_instance $i
    sleep 5  # Small delay to avoid race conditions
done

echo "Started $num_instances SITL instances."

# Optionally, start MAVProxy for each instance
start_mavproxy_instance() {
    local instance_id=$1
    local port=$((5760 + instance_id * 10))
    local instance_dir="instance_$instance_id"

    cd $instance_dir

    # Start MAVProxy instance
    mavproxy.py --master=udp:127.0.0.1:$port &

    cd ..
}

for ((i=0; i<$num_instances; i++)); do
    start_mavproxy_instance $i
    sleep 5  # Small delay to avoid race conditions
done

echo "Started MAVProxy instances for $num_instances SITL instances."
