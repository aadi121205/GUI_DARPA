# Multi-UAV/UGV Control GUI

This project is a graphical user interface (GUI) built with React and Vite. It is designed to control and monitor multiple Unmanned Aerial Vehicles (UAVs) and Unmanned Ground Vehicles (UGVs) using DroneKit and Socket.io. The system is developed specifically for the DARPA Triage Challenge (https://triagechallenge.darpa.mil/), enabling real-time control and data visualization of multiple drones and ground robots.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contributors](#contributors)

## Features

- **Real-time control**: Send commands to multiple UAVs and UGVs simultaneously.
- **Live data visualization**: Monitor telemetry data from each vehicle.
- **Mission planning**: Define and upload missions to the UAVs and UGVs.
- **Socket.io integration**: Seamless communication between the frontend and backend.
- **Responsive UI**: Accessible from various devices.

![Gui IMG](file:///home/aadi/Pictures/Screenshots/Screenshot%20from%202024-08-09%2023-50-07.png)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later)
- **npm** (v9 or later) or **Yarn** (v1.22 or later)
- **Python** (v3.8 or later) with DroneKit installed
- **SITL** (Optional) for testing before deployment
- **Socket.io** backend server setup

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aadi121205/GUI_DARPA.git
   cd GUI_DARPA
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   cd front
   npm install
   cd ..
   cd back
   npm install
   ```

   Or using Yarn:

   ```bash
   cd front
   yarn install
   cd ..
   cd back
   yarn install
   ```

   For Python:

   ```bash
   # Step 1: Create the Conda environment with Python 3.10
   conda create --name myenv python=3.10

   # Step 2: Activate the environment
   conda activate myenv

   # Step 3: Install dependencies from requirements.txt
   pip install -r requirements.txt

   ```

3. **Configure the environment:**

   change the `.env` files in the Python and back directory and add your configurations to front/src/config.jsx (e.g., API endpoints, Socket.io server URL).

4. **Start the development server:**

   ```bash
   cd front
   npm run dev
   ```

   ```bash
   cd back
   npm run start
   ```

   ```bash
   cd Python
   Python main.py
   ```

   The app will be available at `http://localhost:5173/`.

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
GUI_DARPA/
├── .gitignore
├── back/
│   ├── .env
│   ├── data.json
│   ├── index.js
│   ├── package.json
│
├── front/
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── public/                # Static assets
│   └── src/
│       ├── App.css
│       ├── App.jsx            # Main app component
│       ├── assets/            # Images, icons, etc.
│       ├── Comps/
│       ├── config.jsx
│       ├── context/
│       ├── data/
│       ├── index.css
│       └── main.jsx           # Entry point
│   ├── vite.config.js         # Vite configuration
│
├── Python/
│   ├── .env
│   ├── config/
│   │   ├── coordinates.txt
│   │   ├── mission.txt
│   │   ├── waypoints.txt
│   ├── image_capture.py
│   ├── main.py
│   ├── mission_rover.txt
│   ├── socket_client.py
│   ├── UAV.py
│   ├── UGV.py
│   ├── UGV2.py
│   ├── UGV3.py
│   ├── waypoints.txt
│   └── waypointsr.txt
│
├── README.md
│
├── gitpush.sh
│
├── requirements.txt
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

## Contributors

- **[Aaditya Bhatia](https://github.com/aadi121205)** - [GitHub](https://github.com/aadi121205) | [LinkedIn](https://www.linkedin.com/in/aaditya-bhatia-170b76187/) | [Instgarm](https://www.instagram.com/aaadi_b/)
- **[Contributor Name 2](https://github.com/username2)** - [GitHub](https://github.com/username2) | [LinkedIn](https://www.linkedin.com/in/username2)
- **[Contributor Name 3](https://github.com/username3)** - [GitHub](https://github.com/username3) | [LinkedIn](https://www.linkedin.com/in/username3)
