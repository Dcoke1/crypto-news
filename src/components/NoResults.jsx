import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';

const NoResults = ({ search }) => (
  <Result
    icon={<SmileOutlined />}
    title={`No results found for ${search}`}
  />
);

export default NoResults;