import { Routes, Route, HashRouter } from "react-router-dom";
import './utils/rebrickable';
import './components/ThemeSelect';

import './App.css';
import LegoSetDetails from './components/LegoSetDetails';
import Overview from './components/Overview';

function App() {
  return (
      <HashRouter>
        <div>
          <h1>Rebrickable</h1>
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
        </div>
      </HashRouter>
  );
}

export default App;
