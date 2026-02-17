import { useEffect, useState } from "react";
import { db, storage } from "../services/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import "./Admin.css";

const Admin = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
    categorias: [],
    imagen: null,
    ficha: null
  });

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtenerCategorias = async () => {
    const snap = await getDocs(collection(db, "categorias"));
    setCategorias(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const obtenerProductos = async () => {
    const snap = await getDocs(collection(db, "productos"));
    setProductos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    obtenerCategorias();
    obtenerProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    let fichaUrl = "";

    if (producto.imagen) {
      const imgRef = ref(storage, `imagenes/${Date.now()}_${producto.imagen.name}`);
      await uploadBytes(imgRef, producto.imagen);
      imageUrl = await getDownloadURL(imgRef);
    }

    if (producto.ficha) {
      const fichaRef = ref(storage, `fichas/${Date.now()}_${producto.ficha.name}`);
      await uploadBytes(fichaRef, producto.ficha);
      fichaUrl = await getDownloadURL(fichaRef);
    }

    if (editandoId) {
      await updateDoc(doc(db, "productos", editandoId), {
        nombre: producto.nombre,
        marca: producto.marca,
        descripcion: producto.descripcion,
        categorias: producto.categorias,
        ...(imageUrl && { imagen: imageUrl }),
        ...(fichaUrl && { ficha: fichaUrl })
      });
      setEditandoId(null);
    } else {
      await addDoc(collection(db, "productos"), {
        nombre: producto.nombre,
        marca: producto.marca,
        descripcion: producto.descripcion,
        categorias: producto.categorias,
        imagen: imageUrl,
        ficha: fichaUrl,
        createdAt: new Date()
      });
    }

    setProducto({
      nombre: "",
      marca: "",
      descripcion: "",
      categorias: [],
      imagen: null,
      ficha: null
    });

    obtenerProductos();
  };

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    obtenerProductos();
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1>Panel Administrativo</h1>

      <div className="admin-grid">

        <div className="admin-card">
          <h2>{editandoId ? "Editar Producto" : "Nuevo Producto"}</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Nombre"
              value={producto.nombre}
              onChange={e => setProducto({...producto, nombre: e.target.value})}
              required
            />

            <input
              type="text"
              placeholder="Marca"
              value={producto.marca}
              onChange={e => setProducto({...producto, marca: e.target.value})}
              required
            />

            <textarea
              placeholder="Descripción"
              value={producto.descripcion}
              onChange={e => setProducto({...producto, descripcion: e.target.value})}
              required
            />

            <div className="checkbox-group">
              {categorias.map(cat => (
                <label key={cat.id}>
                  <input
                    type="checkbox"
                    checked={producto.categorias.includes(cat.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProducto({
                          ...producto,
                          categorias: [...producto.categorias, cat.id]
                        });
                      } else {
                        setProducto({
                          ...producto,
                          categorias: producto.categorias.filter(id => id !== cat.id)
                        });
                      }
                    }}
                  />
                  {cat.nombre}
                </label>
              ))}
            </div>

            <input
              type="file"
              onChange={e => setProducto({...producto, imagen: e.target.files[0]})}
              required={!editandoId}
            />

            <input
              type="file"
              onChange={e => setProducto({...producto, ficha: e.target.files[0]})}
            />

            <button type="submit">
              {editandoId ? "Actualizar" : "Guardar"}
            </button>

          </form>
        </div>

        <div className="admin-card">
          <h2>Productos</h2>

          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="search-input"
          />

          {productosFiltrados.map(prod => (
            <div key={prod.id} className="product-row">
              <div>
                <strong>{prod.nombre}</strong>
                <p>{prod.marca}</p>
              </div>
              <div>
                <button onClick={() => {
                  setEditandoId(prod.id);
                  setProducto({
                    nombre: prod.nombre,
                    marca: prod.marca,
                    descripcion: prod.descripcion,
                    categorias: prod.categorias || [],
                    imagen: null,
                    ficha: null
                  });
                }}>
                  Editar
                </button>
                <button onClick={() => eliminarProducto(prod.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Admin;
