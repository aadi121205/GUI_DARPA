#!/bin/bash

# Function to start a SITL instance in a new terminal
start_sitl_instance() {
    local vehicle=$1
    local instance_id=$2
    local port=$((5760 + instance_id * 10))
    local instance_dir="instance_${vehicle}_$instance_id"

    # Create a separate directory for each instance
    mkdir -p $instance_dir

    # Start the SITL instance in a new gnome-terminal window
    gnome-terminal -- bash -c "cd $instance_dir; sim_vehicle.py -v $vehicle -I$instance_id --out=udp:127.0.0.1:$port; exec bash"
}

# Start 3 instances of ArduRover
num_rover_instances=3
for ((i=0; i<$num_rover_instances; i++)); do
    start_sitl_instance "Rover" $i
    sleep 5  # Small delay to avoid race conditions
done

# Start 1 instance of ArduCopter
start_sitl_instance "ArduCopter" 100
sleep 5  # Small delay to avoid race conditions

echo "Started $num_rover_instances ArduRover instances and 1 ArduCopter instance in new terminals."

# Optionally, start MAVProxy for each instance in a new terminal
start_mavproxy_instance() {
    local vehicle=$1
    local instance_id=$2
    local port=$((5760 + instance_id * 10))
    local instance_dir="instance_${vehicle}_$instance_id"

    # Start MAVProxy instance in a new gnome-terminal window
    gnome-terminal -- bash -c "cd $instance_dir; mavproxy.py --master=udp:127.0.0.1:$port; exec bash"
}

# Start MAVProxy for ArduRover instances
for ((i=0; i<$num_rover_instances; i++)); do
    start_mavproxy_instance "ArduRover" $i
    sleep 5  # Small delay to avoid race conditions
done

# Start MAVProxy for ArduCopter instance
start_mavproxy_instance "ArduCopter" 100
sleep 5  # Small delay to avoid race conditions

echo "Started MAVProxy instances for ArduRover and ArduCopter in new terminals."
