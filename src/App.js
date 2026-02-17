
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import Productos from "./pages/Productos";
import Admin from "./pages/Productos";

function App() {
  return (
    <Router>
      <Navbar /> {/* El Navbar se verá en todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-creaciencia" element={<Admin />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
export default App;

