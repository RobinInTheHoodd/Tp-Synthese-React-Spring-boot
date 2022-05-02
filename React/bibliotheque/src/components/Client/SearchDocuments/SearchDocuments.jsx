import Header from "../../Header/Header"
import {useLocation} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import React from "react";
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService"; 

import FormSearchDoc from "./FormSearchDoc";
import { columnsDocuments } from "../Home/HomeClient";



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
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    const [searchBar, setSearchBar] = useState({
        type: "all",
        title: 'false',
        author: 'false',
        editor: 'false',
        genre: 'false',
        research: ''
    });
    const [documents, fetchData] = useFetch(client[0].id);
    
    
    
    const rowDisabledCriteria = row => row.exemplary <= 1;

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

    const handleChangeBorrow = ({ selectedRows }) => {
        setSelectedRows(selectedRows.map(row => {      
            let day = new Date().getUTCDate();
            let month = new Date().getMonth();
            let year = new Date().getUTCFullYear();
            return {
                id: '',
                client: client[0],
                document: row,
            }
        }));
    };

    const handleBorrow = () => {
        ClientDataService.addBorrowDocs(selectedRows, client[0].id)
        console.log(selectedRows)
        setSelectedRows(false);
        setToggleClearRows(!toggledClearRows);    
      }

      
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
                            title={"Documents :"}
                            columns={columnsDocuments}
                            data={documents}
                            selectableRows
                            selectableRowDisabled={rowDisabledCriteria}
                            onSelectedRowsChange={handleChangeBorrow}
                            clearSelectedRows={toggledClearRows}
                            striped
                            pagination
                            defaultSortFieldId={2}
                        />
                    </div>
                    <div>
                    {
                        (selectedRows != false) &&
                            <button onClick={handleBorrow}>
                            Emprunter
                            </button> 
                            
                    }
                    </div>
                </>
            }
        </>
    )
}