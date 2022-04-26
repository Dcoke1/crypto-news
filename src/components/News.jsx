import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetNewsQuery } from "../services/newsApi.js";
import { useGetCoinsQuery } from "../services/cryptoApi.js";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://p0.piqsels.com/preview/157/187/594/cryptocurrency-business-finance-money-thumbnail.jpg";

const News = ({ simplified }) => {
  const [newsCat, setNewsCat] = React.useState("Cryptocurrency");
  const { data: news } = useGetNewsQuery({
    newsCategory: newsCat,
    count: simplified ? 6 : 15,
  });

  const { data } = useGetCoinsQuery(100);

  if (!news?.value) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCat(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.map((coin, idx) => (
              <Option key={idx} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {news?.value.map((article, idx) => (
        <Col xs={24} sm={12} lg={8} key={idx}>
          <Card hoverable className="news-card">
            <a href={article.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {article.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={article?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {article.description > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      article.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {article.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(article.datePublished).startOf("seconds").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
