import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

export const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>Trust Score</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Website</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.trust_score_rank}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row
                    key={exchange.id}
                    style={{ width: "100%", alignItems: "center" }}
                  >
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.trust_score_rank}</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>{millify(exchange.trust_score)}</Col>
                    <Col span={6}>
                      ${millify(exchange.trade_volume_24h_btc)}
                    </Col>
                    <Col
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      span={6}
                    >
                      <a href={exchange.url} target="_blank" rel="noreferrer">
                        {exchange.name}
                      </a>
                    </Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
