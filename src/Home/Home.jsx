import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a Tecnoend</h1>
        <p>Tu portal de tecnología de confianza</p>
      </header>
      <main className="home-content">
        <section className="home-intro">
          <h2>Descubre Nuevas Tecnologías</h2>
          <p>En Tecnoend, te mantenemos al tanto de las últimas innovaciones tecnológicas, productos, y tendencias del mercado.</p>
        </section>
        <section className="home-features">
          <h2>Características</h2>
          <ul>
            <li>Reseñas detalladas de productos</li>
            <li>Últimas noticias del mundo tecnológico</li>
            <li>Guías y tutoriales prácticos</li>
            <li>Foro de discusión para la comunidad</li>
          </ul>
        </section>
      </main>
      <footer className="home-footer">
        <p>© 2024 Tecnoend. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
