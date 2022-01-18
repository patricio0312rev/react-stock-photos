import React, { useEffect, useState } from "react";

const clientId = `?client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;
const mainUrl = `${process.env.REACT_APP_UNSPLASH_URI}/photos`;
const searchUrl = `${process.env.REACT_APP_UNSPLASH_URI}/search/photos`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchImages = async () => {
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

  useEffect(() => {
    fetchImages()
  }, []);
  return (
    <div className="App">
      <div>Hello world</div>
    </div>
  );
}

export default App;
