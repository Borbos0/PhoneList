import { useEffect } from 'react';
import './styles/App.css';
import axios from 'axios';


  
  
function App() {
  useEffect(() => {
    const sendRequest = async () => {
      const token = 'testtoken';
      const recordId = 'MToxMDA2NzYxNToxNDMwMDM3NzExNzow';
      const partnershipId = '578';
  
      try {
        console.log('Request Data:', { record: recordId, partnership_id: partnershipId });
        const response = await axios.post(
          'https://api.skilla.ru/mango/getRecord',
          {
            record: recordId,
            partnership_id: partnershipId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    };
  
    sendRequest();
  }, []);
  return (
    <div>
    </div>
  );
}

export default App;
