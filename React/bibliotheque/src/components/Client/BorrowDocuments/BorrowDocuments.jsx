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
    useEffect(() => {fetchData()},[data]);

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
];


export default function BorrowDocuments(){
    const dataClient = useLocation().state.client;
    const [client, setClient] = React.useState(dataClient);
    const [borrowDocs, fetchData] = useFetch(client[0].id);
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    const rowDisabledCriteria = row => row.returned;

  
    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows.map(row => {
            return {...row, ['returned']: true}
        }));
    };

    const handleReturnBorrowDocs = () => {
        console.log(selectedRows);
        ClientDataService.returnBorrowDocs(selectedRows);
        setSelectedRows(false);
        setToggleClearRows(!toggledClearRows);
        fetchData();
      }

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
                <br/><br/>
                <h2> List d'emprunts</h2>
                        
                        <DataTable
                            columns={columnsBorrowDocs}
                            data={borrowDocs}
                            selectableRows
                            selectableRowDisabled={rowDisabledCriteria}
                            onSelectedRowsChange={handleChange}
                            clearSelectedRows={toggledClearRows}
                            striped
                            pagination
                        />

                        {selectedRows != false && 
                            <button onClick={handleReturnBorrowDocs}>
                                Retourné Emprunt
                            </button>
                        }
                
                </div>
                
            }
        </>
    )
}