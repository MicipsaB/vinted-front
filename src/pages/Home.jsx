import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import tear from "../assets/images/tear.svg";
import { Audio as Loader } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";

import "../assets/styles/home.css";

const Home = ({ fetchRangeValues, search, sortPrice }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/offers?priceMin=${
          fetchRangeValues[0]
        }&priceMax=${fetchRangeValues[1]}&sort=${
          sortPrice ? "price-desc" : "price-asc"
        }&title=${search}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [fetchRangeValues, sortPrice, search]);

  return isLoading ? (
    <Loader className="home-loader" color="#2CB1BA" height={80} width={80} />
  ) : (
    <>
      <div className="home-hero-bg-img">
        <img src={tear} alt="forme" className="home-hero-forme" />
        <div>
          <div className="home-hero-ready">
            Prêts à faire du tri dans vos placards ?
            <button
              onClick={() => {
                navigate("/publish");
              }}
            >
              Commencer à vendre
            </button>
          </div>
        </div>
      </div>

      <div className="home-card-wrapper">
        {data.offers &&
          data.offers.map((card, index) => {
            return <Card key={index} data={card} />;
          })}
      </div>
    </>
  );
};

export default Home;
