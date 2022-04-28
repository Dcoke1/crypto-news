import React from "react";
import millify from "millify";
import { Link, useLocation } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import Loader from "./Loader";

import { useGetCoinsQuery } from "../services/cryptoApi";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCoinsQuery(count);
  const [cryptos, setCryptos] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const filteredData = cryptosList?.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    );

    setCryptos(filteredData);
  }, [isFetching, cryptos, search]);

  return (
    <div>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto Currencies"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {isFetching ? (
          <div style={{ display: "block", margin: "0 auto" }}>
            <Loader />
          </div>
        ) : (
          cryptos?.map((currency, idx) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={idx}>
              <Link to={`/crypto/${currency.id}`}>
                <Card
                  title={`${currency.market_cap_rank}. ${currency.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={currency.image}
                      alt="crypto_card"
                    />
                  }
                  hoverable
                >
                  <p>Price: {`$${millify(currency.current_price)}`}</p>
                  <p>Market Cap: {`$${millify(currency.market_cap)}`}</p>
                  <p>
                    Daily Change:
                    {` ${millify(currency.market_cap_change_percentage_24h)}%`}
                  </p>
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default CryptoCurrencies;
