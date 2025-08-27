import React, { useContext, memo } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { sortOptionDataArray } from "constants/sortOptions";
import { MovieFilterContext } from "context/MovieFilterContext";
import SectionWrapper from "../SectionWrapper";
import "./SortSelector.css";

const SortSelector = ({ pageTitle, noFilter }) => {
  const { filterState, dispatch } = useContext(MovieFilterContext);
  const { sortOption } = filterState;

  const handleSortSelect = (eventKey) => {
    dispatch({ type: "SET_SORT", payload: { selectedSortOption: eventKey } });
  };

  return (
    <SectionWrapper
      sectionProps={{ className: "sort-selector" }}
      rowProps={{ className: "mb-4" }}
      colProps={{ xs: "12", className: "d-flex align-items-center" }}
    >
      <h1 className="m-0 me-4">{pageTitle}</h1>
      {noFilter || (
        <div className="custom-dropdown">
          <DropdownButton
            size="sm"
            variant="outline-primary"
            id="dropdown-basic-button"
            title={
              sortOptionDataArray.filter(
                (sortOptionData) => sortOptionData.value === sortOption
              )[0].name
            }
            onSelect={handleSortSelect}
          >
            {sortOptionDataArray.map((sortOptionData) => {
              return (
                <Dropdown.Item
                  key={sortOptionData.value}
                  eventKey={sortOptionData.value}
                  disabled={sortOptionData.value === sortOption}
                >
                  {sortOptionData.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      )}
    </SectionWrapper>
  );
};

export default memo(SortSelector);
