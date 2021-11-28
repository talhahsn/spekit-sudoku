import { BrowserRouter, Routes, Route } from "react-router-dom";

import SudokuPage from "../pages/sudoku";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SudokuPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
