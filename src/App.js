import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import Photo from "./components/photo.component";

const clientId = `?client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;
const mainUrl = `${process.env.REACT_APP_UNSPLASH_URI}/photos`;
const searchUrl = `${process.env.REACT_APP_UNSPLASH_URI}/search/photos`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    let url;

    url = `${mainUrl + clientId}`

    try {
      let response = await fetch(url);
      let data = await response.json();
      
      setPhotos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hello');
  }

  useEffect(() => {
    fetchImages()
  }, []);
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="Buscar" className="form-input" />
          <button type="submit" className="submit-btn" onClick={handleSubmit}><FaSearch /></button>
        </form>
      </section>

      <section className="photos">
        <div className="photos-center">
          {
            photos.map((photo, key) => {
              return <Photo key={key} {...photo} />
            })
          }
        </div>

        {
          loading && <h2 className="loading">Cargando...</h2>
        }
      </section>
    </main>
  );
}

export default App;
