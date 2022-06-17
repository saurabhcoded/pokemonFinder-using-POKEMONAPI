import React, { useState, useEffect } from "react";
import loadBall from "../assets/loadpokeball.svg";
import axios from "axios";

const Card = () => {
  const [pokeName, setPokeName] = useState("charmander");
  const [data, setData] = useState({
    name: "charmander",
    type: "fire",
    height: "7",
    height: "905",
    ability: "blaze",
    HP: "35",
    attack: "49",
    defense: "49",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
  });
  const [dataCheck, setDataCheck] = useState(true);
  const [typeStyle, setTypeStyle] = useState("gray");
  const [pending, setPending] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setPending(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then((result) => {
        console.log(result.data);
        if (result) {
          setData({
            name: result.data.name,
            type: result.data.types[0].type.name,
            height: result.data.height,
            weight: result.data.weight,
            ability: result.data.abilities[0].ability.name,
            HP: result.data.stats[0].base_stat,
            attack: result.data.stats[1].base_stat,
            defense: result.data.stats[1].base_stat,
            img: result.data.sprites.other.dream_world.front_default,
          });
          setTimeout(() => {
            setPending(false);
          }, 1000);
        } else {
          setDataCheck(false);
        }
      })
      .catch((err) => {
        setDataCheck(false);
        setPending(false);
      });
  };
  useEffect(() => {
    if (data.type === "fire") {
      setTypeStyle("#f1471f");
    } else if (data.type === "water") {
      setTypeStyle("skyblue");
    } else if (data.type === "grass") {
      setTypeStyle("#5eba7d");
    } else {
      setTypeStyle("lightgrey");
    }
  }, [submitHandler]);

  if (pending === true) {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <img src={loadBall} className="loading" alt="" width={100} />
        </div>
      </>
    );
  } else if (dataCheck === true) {
    return (
      <>
        <div className="cardcontainer">
          <div style={{ background: "#54b564" }} className="vw-100">
            <form
              className="d-flex m-auto py-4"
              role="search"
              onSubmit={submitHandler}
              style={{ maxWidth: "330px" }}
            >
              <input
                className="form-control me-2 border-0"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setPokeName(e.target.value);
                }}
              />
              <button
                type="submit"
                className="btn btn-warning fw-bold text-white"
              >
                Search
              </button>
            </form>
          </div>

          <div
            className="cardPoke mx-auto border-0 rounded-4 shadow bg-light bg-opacity-25 p-3 mt-5"
            style={{ width: "20rem" }}
          >
            <img
              src={data.img}
              className="pokeImg m-auto"
              style={{ height: "40px" }}
              alt="pokemon"
            />
            <div className="details rounded-4 bg-light p-3">
              <h4 className="text-center">{data.name}</h4>
              <h6
                className="text-center type p-1 px-3 rounded"
                style={{ background: typeStyle }}
              >
                {data.type}
              </h6>
              <table className="table table-borderless lh-1 mt-3">
                <tbody>
                  <tr>
                    <th scope="row">Ability</th>
                    <td colSpan="2">{data.ability}</td>
                  </tr>
                  <tr>
                    <th scope="row">Height</th>
                    <td colSpan="2">{data.height} ft.</td>
                  </tr>
                  <tr>
                    <th scope="row">Weight</th>
                    <td colSpan="2">{data.weight} lbs..</td>
                  </tr>
                  <tr>
                    <th scope="row">HP</th>
                    <td colSpan="2">{data.HP}%</td>
                  </tr>
                  <tr>
                    <th scope="row">attack</th>
                    <td colSpan="2">{data.attack}%</td>
                  </tr>
                  <tr>
                    <th scope="row">defense</th>
                    <td colSpan="2">{data.defense}%</td>
                  </tr>
                </tbody>
              </table>
              <p></p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="container w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
        <img
          src={loadBall}
          className="my-3 loading"
          alt=""
          style={{ width: "80px" }}
        />
        <div className="text lh-1 text-center">
          <p className="fs-2 fw-bold">OOps POKEMON not found !</p>
          <p className="fs-5 fw-semibold">
            Please try searching another POKEMON name
          </p>
        </div>
      </div>
    );
  }
};

export default Card;
