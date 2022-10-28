import ReactDOM from 'react-dom/client';
import {App} from './components/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store} from './store'

//FireBase関連のImport
import { firebaseConfig } from './firebaseConfig'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// fireBaseの初期化処理
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getDatabase();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    // Reduxを利用する為にProviderで囲む
    <Provider store={store}>
      <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
