import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "../Context/useContext";
import { toast } from "react-hot-toast";
export default function Card({ cardItem }) {
  let priceRef = useRef();
  let data = useCart();
  let dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let options = cardItem.options[0];
  let priceOptions = Object.keys(options);

  const handleAddToCart = async () => {
    let food = [];
    for (let item of data) {
      if (item.id === cardItem._id) {
        food = item;
      }
    }
    if (food.lenght !== 0) {      
      if (food.size === size) {        
        await dispatch({
          type: "UPDATE",
          id: cardItem._id,
          price: finalPrice,
          qty: qty,
        });
        toast.success(" cart updated");
        return;
      }
      else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: cardItem._id,
          name: cardItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        toast.success("Item added to cart");
        return
      }
      toast.success("Item added to cart");
      return
    }
    await dispatch({
      type: "ADD",
      id: cardItem._id,
      name: cardItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    toast.success("Item added to cart");
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "450px" }}
        >
          <img
            src={cardItem.img}
            className="card-img-top"
            alt="..."
            style={{
              filter: "brightness(0.7)",
              objectFit: "fill",
              height: "120px",
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{cardItem.name}</h5>
            <p className="card-text">{cardItem.description}</p>

            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, item) => {
                  return (
                    <option key={item + 1} value={item + 1}>
                      {item + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <div className="h-100 d-inline fs-5">₹{finalPrice}/-</div>
            </div>

            <hr />
            <button
              className="btn btn-success justify-center w-50 ms-5"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  cardItem: PropTypes.object.isRequired,
};
