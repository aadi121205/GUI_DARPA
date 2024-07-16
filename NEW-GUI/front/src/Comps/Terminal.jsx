// src/components/GenomeTerminal.js
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const GenomeTerminal = () => {
  const terminalRef = useRef(null);
  const terminal = useRef(null);
  const fitAddon = new FitAddon();

  useEffect(() => {
    terminal.current = new Terminal();
    terminal.current.loadAddon(fitAddon);
    terminal.current.open(terminalRef.current);
    fitAddon.fit();

    terminal.current.writeln('Welcome to Genome Terminal');
    terminal.current.writeln('Type your commands below:');
    
    // Handle user input
    terminal.current.onKey(({ key, domEvent }) => {
      if (domEvent.keyCode === 13) { // Enter key
        terminal.current.writeln('');
        // Add logic to handle the command
        // Example: terminal.current.writeln(`You typed: ${command}`);
      } else {
        // Append key to the command
      }
    });

    return () => {
      terminal.current.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ width: '100%', height: '100vh' }} />;
};

export default GenomeTerminal;
