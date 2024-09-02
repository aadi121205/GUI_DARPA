#!/bin/bash

# Prompt the user for the IP addresses and usernames
read -p "Enter the IP address of computer 1: " ip1
read -p "Enter the username for computer 1: " user1

read -p "Enter the IP address of computer 2: " ip2
read -p "Enter the username for computer 2: " user2

read -p "Enter the IP address of computer 3: " ip3
read -p "Enter the username for computer 3: " user3

read -p "Enter the IP address of computer 4: " ip4
read -p "Enter the username for computer 4: " user4


# Prompt the user to continue or not
read -p "All prerequisites are met. Do you want to continue? (y/n): " choice

if [[ "$choice" != "y" && "$choice" != "Y" ]]; then
    echo "Aborting the script."
    exit 0
fi

# Start a new tmux session named "sshSession"
tmux new-session -d -s sshSession

# Pane 1: SSH into the first computer with X11 forwarding
tmux send-keys -t sshSession "ssh -X ${user1}@${ip1}" C-m
sleep 2

# Split Pane 1 horizontally to create Pane 2: SSH into the second computer with X11 forwarding
tmux split-window -h -t sshSession
tmux send-keys -t sshSession "ssh -X ${user2}@${ip2}" C-m
sleep 2

# Split Pane 1 vertically to create Pane 3: SSH into the third computer with X11 forwarding
tmux select-pane -t 0
tmux split-window -v -t sshSession
tmux send-keys -t sshSession "ssh -X ${user3}@${ip3}" C-m
sleep 2

# Split Pane 2 vertically to create Pane 4: SSH into the fourth computer with X11 forwarding
tmux select-pane -t 1
tmux split-window -v -t sshSession
tmux send-keys -t sshSession "ssh -X ${user4}@${ip4}" C-m
sleep 2

# Attach to the tmux session
tmux attach-session -t sshSession
