#!/bin/bash

# Function to start a SITL instance in a new terminal
start_sitl_instance() {
    local instance_id=$1
    local port=$((5760 + instance_id * 10))
    local instance_dir="instance_$instance_id"

    # Create a separate directory for each instance
    mkdir -p $instance_dir

    # Start the SITL instance in a new gnome-terminal window
    gnome-terminal -- bash -c "cd $instance_dir; sim_vehicle.py -v ArduCopter -I$instance_id --out=udp:127.0.0.1:$port; exec bash"
}

# Number of instances to start
num_instances=3

# Start SITL instances
for ((i=0; i<$num_instances; i++)); do
    start_sitl_instance $i
    sleep 5  # Small delay to avoid race conditions
done

echo "Started $num_instances SITL instances in new terminals."

# Optionally, start MAVProxy for each instance in a new terminal
start_mavproxy_instance() {
    local instance_id=$1
    local port=$((5760 + instance_id * 10))
    local instance_dir="instance_$instance_id"

    # Start MAVProxy instance in a new gnome-terminal window
    gnome-terminal -- bash -c "cd $instance_dir; mavproxy.py --master=udp:127.0.0.1:$port; exec bash"
}

for ((i=0; i<$num_instances; i++)); do
    start_mavproxy_instance $i
    sleep 5  # Small delay to avoid race conditions
done

echo "Started MAVProxy instances for $num_instances SITL instances in new terminals."
