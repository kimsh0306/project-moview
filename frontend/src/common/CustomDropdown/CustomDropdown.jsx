import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./CustomDropdown.css";

const CustomDropdown = ({ selectedItem, setSelectedItem, itemData }) => {
  const handleOnSelect = (eventKey) => {
    setSelectedItem(eventKey);
  };
  return (
    <div className="custom-dropdown">
      <DropdownButton
        size="sm"
        variant="outline-primary"
        id="dropdown-basic-button"
        title={itemData.filter((item) => item.value === selectedItem)[0].name}
        onSelect={handleOnSelect}
      >
        {itemData.map((item) => {
          return (
            <Dropdown.Item
              key={item.value}
              eventKey={item.value}
              disabled={item.value === selectedItem}
            >
              {item.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
};

export default CustomDropdown;
