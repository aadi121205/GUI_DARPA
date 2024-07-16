mkdir siltsim
cd  siltsim

rm -rf uav
rm -rf r1
rm -rf r2
rm -rf r3

mkdir uav
mkdir r1
gnome-terminal -- bash -c "cd uav; sim_vehicle.py -v ArduCopter -L DTU -I 0 --out=udp:127.0.0.1:14550; exec bash"
sleep 5  # Small delay to avoid race conditions
gnome-terminal -- bash -c "cd r1; sim_vehicle.py -v Rover -L DTU2 -I 1 --out=udp:127.0.0.1:14552; exec bash"

