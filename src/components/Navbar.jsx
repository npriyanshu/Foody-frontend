import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "../Context/useContext";

const Navbar = () => {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Foody
          </Link>
          <ul className="navbar-nav me-auto mb-2 d-flex flex-row gap-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" to="/myOrder">
                    My Orders
                  </Link>
                </li>
              )}
            </ul>


          <div className="navbar" id="navbarNav">

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-2" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-2" to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                  MyCart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    navigate("/login");
                  }}
                >
                  LogOut
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
