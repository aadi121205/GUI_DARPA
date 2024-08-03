gnome-terminal -- bash -c "cd; sim_vehicle.py -v ArduCopter -L DTU -I 0 --out=udp:127.0.0.1:14550; exec bash"
sleep 5  # Small delay to avoid race conditions
gnome-terminal -- bash -c "cd; sim_vehicle.py -v Rover -L DTU2 -I 1 --out=udp:127.0.0.1:14552; exec bash"