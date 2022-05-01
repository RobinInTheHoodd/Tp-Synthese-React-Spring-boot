import Header from "../../Header/Header"
import {useLocation} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import React from "react";
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService"; 

import FormSearchDoc from "./FormSearchDoc";

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
        conditionalCellStyles:[
            {
                when: row => {
                    if(row.exemplary > 1){
                      return true;        
                    } 
                  },
                style: {
                  disabled: 'true',
                },
            },
        ]
    },
    {          
        name:"Emprunter",
        cell: (row) => row.exemplary > 1 && <button> Emprunter</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    
    },
];

const useFetch = (id) => {
    const [data, setData] = useState(null);
    
    async function fetchData(search) {
        let response;
        if(search === undefined){
            response = await ClientDataService.getDocuments(id);
        } else response = await ClientDataService.searchDocument(search ,id);
        const json = await response.data;
        setData(json);
    }
    useEffect(() => {fetchData()},[]);

    return [data, fetchData];
};

export default function SearchDocuments(){ 

    const dataClient = useLocation().state.client;
    const [client, setClient] = React.useState(dataClient);

    const [searchBar, setSearchBar] = useState({
        type: "all",
        title: 'false',
        author: 'false',
        editor: 'false',
        genre: 'false',
        research: ''
    });

    const [documents, fetchData] = useFetch(client[0].id);

    const handleChangeSearchBar = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const check = event.target.checked;
        if(name === 'research' || name === 'type'){
            setSearchBar(values => ({...values, [name]: value}));
        } else setSearchBar(values => ({...values, [name]: check.toString()}));
        
    }

    const HandleSubmitSearchBar = (event) => {
        event.preventDefault();
        fetchData(searchBar);
    };


    return(
        <>
            <Header
                headerFor={'client'}
                clients={client}
            />
            <br/><br/><br/><br/>

            {documents && 
                <>  
                    <div>
                        <FormSearchDoc 
                            searchBar={searchBar}
                            handleChange={handleChangeSearchBar}
                            handleSubmit={HandleSubmitSearchBar}
                        />
                    </div>
                    <br/><br/>
                    <div className="container_document">                    
                        <DataTable
                            columns={columnsDocuments}
                            data={documents}
                            striped
                            pagination
                            defaultSortFieldId={2}
                        />
                    </div>
                </>
            }
        </>
    )
}