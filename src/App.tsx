import { Routes, Route, HashRouter } from "react-router-dom";
import styled from "styled-components";

import LegoSetDetails from './components/LegoSetDetails';
import Overview from './components/Overview';

const Header = styled.header`
  width: 100%;
  text-align: center;
  position: relative;
  top: 0px;
  background: #ffcf00;
  height: 2em;
  text-transform: uppercase;
`;

function App() {
  return (
      <HashRouter>
          <Header>Rebrickable</Header>
          <Routes>
            <Route 
              path="/" 
              element={<Overview/>} 
            />
            <Route 
              path="/details/:setId" 
              element={<LegoSetDetails />} 
            />
          </Routes>
      </HashRouter>
  );
}

export default App;
