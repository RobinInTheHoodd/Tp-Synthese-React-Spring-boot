import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ClientDataService from "../../../Service/ClientDataService";
import Header from "../../Header/Header"
import DataTable from 'react-data-table-component';
import { AiFillCheckCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im"


const useFetch = (id) => {
    const [data, setData] = useState(null);
    
    async function fetchData() {
        let response;
        response = await ClientDataService.getBorrowDocsById(id);
        const json = await response.data;
        setData(json);
    }
    useEffect(() => {fetchData()},[]);

    return [data, fetchData];
};

const columnsBorrowDocs = [
    {
        name: 'id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Document',
        selector: row => row.document,
        omit: true,
    },
    {
        name: "Date d'emprunt",
        selector: row => row.dateBorrowing,
        sortable: true,
        
    },
    {
        name: 'Retour prêvu le',
        selector: row => row.dateReturn,
        sortable: true,
    },
    {
        
        name: 'Jour de retard',
        selector: row => {
            var difference= Math.abs(new Date(row.dateReturn)-new Date(row.dateBorrowing));
            let days = difference/(1000 * 3600 * 24)
            return days;
        },
        sortable: true,
    },
    {
        name: 'Retourné',
        selector: (row) => {
            if(row.returned == false){
                return <ImCross style={{color: 'red'}} size={30}/>
            }else {
                return <AiFillCheckCircle style={{color: 'green'}} size={30}/>
            }
        },
    },
    {          
        name:"Retourner",
        cell: (row) => row.returned == false && <button> Retourner</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    
    },
];


export default function BorrowDocuments(){
    const dataClient = useLocation().state.client;
    const [client, setClient] = React.useState(dataClient);
    const [borrowDocs, fetchData] = useFetch(client[0].id);

    return(
        <>
            <div>
                <Header 
                    headerFor={'client'} 
                    clients={client}
                />
            </div>

            {
                borrowDocs &&
                <div className="containerBorrowDocs">                    
                        <DataTable
                            columns={columnsBorrowDocs}
                            data={borrowDocs}
                            striped
                            pagination
                        />
                
                </div>
                
            }
            {console.log(borrowDocs)}

        </>
    )
}