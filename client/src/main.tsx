import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
//import { AuthProvider } from "./context/AuthProvider"; 
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Context API */}
    {/* <AuthProvider>
      <App />
      <Toaster position="top-right" />
    </AuthProvider> */}

    {/* Redux toolkit */}
    <Provider store={store}>
      <App />
      <Toaster position="top-right" />
    </Provider>

  </StrictMode>
);
