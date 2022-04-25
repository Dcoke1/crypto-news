import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Button } from "antd";
import { Link } from "react-router-dom";

import {
  useGetCryptosQuery,
  useGetExchangesQuery,
} from "../services/cryptoApi";
import { CryptoCurrencies, News } from ".";

const { Title } = Typography;

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery();
  const { data: exchanges } = useGetExchangesQuery();
  const stats = data?.data;
  const exch = exchanges

  if (isFetching) return <h1 style={{ textAlign: "center" }}>Loading...</h1>;

  return (
    <>
      <Title level={2} className="heading">
        Crypto Market Overview
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Cryptocurrencies"
            value={stats.active_cryptocurrencies}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Exchanges" value={exch?.length} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Market Cap"
            value={millify(stats.total_market_cap.usd)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="24 Hour Volume"
            value={millify(stats.total_volume.usd)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Markets" value={stats.markets} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">
            <Button>Show More</Button>
          </Link>
        </Title>
      </div>
      <CryptoCurrencies simplified/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">
            <Button>Show More</Button>
          </Link>
        </Title>
      </div>
      <News simplified/>
    </>
  );
};

export default HomePage;
