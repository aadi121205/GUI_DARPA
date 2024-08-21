import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './style.css'; // Import your CSS file

function MyDropdown2() {
  // State to keep track of the selected item
  const [selectedItem, setSelectedItem] = useState('UAV');

  // Function to handle item selection
  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle className="full-width-dropdown" variant="secondary" id="dropdown-basic">
        {selectedItem}
      </Dropdown.Toggle>

      <Dropdown.Menu className="full-width-menu">
        <Dropdown.Item eventKey="UAV" className='fs-4 custom-one custom-dropdown-item'>UAV</Dropdown.Item>
        <Dropdown.Item eventKey="ROVER 1" className='fs-4 custom-two custom-dropdown-item'>ROVER 1</Dropdown.Item>
        <Dropdown.Item eventKey="ROVER 2" className='fs-4 custom-one custom-dropdown-item'>ROVER 2</Dropdown.Item>
        <Dropdown.Item eventKey="ROVER 3" className='fs-4 custom-two custom-dropdown-item'>ROVER 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MyDropdown2;
