import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Admin() {

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !categoria || !subcategoria || !imagen) {
      alert("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Subir imagen a Storage
      const imageRef = ref(storage, `productos/${Date.now()}_${imagen.name}`);
      await uploadBytes(imageRef, imagen);
      const imageUrl = await getDownloadURL(imageRef);

      // 2️⃣ Guardar producto en Firestore
      const docRef = await addDoc(collection(db, "productos"), {
        nombre,
        precio: Number(precio),
        categoria,
        subcategoria,
        imagen: imageUrl,
        createdAt: new Date()
      });

      console.log("Producto creado con ID:", docRef.id);

      alert("Producto agregado correctamente");

      // limpiar formulario
      setNombre("");
      setPrecio("");
      setCategoria("");
      setSubcategoria("");
      setImagen(null);

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Panel Admin</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>

        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Seleccionar categoría</option>
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

        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Agregar Producto"}
        </button>

      </form>
    </div>
  );
}
