// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { Provider } from "react-redux";
import store from "./app/store";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home/:uid" element={<Home />} />
            <Route path="/course/:uid/:id" element={<CourseDetails />} />
            <Route path="/dashboard/:uid" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
