import React, { useEffect } from 'react'; // Asegúrate de importar useEffect
import '../styles/Home.css';
import AOS from 'aos'; // Importa AOS
import 'aos/dist/aos.css'; // Asegúrate de que AOS esté importado
import { Link } from 'react-router-dom';
import Cards from './Cards';

const Home = () => {

  useEffect(() => {
    AOS.init({
        duration: 3000,
    });
  }, []); // Asegúrate de pasar un array vacío para que useEffect se ejecute una vez al montar

  return (
    <div className="home-container" >
      <h1 style={{ fontFamily: 'Poppins, sans-serif' }} className="home-text" data-aos="fade-up" >Sound Your Way</h1>
      <Link to="/cd">
           <button className="btn-primary" data-aos="fade-up">Personalizar CD</button>
      </Link> 
    </div>

    

  );
};

export default Home;