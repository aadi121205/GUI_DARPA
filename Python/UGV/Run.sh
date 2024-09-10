#!/bin/bash

echo "This may take a few seconds. Please wait..."

# Name of the tmux session
SESSION_NAME="uav"

# Create a new tmux session
tmux new-session -d -s $SESSION_NAME

tmux send-keys -t $SESSION_NAME "python3 main.py" C-m
sleep 1

tmux attach-session -t $SESSION_NAME
