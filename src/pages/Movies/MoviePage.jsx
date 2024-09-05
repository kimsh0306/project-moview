import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import RecommendMovie from "./components/RecommendMovie/RecommendMovie";
import "./MoviePage.style.css";

import { grey } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";

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
    // MuiButtonBase: {
    //   styleOverrides:{
    //     root:{
    //       color:  deepOrange[500],
    //       backgroundColor: grey[300],
    //     }
    //   }
    // },
    // MuiPaper: {
    //   styleOverrides:{
    //     root:{
    //       backgroundColor: grey[300],
    //     }
    //   }
    // },
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
  const { data, isLoading, isError, error, refetch } = useSearchMovieQuery(
    keyword,
    page
  );
  const [appliedData, setAppliedData] = React.useState();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const setSortData = (sortType) => {
    switch (sortType) {
      case "popularity":
        console.log("popularity");
        setAppliedData({
          ...data,
          results: [
            ...data.results.sort((a, b) => b.popularity - a.popularity),
          ],
        });
        break;
      case "vote_count":
        console.log("vote_count");
        setAppliedData({
          ...data,
          results: [
            ...data.results.sort((a, b) => b.vote_count - a.vote_count),
          ],
        });
        break;
      case "vote_average":
        console.log("vote_average");
        setAppliedData({
          ...data,
          results: [
            ...data.results.sort((a, b) => b.vote_average - a.vote_average),
          ],
        });
        break;
    }
  }

  useEffect(() => {
    // console.log("sort:", sort);
    if (sort !== "") {
      setSortData(sort)
    }
  }, [sort]);

  useEffect(() => {
    // console.log("data: ", data, " | sort: ", sort)
    if(data){
      if(sort) {
        setSortData(sort)
      }else{
        setAppliedData({...data})
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
      <Container className="movie-container">
        <Row>
          <Col lg={4} xs={12}>
            <FormControl fullWidth>
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
                // sx={{
                //   color: "white",
                //   ".MuiOutlinedInput-notchedOutline": {
                //     borderColor: "white",
                //   },
                //   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                //     borderColor: "white",
                //   },
                //   "&:hover .MuiOutlinedInput-notchedOutline": {
                //     borderColor: "white",
                //   },
                //   ".MuiSvgIcon-root ": {
                //     fill: "white !important",
                //   },
                // }}
              >
                <MenuItem value="popularity" disabled={sort === "popularity"}>
                  popularity
                </MenuItem>
                <MenuItem value="vote_count" disabled={sort === "vote_count"}>
                  vote count
                </MenuItem>
                <MenuItem
                  value="vote_average"
                  disabled={sort === "vote_average"}
                >
                  vote average
                </MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {appliedData?.results?.map((movie, idx) => (
                <Col key={idx} lg={4} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={appliedData?.total_pages}
              previousLabel="< previous"
              pageClassName="page-item"
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
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default MoviePage;
