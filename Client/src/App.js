import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import RouteSurf from "./Routes/Route";
import { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function App() {
     
  let Navigate=useNavigate();
 

  let token = localStorage.getItem("token");

  useEffect(() => {
    async function Caller() {
      if (token) {
        try {
          await axios
            .get(`${process.env.REACT_APP_EXPRESS}/auth/allreadyLogin`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              localStorage.setItem("UserData", JSON.stringify(res.data));
              Navigate("/home");
            })
            .catch((err) => {
              console.log(err.message);
            });
        } catch (err) {
          console.log(err.message);
        }
      }
    }

    Caller();
  }, [token]);

  return <RouteSurf />;
  
}

export default App;
