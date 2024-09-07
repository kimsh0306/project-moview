import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useMovieSearch";
import { useSearchParams } from "react-router-dom";
import { Alert, Badge, Button, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import RecommendMovie from "./components/RecommendMovie/RecommendMovie";
import "./MoviePage.style.css";

import { grey } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { genreList } from "../../constants/genreList";

const sortTypeList = [
  { value: "none", name: "none" },
  { value: "popularity", name: "popularity" },
  { value: "vote_count", name: "vote count" },
  { value: "vote_average", name: "vote average" },
];

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: grey[100],
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: grey[600],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[600],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[600],
          },
          ".MuiSvgIcon-root ": {
            fill: `${grey[600]} !important`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "none", // 선택된 아이템의 배경색
          },
          "&.Mui-selected:hover": {
            backgroundColor: "none", // 선택된 아이템의 호버 배경색
          },
          "&:hover": {
            backgroundColor: grey[300], // 호버 배경색
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: grey[200],
      light: grey[500],
      dark: grey[700],
    },
  },
});

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sort, setSort] = React.useState("");

  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword,
    page
  );
  console.log("dataMovie: ", data);
  const [appliedData, setAppliedData] = React.useState();
  const [originalData, setOriginalData] = React.useState();
  const [selectedGenre, setSelectedGenre] = React.useState();

  const handleGenreClick = (event) => {
    setSelectedGenre(event.target.name);
    setAppliedData((prevState) => {
      return {
        ...prevState,
        results: originalData.results.filter((obj) =>
          obj.genre_ids.includes(Number(event.target.value))
        ),
      };
    });
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const setSortData = (sortType) => {
    switch (sortType) {
      case "popularity":
        setAppliedData({
          ...data,
          results: [
            ...data.results.sort((a, b) => b.popularity - a.popularity),
          ],
        });
        break;
      case "vote_count":
        setAppliedData({
          ...data,
          results: [
            ...data.results.sort((a, b) => b.vote_count - a.vote_count),
          ],
        });
        break;
      case "vote_average":
        setAppliedData({
          ...data,
          results: [
            ...data.results.sort((a, b) => b.vote_average - a.vote_average),
          ],
        });
        break;
      case "none":
        setAppliedData({ ...data });
        break;
    }
  };

  useEffect(() => {
    console.log("appliedData: ", appliedData);
  }, [appliedData]);

  useEffect(() => {
    if (sort !== "") {
      setSortData(sort);
    }
  }, [sort]);

  useEffect(() => {
    if (data) {
      if (sort) {
        setSortData(sort);
      } else {
        setAppliedData({ ...data });
        setOriginalData({ ...data });
      }
    }
  }, [data]);

  if (data?.results.length === 0) {
    return <RecommendMovie />;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="movie-container">
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Row>
            <Col lg={4} xs={12}>
              <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                <InputLabel
                  sx={{ color: grey[500] }}
                  id="demo-simple-select-label"
                >
                  sort
                </InputLabel>
                <Select
                  labelstyle={{ color: "#ff0000" }}
                  selected
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="sort"
                  onChange={handleSortChange}
                >
                  {sortTypeList.map((type, idx) => {
                    return (
                      <MenuItem
                        key={idx}
                        value={type.value}
                        disabled={
                          type.value === "none"
                            ? sort === type.value || sort === ""
                            : sort === type.value
                        }
                      >
                        {type.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <div>
                {genreList.map((item, idx) => {
                  return (
                    <Button
                      key={idx}
                      className="badge"
                      variant={selectedGenre === item.name ? "danger" : "secondary"}
                      onClick={handleGenreClick}
                      value={item.id}
                      name={item.name}
                    >
                      {item.name}
                    </Button>
                  );
                })}
              </div>
            </Col>
            <Col lg={8} xs={12}>
              <Row>
                {appliedData?.results?.map((movie, idx) => (
                  <Col key={idx} lg={4} md={4} xs={12}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={
                  appliedData?.total_pages
                    ? Math.ceil(appliedData.total_pages)
                    : 1
                }
                previousLabel="<"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                activeLinkClassName="page-link_active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
                pageClassName={"page-item"}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default MoviePage;
