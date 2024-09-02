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

if [ ! -f "$PWD/Python/mock_server.py" ]; then
    echo "Error: mock_server.py not found in the Python directory."
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

read -p "Do you want to run the script in Testing mode? (y/n): " testing

if [[ "$testing" == "y" || "$testing" == "Y" ]]; then
    echo "Running the script in Testing mode..."
else
    echo "Running the script in Production mode..."
fi


if [[ "$testing" == "y" || "$testing" == "Y" ]]; then
    # Run the testing script
    echo "Running the testing script..."
    echo "Please wait for a few seconds..."

    # Start a new tmux session named "mySession"
    tmux new-session -d -s mySession

    # Pane 1: Run sitl.sh
    tmux send-keys -t mySession "cd && source sitl.sh" C-m
    sleep 2

    # Split Pane 1 vertically to create Pane 2: Run sitlr.sh
    tmux split-window -v -t mySession
    tmux send-keys -t mySession "cd && source sitlr.sh" C-m
    sleep 2

    # Split Pane 1 horizontally to create Pane 3: Run mock_server.py
    tmux split-window -h -t 0
    tmux send-keys -t mySession "cd Python && python3 mock_server.py" C-m
    sleep 2

    # Split Pane 2 horizontally to create Pane 4: Run npm run dev -- --host in front directory
    tmux split-window -h -t 2
    tmux send-keys -t mySession "cd front && npm run dev -- --host" C-m
    sleep 2

    # Select Pane 3 and split it vertically to create Pane 5: Run npm run start in back directory
    tmux select-pane -t 1
    tmux split-window -h -t 2
    tmux send-keys -t mySession "cd back && npm run start" C-m
    sleep 2

    # Select Pane 4 and split it vertically to create Pane 6: Run main.py in Python directory
    tmux select-pane -t 3
    tmux split-window -h -t 0
    tmux send-keys -t mySession "cd Python && python3 main.py" C-m
    sleep 2

    if [[ "$background" == "y" || "$background" == "Y" ]]; then
        tmux detach -s mySession
    else
        tmux attach -t mySession
    fi
    exit 0


else
    echo "Starting the tmux session..."
    echo "Please wait for a few seconds..."

    # Start a new tmux session named "mySession"
    tmux new-session -d -s mySession

    # Pane 1: Run npm run dev -- --host in front directory
    tmux send-keys -t mySession "cd front && npm run dev -- --host" C-m
    sleep 2

    # Split Pane 1 vertically to create Pane 2: Run npm run start in back directory
    tmux split-window -h -t mySession
    tmux send-keys -t mySession "cd back && npm run start" C-m
    sleep 2

    # Split Pane 2 vertically to create Pane 3: Run main.py in Python directory
    tmux split-window -h -t mySession
    tmux send-keys -t mySession "cd Python && python3 main.py" C-m
    sleep 2

    if [[ "$background" == "y" || "$background" == "Y" ]]; then
        tmux detach -s mySession
    else
        tmux attach -t mySession
    fi
    exit 0
fi
