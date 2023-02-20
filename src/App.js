import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import UploadImage from './FileUploads/UploadImage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<UploadImage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
