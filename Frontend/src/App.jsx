/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import "./App.css";
import ProductHandler from "./context/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Router from "./Router";

let countries = null;
function App() {
  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const response = await axios.get(
        "https://api.countrystatecity.in/v1/countries",

        {
          headers: {
            "X-CSCAPI-KEY":
              "dFJ4Tm44TVBVcnVOWUlyblJGQzVCQm50bW0zME1MMEh4VjBGQk5CTg==",
          },
        }
      );

      countries = response.data.map((key) => ({
        label: key.name,
        value: key.name,
      }));
      localStorage.setItem("countries", JSON.stringify(countries));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Provider store={store}>
        <ProductHandler>
          <Router></Router>
        </ProductHandler>
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
