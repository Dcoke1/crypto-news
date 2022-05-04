import React from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import Loader from "./Loader";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  TrophyOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import { useGetDetailsQuery, useGetHistoryQuery } from "../services/cryptoApi";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeAgo, setUserTime] = React.useState(7);

  const { data, isFetching } = useGetDetailsQuery(coinId);
  const { data: coinHistory } = useGetHistoryQuery({ coinId, timeAgo });
  const cryptoDetails = data;

  console.log(cryptoDetails);
  React.useEffect(()=>{},[timeAgo])

  const time = ["7", "14", "30", "60", "90", "200"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${
        cryptoDetails?.market_data?.current_price?.usd &&
        cryptoDetails.market_data.current_price.usd
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: `${cryptoDetails?.market_cap_rank}`,
      icon: <NumberOutlined />,
    },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.market_data?.total_volume?.usd &&
        millify(cryptoDetails.market_data.total_volume.usd)
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.market_data?.market_cap?.usd &&
        millify(cryptoDetails.market_data.market_cap.usd)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high ( daily avg )",
      value: `$ ${
        cryptoDetails?.market_data?.ath?.usd &&
        millify(cryptoDetails.market_data.ath.usd)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.market_data?.total_supply &&
        millify(cryptoDetails.market_data.total_supply)
      }`,
      icon: <FundOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.market_data?.circulating_supply &&
        millify(cryptoDetails.market_data.circulating_supply)
      }`,
      icon: <MoneyCollectOutlined />,
    },
  ];

  if (isFetching) return <Loader />;

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <img
          style={{ borderRadius: "25%" }}
          src={cryptoDetails.image.small}
          alt="crypto"
        />
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        style={{ display: "block", margin: "0 auto 1.25rem" }}
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setUserTime(value)}
      >
        {time.map((date) => (
          <Option key={date}>{`${date}d`}</Option>
        ))}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.market_data?.current_price?.usd)} coinName={cryptoDetails?.name}/>

      <Col style={{ marginTop: "1.5rem" }} className="stats-container">
        <Col className="coin-value-statistics">
          <Col
            className="coin-value-statistics-heading"
          >
            <Title level={3} className="coin-detail-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>An overview showing the statistics of {cryptoDetails.name}</p>
          </Col>
          {stats?.map(({ icon, title, value }, idx) => (
            <Col key={idx} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col
            style={{ textAlign: "center" }}
            className="coin-value-statistics-heading"
          >
            <Title level={3} className="coin-detail-heading">
              Other Statistics
            </Title>
            <p>An overview showing the statistics of {cryptoDetails.name}</p>
          </Col>
          {genericStats?.map(({ icon, title, value }, idx) => (
            <Col key={idx} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
          </Title>
          <p>{cryptoDetails.description?.en.replace(/(<([^>]+)>)/gi, "")}</p>
          <Col className="coin-container">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Link/s
            </Title>
            {cryptoDetails.links?.homepage.map((link, idx) => (
              <Row className="coin-links" key={idx}>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </Row>
            ))}
            <Title level={3} className="coin-details-heading">
              Blockchain Website/s
            </Title>
            {cryptoDetails.links?.blockchain_site?.map((link, idx) => (
              <Row className="coin-links" key={idx}>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </Row>
            ))}
            {cryptoDetails.links.repos_url.github.length > 0 && (
              <Title level={3} className="coin-details-heading">
                Github Link/s
              </Title>
            )}
            {cryptoDetails.links?.repos_url?.github.map((link, idx) => (
              <Row className="coin-links" key={idx}>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </Row>
            ))}
          </Col>
        </Row>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
