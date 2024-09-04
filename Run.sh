#!/bin/bash


# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if tmux is installed
if ! command_exists tmux; then
    echo "Error: tmux is not installed. Please install tmux and try again."
    exit 1
fi

# Check if bash is available (should be by default on most systems)
if ! command_exists bash; then
    echo "Error: bash is not installed. Please install bash and try again."
    exit 1
fi

# Check if the required files or directories exist
if [ ! -f "$HOME/sitl.sh" ]; then
    echo "Error: sitl.sh not found in the home directory."
    exit 1
fi

if [ ! -f "$HOME/sitlr.sh" ]; then
    echo "Error: sitlr.sh not found in the home directory."
    exit 1
fi

if [ ! -d "$PWD/Python" ]; then
    echo "Error: Python directory not found in the current directory."
    exit 1
fi

if [ ! -d "$PWD/front" ]; then
    echo "Error: front directory not found in the current directory."
    exit 1
fi

if [ ! -d "$PWD/back" ]; then
    echo "Error: back directory not found in the current directory."
    exit 1
fi

# Prompt the user to continue or not
read -p "All prerequisites are met. Do you want to continue? (y/n): " choice

if [[ "$choice" != "y" && "$choice" != "Y" ]]; then
    echo "Aborting the script."
    exit 0
fi
read -p "Do you want to run the script in the background? (y/n): " background

if [[ "$background" == "y" || "$background" == "Y" ]]; then
    echo "Running the script in the background..."
else
    echo "Running the script in the foreground..."
fi

# Name of the tmux session
SESSION_NAME="mySession"

# Create a new tmux session
tmux new-session -d -s $SESSION_NAME

# Split the window into a 2x2 grid
tmux split-window -h    # Split the first pane horizontally
tmux send-keys -t mySession "cd back && npm run start" C-m
sleep 1
tmux split-window -v    # Split the left pane vertically
tmux send-keys -t mySession "cd front && npm run dev -- --host" C-m
sleep 1
tmux select-pane -t 0   # Select the top-right pane
tmux send-keys -t mySession "cd Python/UAV_GCS/ && python3 main.py" C-m
sleep 1
tmux split-window -v    # Split the top-right pane vertically
tmux send-keys -t mySession "cd Python/UGV_GCS/ && python3 main.py" C-m

# Select the first pane (top-left)
tmux select-pane -t 0

# Attach to the session
if [[ "$background" == "y" || "$background" == "Y" ]]; then
    tmux detach -s $SESSION_NAME
else
    tmux attach-session -t $SESSION_NAME
fi
