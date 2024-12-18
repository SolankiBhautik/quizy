import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuizList from "./pages/QuizList";
import Profile from "./pages/Profile";
import CreateQuiz from "./components/CreateQuiz";
import EditQuiz from "./components/EditQuiz";
import RequireAuth from "./components/RequireAuth";
import QuizDetail from "./pages/QuizDetail";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/quiz" element={<QuizList />} />
            <Route
              path="/quiz/create"
              element={
                <RequireAuth>
                  <CreateQuiz />
                </RequireAuth>
              } />
            <Route
              path="/quiz/edit/:i"
              element={
                <RequireAuth>
                  <EditQuiz />
                </RequireAuth>
              } />
            <Route path="/quiz/:id" element={<QuizDetail />} />
            <Route path="/quiz/:id/result" element={<Result />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
