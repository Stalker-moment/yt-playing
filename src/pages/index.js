import WebSocketClient from '@/utils/WebSocketClient';

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <WebSocketClient />
    </div>
  );
};

export default Home;
