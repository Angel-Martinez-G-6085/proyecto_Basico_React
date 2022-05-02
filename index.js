import './node_modules/normalize.css/normalize.css';
import './public/styles.scss';
import React from 'react';
import { createRoot} from 'react-dom/client';
import App from './src/components/App/App.jsx';

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
