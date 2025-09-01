import React from "react";
import { DropdownButton, Dropdown, Col, Row } from "react-bootstrap";
import { useMovieSortFilter } from "hooks/filter";
import { sortOptionDataList } from "constants/sortOptions";
import "./SortSelector.css";

const SortSelector = ({ pageTitle }) => {
  console.log('🔥 SortSelector 컴포넌트 리렌더링!');
  const [sortOption, setSortOption] = useMovieSortFilter();

  const handleSortSelect = (eventKey) => {
    setSortOption(eventKey);
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

export default SortSelector;
