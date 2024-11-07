// src/App.jsx
import React from "react";
// import "./assets/styles/index.css";
import AppRouter from "./AppRouter"; // Tu componente con las rutas
import { Provider } from 'react-redux'; // Importar el Provider
import { store } from "./redux/store";

const App = () => {
    return (
        <Provider store={store}> {/* Proveer el store a toda la aplicación */}
            <div className="App">
                <h1>Shope-store</h1>
                <AppRouter /> {/* El enrutador maneja las rutas */}
            </div>
        </Provider>
    );
};

export default App;
