// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Submissions from "./pages/Submissions";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter basename="/valleyguard">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/submissions" element={<Submissions />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
