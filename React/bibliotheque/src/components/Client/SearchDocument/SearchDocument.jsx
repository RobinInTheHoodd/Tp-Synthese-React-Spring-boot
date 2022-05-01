import Header from "../../Header/Header"
import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from "react";
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService";

const columnsDocuments = [
    {
        name: 'id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
    },
    {
        name: "Titre",
        selector: row => row.title,
        sortable: true,
        
    },
    {
        name: 'Autheur',
        selector: row => row.author,
        sortable: true,
    },
    {
        
        name: 'Editor',
        selector: row => row.editor,
        sortable: true,
    },
    {
        name: 'date de publication',
        selector: (row) => row.dateOfPublication,
        sortable: true,
    },
    {
        name: 'Nombre de page',
        selector: (row) => row.numberPage,
        sortable: true,
    },
    {
        name: 'Exemplaire',
        selector: (row) => row.exemplary,
        sortable: true,
    },
];

const useFetch = (id) => {
    const [data, setData] = useState(null);
    
    async function fetchData() {
      const documents = await fetchDataDocument().then(
          response =>{
              return response;
          }
      );
      setData(documents);
    }
  
    async function fetchDataDocument(){
    const response = await ClientDataService.getDocuments(id);
      const json = await response.data
      return json;
    }  

    useEffect(() => {fetchData()},[]);

    return data;
};

export default function SearchDocument(){ 

    const dataClient = useLocation().state.client;
    const [client, setClient] = React.useState(dataClient);
    const documents = useFetch(client[0].id);

    if(!documents){
        return <div>Loading</div>
      } else {
        return(
            <>
                <Header
                    headerFor={'client'}
                    clients={client}
                />
                <div className="container_document">                    
                    <DataTable
                        columns={columnsDocuments}
                        data={documents}
                        striped
                        selectableRows
                        selectableRowsSingle
                        pagination
                        dense
                    />
                </div>
            </>
        )
    }
}