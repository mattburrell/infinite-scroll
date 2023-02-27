import ReactDOM from "react-dom/client";
import App from "./app";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";
import "./index.css";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
