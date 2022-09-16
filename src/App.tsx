import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<RoomsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
