import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const fitAddon = new FitAddon();

  useEffect(() => {
    const terminal = new Terminal();
    terminal.loadAddon(fitAddon);

    terminal.open(terminalRef.current);
    fitAddon.fit();

    terminal.write('Welcome to the React Terminal!\r\n');
    terminal.write('$ ');

    terminal.onKey(({ key, domEvent }) => {
      const char = key;
      const printable = (
        !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey
      );

      if (domEvent.keyCode === 13) { // Enter
        terminal.write('\r\n$ ');
      } else if (domEvent.keyCode === 8) { // Backspace
        if (terminal._core.buffer.x > 2) {
          terminal.write('\b \b');
        }
      } else if (printable) {
        terminal.write(char);
      }
    });

    // Cleanup
    return () => {
      terminal.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalComponent;
