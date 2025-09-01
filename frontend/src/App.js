import React, { useEffect, useState, useCallback } from "react";
// import useScrollTo from "./hooks/useScrollTo";
import { ThemeProvider } from "context/ThemeContext";
import { Route, Routes } from 'react-router-dom';
import AppLayout from 'layout/AppLayout/AppLayout';
import Homepage from 'pages/Homepage/Homepage';
import MoviesPage from 'pages/MoviesPage/MoviesPage';
import MovieDetailPage from 'pages/MovieDetailPage/MovieDetailPage';
// import SearchPage from 'pages/SearchPage/SearchPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import JoinPage from 'pages/JoinPage/JoinPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import PrivateRoute from 'route/PrivateRoute';
// import ScrollButton from 'common/ScrollButton/ScrollButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import "styles/App.scss";
import 'App.css';

function App() {
  console.log('🔥 App 컴포넌트 리렌더링!');
  // const { isShowTopBtn, handleTopBtnClick } = useScrollTo();

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="movies">
            <Route index element={<MoviesPage />} />
            <Route path=":id" element={<MovieDetailPage />} />
          </Route>
          {/* <Route path="search" element={<SearchPage />} /> */}
          <Route path="my-list" element={<PrivateRoute />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="join" element={<JoinPage />} />
      </Routes>
      {/* {isShowTopBtn && <ScrollButton label="Top" onClick={handleTopBtnClick} />} */}
    </ThemeProvider>
  );
}

export default App;
