import React from "react";

const Navbar = ({ setShowLogin, login, setLogin, setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setShowLogin(false);
    setLogin();
    setToken();
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">Quiz App</div>
      <div className="navbar-links">
        {login ? (
          <button onClick={handleLogout}>LogOut</button>
        ) : (
          <button onClick={() => setShowLogin(true)}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
