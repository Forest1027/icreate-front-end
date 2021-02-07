import React from 'react';
import './App.css';
import Introduction from "./components/Introduction/Introduction";
import Layout from "./containers/Layout/Layout";

function App() {
  return (
    <div className="App">
        <Layout>
            <Introduction/>
        </Layout>
    </div>
  );
}

export default App;
