import React, { useContext, memo } from "react";
import { DropdownButton, Dropdown, Col, Row } from "react-bootstrap";
import { sortOptionDataList } from "constants/sortOptions";
import { MovieFilterContext } from "context/MovieFilterContext";
import "./SortSelector.css";

const SortSelector = ({ pageTitle }) => {
  const { filterState, dispatch } = useContext(MovieFilterContext);
  const { sortOption } = filterState;

  const handleSortSelect = (eventKey) => {
    dispatch({ type: "SET_SORT", payload: { selectedSortOption: eventKey } });
  };

  return (
    <section className="sort-selector">
      <Row className="mb-4">
        <Col xs="12" className="d-flex align-items-center">
          <h1 className="m-0 me-4">{pageTitle}</h1>
          <DropdownButton
            size="sm"
            variant="outline-primary"
            title={
              sortOptionDataList.filter(
                (sortOptionData) => sortOptionData.value === sortOption
              )[0].name
            }
            onSelect={handleSortSelect}
          >
            {sortOptionDataList.map((sortOptionData) => {
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
        </Col>
      </Row>
    </section>
  );
};

export default memo(SortSelector);
