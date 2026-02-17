/*function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>App funcionando</h1>
    </div>
  );
}*/

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <h1>MIAU</h1>
      <Navbar /> {/* El Navbar se verá en todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-creaciencia" element={<Admin />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
export default App;

