
import React from "react";


function Footer() {

  const footer = {
    width: "100%",
    padding: "10px",


  };

  return (

    <div style={footer}>





      <footer className="container-center bg-body-tertiary text-center  d-flex fixed-bottom">

        <div className="fixed-bottom" style={{ background: '#ADD8E6' }}>
          © 2024 Copyright:
          <a className="fixed-center" href="#">Pousada bom descanso</a>
        </div>
      </footer>


    </div>

  );

}

export default Footer;