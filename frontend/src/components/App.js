import Navbar from "./Navbar";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Courses from "./Courses";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

const store = createStore({
  authName: "jwt",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

function App() {
  return (
    <AuthProvider store={store}>
      <Router>
        <div className="mx-auto flex flex-col h-full">
          <Navbar />
          <div className="content grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/courses"
                element={
                  <RequireAuth fallbackPath="/login">
                    <Courses />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
