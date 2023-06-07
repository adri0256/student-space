import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const router = createBrowserRouter([
    {
        path: "/*",
        element: <App />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider>
                    <RouterProvider router={router} />
                </ChakraProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
