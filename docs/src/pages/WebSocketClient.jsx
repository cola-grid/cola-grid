// src/components/WebSocketClient.jsx
import { useEffect, useState } from 'react';

const WebSocketClient = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8085/zs-api/common/hello');
      const result = await response.text();
      setData(result); // 更新状态
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>客户端组件 - WebSocket 示例</h2>
      <p>返回的内容：{data}</p>
    </div>
  );
};

export { WebSocketClient };