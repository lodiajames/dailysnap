import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/create-post" element={<PostPage />} />
    </Routes>
  );
}

export default App;
