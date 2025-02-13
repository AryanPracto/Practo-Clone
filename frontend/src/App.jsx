import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Search = lazy(() => import("./pages/Search/Search.jsx"));
import Home from "./pages/Home/Home.jsx"; // Keep Home SSR
import List from "./pages/List/List.jsx";

const App = () => {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route
          path="/search"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
            </Suspense>
          }
        />
        <Route path="/list" element={<List/>}></Route>
    </Routes>
  </Router>
  )
}

export default App
