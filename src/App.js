import React from "react";
import RoutesComponent from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import { Provider } from "react-redux";
import store from "./store/store";
import AuthWatcher from "./components/AuthWatcher";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthWatcher />
        <RoutesComponent />
      </Provider>
    </>
  );
};

export default App;
