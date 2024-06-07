import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(3);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("https://ghibliapi.vercel.app/films/");
      setData(res.data);
    };

    fetchData();
  }, []);

  const handleShowMore = () => {
    setCount((prev) => prev + 3);
  };

  return (
    <>
      <div className="w-full text-center">
        <h1>Studio Ghibli Films</h1>
        <p>Open the console to see the API response</p>
        <ul className="grid grid-cols-3 mt-10 gap-4">
          {data &&
            data.slice(0, count).map((film) => (
              <li
                key={film.id}
                className="grid grid-cols-1 justify-items-center"
              >
                <h2>{film.original_title}</h2>
                <img src={film.image} width="120" height="240" />
              </li>
            ))}
        </ul>
        {data && count >= data.length && <p>No more films to show</p>}
        <div className="mt-20">
          <button
            type="button"
            onClick={handleShowMore}
            disabled={data && count >= data.legth}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            more
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
