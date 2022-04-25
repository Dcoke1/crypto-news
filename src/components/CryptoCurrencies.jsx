import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCoinsQuery } from "../services/cryptoApi";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCoinsQuery(count);
  const [cryptos, setCryptos] = React.useState([]);

  React.useEffect(() => {
    setCryptos(cryptosList);
  }, [isFetching, cryptos]);

  return (
    <div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {isFetching ? (
          <h1 style={{ width: "100%", textAlign: "center" }}>Loading...</h1>
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
                  <p>Price: {millify(currency.current_price)}</p>
                  <p>Market Cap: {millify(currency.market_cap)}</p>
                  <p>
                    Daily Change:
                    {`${millify(currency.market_cap_change_percentage_24h)}%`}
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
