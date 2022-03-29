/* eslint-disable @next/next/no-img-element */
import style from "../styles/Home.module.css";
import { useCallback, useEffect, useState } from "react";

type ResponseData = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

const Home = () => {
  const [characters, setCharacters] = useState<ResponseData[]>([]);
  console.log(characters);

  const timesTemp = "1648471885";
  const hash = "4d793a892c023ce44a123382021f8125";
  const apiKey = "4fb7bb31056de97a6d1b2c7f9c0df62b";

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `http://gateway.marvel.com/v1/public/characters?ts=${timesTemp}&apikey=${apiKey}&hash=${hash}`
      );
      const data = await resp.json();
      setCharacters(data.data.results);
    };
    fetchData();
  }, []);


  const handleClick = useCallback(async () => {
    const offset = characters.length
    const resp = await fetch(
      `http://gateway.marvel.com/v1/public/characters?ts=${timesTemp}&apikey=${apiKey}&hash=${hash}&offset=${offset}`
    );
    const data = await resp.json();
    setCharacters([...characters, ...data.data.results]);
  }, [characters]);

  
  return (
    <div>
      <header className={style.header}>
        <h1 className={style.h1}>Marvel</h1>
      </header>
      <div className={style.container}>
        {characters.map((characters) => (
          <div key={characters.id} className={style.quadrinho}>
            <p className={style.p}>{characters.name}</p>
            <img
              className={style.img}
              src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
              alt={characters.name}
            />
          </div>
        ))}
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop:'20px' }}>
        <button className={style.botao} onClick={handleClick}>Ver mais...</button>
      </div>
      <footer className={style.footer}>Marvel @2022</footer>
    </div>
  );
};

export default Home;
