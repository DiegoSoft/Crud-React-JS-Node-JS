import React from "react";
import Logo from './login.png';
import { Outlet, Link } from "react-router-dom";



function Header_user() {

  const link = {
    textDecoration: 'none',
    color: '#363636'

  };




  return (

    <div>



      <nav className="navbar navbar-expand-lg  bg-body-tertiary" style={{ background: '#EAEBEF' }}>

        <div className="container-fluid">

         
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
  </button>


          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src={Logo}
                height="38"
                alt="Pousada Bom Descanso"
                loading="lazy"
              />
            </a>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link">

                  <Link to="/home_user" style={link}><strong><i className="fas fa-home"></i>  Home</strong></Link>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" >

                  <Link to="/produtos/''" style={link}><strong><i className="fas fa-shopping-cart"></i> Produtos</strong></Link>

                </a>
              </li>


            </ul>

          </div>

          <ul className="navbar-nav d-flex flex-row me-1">
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" ><i className="fas fa-right-to-bracket fa-x2"></i> <Link to="/" style={link}><strong>Sair</strong></Link></a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link text-white" > </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link text-white" > </a>
            </li>
          </ul>



        </div>

      </nav>



      <Outlet />


    </div>


  );

}

export default Header_user;
