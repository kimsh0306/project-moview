import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/MoviePage/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviesSearchPage from './pages/MoviesSearchPage/MoviesSearchPage';
import LoginPage from './pages/LoginPage/LoginPage';
import JoinPage from './pages/JoinPage/JoinPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PrivateRoute from './route/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.scss";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
        <Route path="search" element={<MoviesSearchPage />} />
        <Route path="my-list" element={<PrivateRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="join" element={<JoinPage />} />
    </Routes>
  );
}

export default App;
