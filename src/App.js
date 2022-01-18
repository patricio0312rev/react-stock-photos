import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import Photo from "./components/photo.component";

const clientId = `?client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;
const mainUrl = `${process.env.REACT_APP_UNSPLASH_URI}/photos`;
const searchUrl = `${process.env.REACT_APP_UNSPLASH_URI}/search/photos`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery]  = useState('');

  const fetchImages = async () => {
    setLoading(true);
    let url;

    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if(query) {
      url = `${searchUrl + clientId + urlPage + urlQuery}`;
    } else {
      url = `${mainUrl + clientId + urlPage}`;
    }

    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      
     
      setPhotos((oldPhotos) => {
        if(query && page === 1) {
          return data.results;
        } else if(query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  }

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if(!loading && (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
        setPage((oldPage) => {
          return oldPage + 1
        });
      }
    });

    return () => window.removeEventListener('scroll', event);
  }, [])
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="Buscar" className="form-input" value={query} onChange={(e) => setQuery(e.target.value)}/>
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
