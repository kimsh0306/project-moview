import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./CustomDropdown.style.css";

const sortTypeList = [
  { value: "none", name: "없음" },
  { value: "popularity", name: "인기 순" },
  { value: "vote_count", name: "투표 순" },
  { value: "vote_average", name: "투표 평균 순" },
];
const sortList = ["none", "popularity", "vote_count", "vote_average"];

const CustomDropdown = ({ sort, setSort }) => {
  const handleSortChange = (eventKey) => {
    setSort(eventKey);
  };
  return (
    <div className="custom-dropdown">
      <DropdownButton
        size="sm"
        variant="outline-primary"
        id="dropdown-basic-button"
        title={
          sort
            ? sortTypeList.map((type) => sort === type.value && type.name)
            : "정렬"
        }
        onSelect={handleSortChange}
      >
        {sortTypeList.map((type, idx) => {
          return (
            <Dropdown.Item
              key={`${type.value}-${idx}`}
              eventKey={type.value}
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
