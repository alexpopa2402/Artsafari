import { useState, useEffect } from 'react';

const useMockSession = () => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate a session fetch delay
      setSession(null); // Change this to a session object if you want to simulate a logged-in state
    }, 30000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return session;
};

export default useMockSession;