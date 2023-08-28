import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://foody-food-server.onrender.com/api/v1/foodData");
      const data = await response.json();
      setFoodCat(data[1]);
      setFoodItem(data[0]);
    };
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade m-auto"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 bg-transparent"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />


              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pastery"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?barbeque"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div
        className="container d-flex flex-wrap"
        style={{
          gap: "1rem",
          marginBottom: "6rem",
        }}
      >
        {/* Mapping over foodCat array */}
        {foodCat.length !== 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="row justify-content-between">
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              {/* Filtering and mapping over foodItem array */}
              {foodItem.length !== 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((fiteredItem) => {
                    return (
                      <div
                        key={fiteredItem._id}
                        className="col-12 col-md-6 col-lg-4 mb-3"
                      >
                        <Card cardItem={fiteredItem} />
                      </div>
                    );
                  })
              ) : (
                <div>no such thing</div>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
