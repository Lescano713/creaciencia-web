import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export default async function handler(req, res) {

  try {

    const snapshot = await getDocs(collection(db, "productos"));

    const productos = snapshot.docs.map(doc => {
      const data = doc.data();
      return `
        <url>
          <loc>https://www.creacienciaperu.com/producto/${data.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    }).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.creacienciaperu.com/</loc>
        <priority>1.0</priority>
      </url>
      ${productos}
    </urlset>`;

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(sitemap);

  } catch (error) {
    res.status(500).send("Error generating sitemap");
  }
}