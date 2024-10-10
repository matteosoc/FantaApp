import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link, useSearchParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


const Home = () => {
  const navigate = useNavigate();

  const { token, setToken } = useContext(AuthContext)

  let [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    // cerca il token tra i params
    console.log(searchParams.get('token'))

    if (searchParams.get('token')) {
      localStorage.setItem('token', searchParams.get('token'))
      setToken(searchParams.get('token'))// aggiorna il token nello stato del contesto
    }
  }, [])

  return (
    <div className="container text-center center-content">
      {!token &&
        <div>
          <h1>Benvenuto su FantaApp</h1>
          <p>Effettua il login o registrati per partecipare al gioco</p>
          <div className="mt-5">
            <button className="btn btn-primary me-3" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/register')}>
              Registrati
            </button>
          </div>
        </div>}
        {token &&
        <div>
          <h1>Bentornato su FantaApp</h1>
          <div className="mt-5">
            <button className="btn btn-primary me-3" onClick={() => navigate('/dashboard')}>
              Vai alla dashboard
            </button>
          </div>
        </div>}
    </div>
  );
};

export default Home;