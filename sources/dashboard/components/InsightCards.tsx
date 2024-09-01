

  

  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import { GoGitPullRequest } from 'react-icons/go';
  import { FiPieChart } from 'react-icons/fi';
  import { FaCalendar } from 'react-icons/fa';
  import { IoMdAlert } from 'react-icons/io';
  import Card from './Card'; // Certifique-se de que o caminho para o componente Card esteja correto
  



 interface ApiData {
    requestsToday: number;
    teamTimeSaved: number;
    averageRequestsPerIssue: number;
    averageIntegrationTime: number;
    retentionRate: number;
  }
  
   interface CardProps {
    value: string;
    description: string;
    icon: JSX.Element;
}
 
  
  
  const InsightsCards: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      
       
const [data, setData] = useState<ApiData>({
    requestsToday: 0,
    teamTimeSaved: 0,
    averageRequestsPerIssue: 0,
    averageIntegrationTime: 0,
    retentionRate: 0,
  });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<{ data: ApiData }>('http://localhost:3000/api/report');
          setData(response.data.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error}</div>;
  
    return (
      <div className="flex flex-row justify-center mt-4 w-full px-2 overflow-x-auto text-[#ED8936]">
        <Card value={data.requestsToday.toString()} description="Requests Today" icon={<GoGitPullRequest />} />
        <Card value={data.teamTimeSaved.toString()} description="Team Time Saved (min)" icon={<FiPieChart />} />
        <Card value={data.averageRequestsPerIssue.toFixed(1)} description="Avg. Requests Per Issue" icon={<FaCalendar />} />
        <Card value={data.averageIntegrationTime.toFixed(1)} description="Avg. Integration Time (min)" icon={<IoMdAlert />} />
      </div>
    );
  };
  
  export default InsightsCards;
  