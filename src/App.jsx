import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SavedStack from "./pages/SavedStack";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/saved" element={<SavedStack />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;