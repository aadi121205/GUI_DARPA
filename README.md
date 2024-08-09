Here's the corrected version with everything in code format:

```markdown
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
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Configure the environment:**

   Create a `.env` file in the root directory and add your configurations (e.g., API endpoints, Socket.io server URL).

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

   The app will be available at `http://localhost:3000`.

## Usage

1. **Connect to UAV/UGV Systems:**

   Ensure that your UAVs and UGVs are powered on and connected to the network. The GUI will automatically detect and connect to the vehicles through the Socket.io server.

2. **Control Vehicles:**

   - Use the interface to send commands (e.g., takeoff, land, move) to individual or multiple vehicles.
   - Monitor telemetry data such as GPS coordinates, altitude, battery level, and more.

3. **Mission Planning:**

   - Create and upload missions to the UAVs and UGVs.
   - Monitor mission progress in real-time.

## Project Structure

```plaintext
multi-uav-ugv-control-gui/
│
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Application pages
│   ├── services/          # API services and Socket.io integration
│   ├── styles/            # Global and component-specific styles
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
│
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
└── vite.config.js         # Vite configuration
```

## Configuration

- **Socket.io Server URL**: Update the `.env` file with the URL of your Socket.io server.
- **API Endpoints**: Configure any necessary API endpoints in the `.env` file or in the `services` folder.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Now, all the steps after `cd multi-uav-ugv-control-gui` are properly formatted as code.