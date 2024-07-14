import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import Loading from '@/components/Loading';
// Dynamically import the MusicCard component
const MusicCard = lazy(() => import('@/components/MusicCard'));

const WebSocketClient = () => {
  const [message, setMessage] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const retryIntervalRef = useRef(null);

  const connectWebSocket = () => {
    socketRef.current = new WebSocket('wss://nowapi.tierkun.my.id/receive');

    socketRef.current.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      if (retryIntervalRef.current) {
        clearTimeout(retryIntervalRef.current);
        retryIntervalRef.current = null;
      }
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessage(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    socketRef.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
      retryConnection();
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      socketRef.current.close();
    };
  };

  const retryConnection = () => {
    if (!retryIntervalRef.current) {
      retryIntervalRef.current = setTimeout(() => {
        console.log('Retrying connection...');
        connectWebSocket();
      }, 5000);
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (retryIntervalRef.current) {
        clearTimeout(retryIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <Suspense fallback={<Loading/>}>
        {message ? <MusicCard data={message} /> : <Loading />}
      </Suspense>
    </div>
  );
};

export default WebSocketClient;
