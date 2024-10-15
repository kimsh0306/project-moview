import React from "react";
import { Container, Row } from "react-bootstrap";
import CustomDropdown from "../Movies/components/CustomDropdown/CustomDropdown";
import "./MyListPage.style.css";

const MyListPage = () => {
  const [sort, setSort] = React.useState("popularity");

  return (
    <div className="my-list">
      <Container fluid>
        <Row className="movie-list__header">
          <div className="page-name">
            <h2>내가 찜한 영화</h2>
            <div className="dropdown">
              <CustomDropdown sort={sort} setSort={setSort} />
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MyListPage;
