import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import MapTelemetry from './Comps/map';
import { Row, Col, Card } from 'react-bootstrap';

// Update the URL to match your server's address and port.
// If you're using a self-signed certificate in development,
// you might need additional configuration.
const SOCKET_URL = 'https://localhost:7000/react';

const App: React.FC = () => {
  const [telemetry, setTelemetry] = useState<any>(null);

  useEffect(() => {
    // Initialize the socket connection for the /react namespace
    const socket: Socket = io(SOCKET_URL, {
      transports: ['websocket'],
      secure: true,
      // The following option might be needed if you use a self-signed certificate:
      rejectUnauthorized: false,
    });

    socket.on('connect', () => {
      console.log('Connected to React namespace');
    });

    // Listen for telemetry data forwarded from the server
    socket.on('TelemFowarding', (data) => {
      console.log('Received telemetry data:', data);
      setTelemetry(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
      <Row style={{ padding: '20px', width: '2400px'}} >
        <Col>
          <Card >
            <Card.Header>
              <Card.Title>Telemetry Data</Card.Title>
            </Card.Header>
            <Card.Body>
              <pre>{JSON.stringify(telemetry, null, 2)}</pre>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <MapTelemetry />
        </Col>
      </Row>
  );
};

export default App;
