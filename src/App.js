import React from "react";

const clientId = `?client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;
const mainUrl = `${process.env.REACT_APP_UNSPLASH_URI}/photos`;
const searchUrl = `${process.env.REACT_APP_UNSPLASH_URI}/search/photos`;

function App() {
  return (
    <div className="App">
      <div>Hello world</div>
    </div>
  );
}

export default App;
