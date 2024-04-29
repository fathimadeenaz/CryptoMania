import { Routes, Route } from "react-router-dom";

import {
  Navbar,
  Cryptocurrencies,
  CryptoDetails,
  News,
  Homepage,
} from "./components";

import { Layout } from "antd";
import "./index.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default App;
