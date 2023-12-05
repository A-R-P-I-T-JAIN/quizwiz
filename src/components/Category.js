import React from "react";
import { Link } from "react-router-dom";
import "./css/category.css";

function Category() {
  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 17, name: "Science & Nature" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
  ];

  return (
    <div className="category_sec">
      <div className="container">
        <h1>Select Category</h1>
        <div className="cont">
          <ul>
            {categories.map((ele) => (
              <li key={ele.id}>
                <Link to={`/Game/${ele.id}`}>{ele.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/">
          <h1>Back</h1>
        </Link>
      </div>
    </div>
  );
}

export default Category;
