import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

const AdminCategorias = () => {
  const [nombre, setNombre] = useState("");
  const [categorias, setCategorias] = useState([]);

  const obtenerCategorias = async () => {
    const snapshot = await getDocs(collection(db, "categorias"));
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setCategorias(lista);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const agregarCategoria = async () => {
    if (!nombre.trim()) return;

    await addDoc(collection(db, "categorias"), {
      nombre,
      createdAt: new Date()
    });

    setNombre("");
    obtenerCategorias();
  };

  const eliminarCategoria = async (id) => {
    await deleteDoc(doc(db, "categorias", id));
    obtenerCategorias();
  };

  return (
    <div>
      <h2>Administrar Categorías</h2>

      <input
        type="text"
        placeholder="Nueva categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button onClick={agregarCategoria}>
        Agregar
      </button>

      <ul>
        {categorias.map((cat) => (
          <li key={cat.id}>
            {cat.nombre}
            <button onClick={() => eliminarCategoria(cat.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategorias;
