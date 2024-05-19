import React from "react";

const Navbar = ({ setShowLogin, login, setLogin, setToken }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Quiz App</div>
      <div className="navbar-links">
        {login === undefined ? (
          <button
            onClick={() => {
              setShowLogin(false);
              setLogin();
              setToken();
            }}
          >
            LogOut
          </button>
        ) : (
          <button onClick={() => setShowLogin(true)}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
