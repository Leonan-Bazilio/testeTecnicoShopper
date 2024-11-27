import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RideForm from "./pages/RideForm/RideForm";
import ConfirmRide from "./pages/ConfirmRide/ConfirmRide";
import RideHistory from "./pages/RideHistory/RideHistory";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RideForm />} />
        <Route path="/confirm-ride" element={<ConfirmRide />} />
        <Route path="/ride-history" element={<RideHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
