import React, { useEffect } from 'react';
import Slider from 'react-slick';
import '../styles/Cards.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import foto1 from "../logos/foto1.jpeg";
import foto3 from '../logos/foto3.png';
import foto2 from '../logos/foto2.webp';
import urcdlogo from '../logos/urcdlogo.jpeg';
import { Link } from 'react-router-dom';

function Cards() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ],
    };

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    const cardData = [
        { id: 1, title: "¿Ventajas?", text: "¡Playlists personalizables!", image: foto1 },
        { id: 2, title: "¿Por qué somos la mejor opción?", text: "¡Diseños personalizables!", image: foto3},
        { id: 3, title: "¿Qué nos diferencia?", text: "Cada CD que creamos es una obra única, diseñada exclusivamente para ti o para esa persona especial.", image: foto2},
        { id: 4, title: "¡Elegínos!", text: "Ofrecemos una atención personalizada y nos aseguramos de que cada playlist refleje gustos y momentos especiales.", image: urcdlogo},
    ];

    return (
        <div className="cards-container">
            <Slider {...settings}>
                {cardData.map(card => (
                    <div key={card.id} data-aos="fade-up">
                        <Link to={card.route} className="card-link"> {/* Usamos Link aquí */}
                            <div className="card text-center">
                                <div className="card-body">
                                    <img className="team-member-img" src={card.image} alt={card.title} />
                                    <h5>{card.title}</h5>
                                    <p className="card-text">“{card.text}”</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}



export default Cards;
