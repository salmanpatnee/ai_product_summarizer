import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello')
         .then((response) => response.json())
         .then((data) => setMessage(data.message))
         .catch((error) => console.error('Error fetching message:', error));
   }, []);

   return (
      <div className="flex min-h-svh flex-col items-center justify-center">
         <Button>Click me</Button>
      </div>
   );
}

export default App;
