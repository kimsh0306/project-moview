import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./CustomDropdown.style.css";

const sortTypeList = [
  { value: "none", name: "none" },
  { value: "popularity", name: "popularity" },
  { value: "vote_count", name: "vote count" },
  { value: "vote_average", name: "vote average" },
];

const CustomDropdown = ({ sort, setSort }) => {
  const handleSortChange = (eventKey) => {
    setSort(eventKey);
  };
  return (
    <div className="custom-dropdown">
      <DropdownButton
        id="dropdown-basic-button"
        title={sort ? sort : "Sort"}
        onSelect={handleSortChange}
      >
        {sortTypeList.map((type, idx) => {
          return (
            <Dropdown.Item
              key={`${type.value}-${idx}`}
              eventKey={type.value}
              value={type.value}
              disabled={
                type.value === "none"
                  ? sort === type.value || sort === ""
                  : sort === type.value
              }
            >
              {type.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
};

export default CustomDropdown;
