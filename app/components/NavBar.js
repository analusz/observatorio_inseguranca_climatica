'use client';

import './navbar.css';
import Link from 'next/link';

export default function NavBar() {
  return (
    <header>
      <div className="navbar">

        <div className="logo">
          <Link href="/">
            OIC
          </Link>

          <nav className="nav-center">
            <Link href="/sobre" className="nav-link">
              Sobre
            </Link>
            <Link href="/metodologias" className="nav-link">
              Metodologias
            </Link>
          </nav>


        </div>

      

     
        <div className="btn-container">
          <button
            type="button"
            className="btn-feedback"
            aria-label="Ação principal"
          >
            FeedBack
          </button>
        </div>

      </div>
    </header>
  );
}