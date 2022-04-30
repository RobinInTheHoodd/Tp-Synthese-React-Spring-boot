import React, { useEffect } from "react";
import Header from "../../Header/Header";
import {useLocation} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService";


const useFetch = (id) => {
    const [data, setData] = React.useState(null);
      
    async function fetchData() {
        const response = await ClientDataService.getBorrowDocsById(id);
        const json = await response.data
        setData(json);
    }
    React.useEffect(() => {fetchData()},[]);

    return data;
  };


const columnsClient = [
    {
        name: 'id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Prénom',
        selector: row => row.firstName,
    },
    {
        name: 'Nom',
        selector: row => row.secondName,
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'password',
        selector: row => row.password,
    },
    {
        name: 'Numéro de téléphone',
        selector: row => row.phoneNumber,
    },
    {
        name: 'birthday',
        selector: row => row.bitrhday,
    },
];

const columnsBorrowDocs = [
    {
        name: 'id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'document',
        selector: row => row.document,
        omit: true,
    },
    {
        name: "Date d'emprunt",
        selector: row => row.dateBorrowing,
    },
    {
        name: 'Date de retour',
        selector: row => row.dateReturn,
    },
    {
        name: 'Jours de retard',
        selector: row => row.lateReturnDay,
    },
    {
        name: 'Retourné',
        selector: row => row.returned,
    },
];

export default function HomeClient({}){
    const dataClient = useLocation().state.client;
    const [client, setClient] = React.useState([dataClient]);
    const [borrowDocs, setBorrowDocs] = React.useState([]);

    ClientDataService.getBorrowDocsById(client[0].id).then(
        response => {
            return setBorrowDocs(response.data);
        }
    );


    return(
        <>
            <Header headerFor={'client'}/>
            <div>
                <br/><br/>
                <h1> Compte Client : </h1>
                <DataTable
                    columns={columnsClient}
                    data={client}
                />
                <br/><br/>
                <h1>Emprunt :</h1>
                <DataTable
                    columns={columnsBorrowDocs}
                    data={borrowDocs}
                />
                

            </div>

        </>
    )

}