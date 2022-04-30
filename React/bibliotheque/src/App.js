import './App.css';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import UserDataService from './Service/UserDataService';


const useFetch = () => {
  const [data, setData] = useState(null);
    
  async function fetchData() {
    
    const clients = await fetchDataClient();
    const employes = await fetchDataEmploye();
    const admins = await fetchDataAdmin();

    const users = clients.concat(employes, admins);
    setData(users);
   
  }

  async function fetchDataClient(){
    const response = await UserDataService.getClients();
    const json = await response.data.map( (client) => {
      return {...client, 'grade':'Client'};
    });
    return json;
  }

  async function fetchDataEmploye() {
    const response = await UserDataService.getEmployes();
    const json = await response.data.map( (employe) => {
      return {...employe, 'grade':'Employe'};
    });
    
    return json;
  }

  async function fetchDataAdmin() {
    const response = await UserDataService.getAdmins();
    const json = await response.data.map( (admin) => {
      return {...admin, 'grade':'Admin'};
    });
    
    return json;
  }



  useEffect(() => {fetchData()},[]);
  useEffect(() => {fetchDataEmploye()},[]);
  

  return data;
};

function App() {

  const data = useFetch();

  if(!data){
    return <div>Loading</div>
  } else {
    return (
      <>
         <Login dataClient={data}/>
      </> 
     )
  }
}

export default App;
