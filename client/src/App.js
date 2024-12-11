import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import ItemDetails from './components/ItemDetails';

function App() {
  return (
    <div className="w-screen bg-[#F1FAFE]  max-wd:[1500px] py-[20px] overflow-x-hidden flex flex-col justify-center">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/item/:id" element={<ItemDetails />} />

      </Routes>
      
    </div>
  );
}

export default App;
