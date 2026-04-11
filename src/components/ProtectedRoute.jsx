import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) return null;

  if (!user) return <Navigate to="/login" />;

  return children;
}
