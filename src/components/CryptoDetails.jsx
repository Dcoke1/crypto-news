import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetDetailsQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = React.useState('7d');
  const { data, isFetching } = useGetDetailsQuery(coinId);
  const cryptoDetails = data;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  // const stats = [
  //   { title: 'Price to USD', value: `$ ${cryptoDetails?.market_data?.current_price?.usd && millify(cryptoDetails?.market_data?.current_price?.usd)}`, icon: <DollarCircleOutlined /> },
  //   { title: 'Rank', value: `${cryptoDetails?.market_cap_rank}`, icon: <NumberOutlined /> },
  //   { title: '24h Volume', value: `$ ${cryptoDetails?.market_data?.total_volume?.usd && millify(cryptoDetails?.market_data?.total_volume?.usd)}`, icon: <ThunderboltOutlined /> },
  //   { title: 'Market Cap', value: `$ ${cryptoDetails?.market_data?.market_cap?.usd && millify(cryptoDetails?.market_data?.market_cap?.usd)}`, icon: <DollarCircleOutlined /> },
  //   { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.market_data?.ath?.usd)}`, icon: <TrophyOutlined /> },
  // ];

  // const genericStats = [
  //   { title: 'Total Supply', value: `$ ${millify(cryptoDetails?.market_data?.total_supply)}`, icon: <ExclamationCircleOutlined /> },
  //   { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails?.market_data?.circulating_supply)}`, icon: <ExclamationCircleOutlined /> },
  // ];

  if (isFetching) return 'Loading...';

  return (
    <div>
      <h1>CryptoDetails</h1>
    </div>
  );
}

export default CryptoDetails;
