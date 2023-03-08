import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Overview from "./pages/Overview";
import {
  Reports,
  ReportsOne,
  ReportsTwo,
  ReportsThree,
} from "./pages/Reports";
import Team from "./pages/Team";
import Messages from "./pages/Messages";
import Support from "./pages/Support";
import Users from "./pages/overview/Users";
import Revenue from "./pages/overview/Revenue";
import Products from "./pages/Products";
import Messages1 from "./pages/messages/Messages1";
import Messages2 from "./pages/messages/Messages2";
import PinkGems from "./pages/overview/PinkGem/PinkGems";
import GemWatch from "./pages/overview/GemWatch/GemWatch";

export default function App() {
  return (
    <div className="app-container">
      <Router>
        <Sidebar />
        <div className="element-container">
          <Routes>
            <Route path="/" element={<PinkGems />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/overview/pinkgems" element={<PinkGems />} />
            <Route path="/overview/gemwatching" element={<GemWatch />} />
            <Route path="/overview/users" element={<Users />} />
            <Route path="/overview/revenue" element={<Revenue />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/reports1" element={<ReportsOne />} />
            <Route path="/reports/reports2" element={<ReportsTwo />} />
            <Route path="/reports/reports3" element={<ReportsThree />} />
            <Route path="/products" element={<Products />} />
            <Route path="/team" element={<Team />} />
            <Route path="/messages" element={<Messages />}/>
            <Route path="/messages/message1" element={<Messages1 />} />
            <Route path="/messages/message2" element={<Messages2 />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<Outlet />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
