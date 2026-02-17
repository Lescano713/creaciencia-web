import { useState, useEffect } from "react";
import { db, storage } from "../services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../pages/Admin.css";

export default function Admin() {

  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [imagen, setImagen] = useState(null);
  const [ficha, setFicha] = useState(null);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  // 🔥 Listener en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "productos"),
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(lista);
      }
    );

    return () => unsubscribe();
  }, []);

  const generarSlug = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError("");
    setMensajeExito("");

    if (!nombre || !marca || !descripcion || !categoria || !subcategoria) {
      setMensajeError("Todos los campos son obligatorios.");
      return;
    }

    if (!imagen) {
      setMensajeError("Debes subir una imagen.");
      return;
    }

    if (!ficha) {
      setMensajeError("Debes subir la ficha técnica.");
      return;
    }

    try {
      setLoading(true);

      // Subir imagen
      const imageRef = ref(
        storage,
        `productos/imagenes/${Date.now()}_${imagen.name}`
      );
      await uploadBytes(imageRef, imagen);
      const imageUrl = await getDownloadURL(imageRef);

      // Subir ficha
      const fichaRef = ref(
        storage,
        `productos/fichas/${Date.now()}_${ficha.name}`
      );
      await uploadBytes(fichaRef, ficha);
      const fichaUrl = await getDownloadURL(fichaRef);

      await addDoc(collection(db, "productos"), {
        nombre,
        slug: generarSlug(nombre),
        marca,
        descripcion,
        categoria,
        subcategoria,
        imagen: imageUrl,
        fichaTecnica: fichaUrl,
        createdAt: new Date()
      });

      setMensajeExito("Producto agregado correctamente.");

      // limpiar
      setNombre("");
      setMarca("");
      setDescripcion("");
      setCategoria("");
      setSubcategoria("");
      setImagen(null);
      setFicha(null);

    } catch (error) {
      console.error(error);
      setMensajeError("Ocurrió un error al guardar.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
  };

  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="admin-container">

      {/* FORMULARIO */}
      <div className="admin-form">
        <h2>Agregar Producto</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Categoría</option>
            <option value="industria">Industria</option>
            <option value="educacion">Educación</option>
            <option value="investigacion">Investigación</option>
          </select>

          <input
            type="text"
            placeholder="Subcategoría"
            value={subcategoria}
            onChange={(e) => setSubcategoria(e.target.value)}
          />

          <label>Imagen:</label>
          <input
            type="file"
            onChange={(e) => setImagen(e.target.files[0])}
          />

          <label>Ficha técnica:</label>
          <input
            type="file"
            onChange={(e) => setFicha(e.target.files[0])}
          />

          {mensajeError && (
            <p className="error-message">{mensajeError}</p>
          )}

          {mensajeExito && (
            <p className="success-message">{mensajeExito}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Agregar Producto"}
          </button>

        </form>
      </div>

      {/* PANEL DERECHO */}
      <div className="admin-list">
        <h2>Productos</h2>

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />

        {productosFiltrados.map((prod) => (
          <div key={prod.id} className="product-card-admin">
            <h4>{prod.nombre}</h4>
            <p><strong>Marca:</strong> {prod.marca}</p>
            <p>{prod.descripcion}</p>

            <a href={prod.fichaTecnica} target="_blank" rel="noreferrer">
              Descargar ficha técnica
            </a>

            <button onClick={() => eliminarProducto(prod.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
