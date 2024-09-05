import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import RecommendMovie from "./components/RecommendMovie/RecommendMovie";
import "./MoviePage.style.css";

import { deepOrange, green,amber, grey } from "@mui/material/colors";
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
            borderColor: grey[500],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[500],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[500],
          },
          ".MuiSvgIcon-root ": {
            fill: `${grey[500]} !important`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides:{
        root:{
          backgroundColor: grey[100],
        }
      }
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
  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword,
    page
  );

  console.log("selecting data:", data);

  const handleChange = (event) => {
    // console.log("event: ", event.target.value)
    const sortType = event.target.value;
    setSort(sortType);

    if (sortType === "popularity") {
      
    }
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // useEffect(()=> {
  //   console.log("sort: ", sort);
  // },[sort]);

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
              id="demo-simple-select-label">sort</InputLabel>
              <Select
                labelstyle={{ color: "#ff0000" }}
                selected
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="sort"
                onChange={handleChange}
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
                <MenuItem value="popularity">popularity</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie, idx) => (
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
              pageCount={data?.total_pages}
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
