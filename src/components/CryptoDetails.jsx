import React from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import moment from "moment";
import { Col, Row, Typography, Select } from "antd";
import Loader from "./Loader";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import { useGetDetailsQuery, useGetHistoryQuery } from "../services/cryptoApi";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;
const date = moment();
const newDate = date.subtract(3,'h').format('DD-MM-YYYY')

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = React.useState("7d");
  const { data, isFetching } = useGetDetailsQuery(coinId);
  // const { data: coinHistory } = useGetHistoryQuery({ coinId, newDate });
  const cryptoDetails = data;

  console.log();

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${
        cryptoDetails?.market_data?.current_price?.usd &&
        cryptoDetails?.market_data?.current_price?.usd
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
      title: "All-time-high (daily avg.)",
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
          alt="crypto-image"
        />
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
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
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      {/* <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name}/> */}

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col
            style={{ textAlign: "center" }}
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
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links?.homepage.map((link, idx) => (
              <Row className="coin-links" key={idx}>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </Row>
            ))}
            <Title level={3} className="coin-details-heading">
              Blockchain Websites
            </Title>
            {cryptoDetails.links?.blockchain_site?.map((link, idx) => (
              <Row className="coin-links" key={idx}>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </Row>
            ))}
            <Title level={3} className="coin-details-heading">
              Github Link
            </Title>
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
