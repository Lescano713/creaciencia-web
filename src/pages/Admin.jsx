import { useState, useEffect } from "react";
import { db, storage, auth } from "../services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

import "./Admin.css";

export default function Admin() {

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [imagen, setImagen] = useState(null);
  const [ficha, setFicha] = useState(null);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Generar slug automático
  const generarSlug = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
  };

  // 🔥 Obtener productos en tiempo real
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

  // 🔥 Cerrar sesión
  const cerrarSesion = async () => {
    await signOut(auth);
    navigate("/");
  };

  // 🔥 Agregar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombre || !marca || !descripcion || !categoria || !subcategoria) {
      setMensaje("Completa todos los campos.");
      return;
    }

    if (!imagen || !ficha) {
      setMensaje("Debes subir imagen y ficha técnica.");
      return;
    }

    try {
      setLoading(true);

      const imageRef = ref(
        storage,
        `productos/imagenes/${Date.now()}_${imagen.name}`
      );
      await uploadBytes(imageRef, imagen);
      const imageUrl = await getDownloadURL(imageRef);

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

      setMensaje("Producto agregado correctamente.");

      setNombre("");
      setMarca("");
      setDescripcion("");
      setCategoria("");
      setSubcategoria("");
      setImagen(null);
      setFicha(null);

    } catch (error) {
      setMensaje("Error al guardar producto.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Eliminar producto
  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
  };

  return (
    <div className="admin-container">

      <div className="admin-header">
        <h1>Panel Administrativo</h1>
        <button className="logout-btn" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      <div className="admin-grid">

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

            <label>Imagen</label>
            <input
              type="file"
              onChange={(e) => setImagen(e.target.files[0])}
            />

            <label>Ficha técnica (PDF)</label>
            <input
              type="file"
              onChange={(e) => setFicha(e.target.files[0])}
            />

            {mensaje && <p className="admin-message">{mensaje}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Agregar Producto"}
            </button>

          </form>
        </div>

        {/* LISTA PRODUCTOS */}
        <div className="admin-list">

          <h2>Productos Agregados</h2>

          {productos.length === 0 && (
            <p>No hay productos registrados.</p>
          )}

          {productos.map((p) => (
            <div key={p.id} className="admin-product-item">
              <div>
                <strong>{p.nombre}</strong>
                <p>{p.categoria} - {p.subcategoria}</p>
              </div>

              <button
                className="delete-btn"
                onClick={() => eliminarProducto(p.id)}
              >
                Eliminar
              </button>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
