# Multi-UAV/UGV Control GUI

This project is a graphical user interface (GUI) built with React and Vite. It is designed to control and monitor multiple Unmanned Aerial Vehicles (UAVs) and Unmanned Ground Vehicles (UGVs) using DroneKit and Socket.io. The system is developed specifically for the DARPA Triage Challenge, enabling real-time control and data visualization of multiple drones and ground robots.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time control**: Send commands to multiple UAVs and UGVs simultaneously.
- **Live data visualization**: Monitor telemetry data from each vehicle.
- **Mission planning**: Define and upload missions to the UAVs and UGVs.
- **Socket.io integration**: Seamless communication between the frontend and backend.
- **Responsive UI**: Accessible from various devices.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **Yarn** (v1.22 or later)
- **Python** (v3.7 or later) with DroneKit installed
- **Socket.io** backend server setup

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/multi-uav-ugv-control-gui.git
   cd multi-uav-ugv-control-gui
