import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ClientDataService from "../../../Service/ClientDataService";
import Header from "../../Header/Header"
import DataTable from 'react-data-table-component';
import { AiFillCheckCircle, AiOutlineConsoleSql } from "react-icons/ai";
import { ImCross } from "react-icons/im"
import { columnsDocuments } from "../Home/HomeClient";
import { columnsBorrowDocs } from "../Home/HomeClient";


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

const customStyles = {
    header: {
        style: {
            minHeight: '80px',
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: 'black',
        },
    },
    Cells: {
        style:{
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: 'black',
        },
    },
};

export default function BorrowDocuments(){
    const dataClient = useLocation().state.client;
    const [client, setClient] = React.useState(dataClient);
    const [borrowDocs, fetchData] = useFetch(client[0].id);
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);


    const rowDisabledCriteria = row => row.returned;

    const ExpandedComponent = ({ data }) => 
    <pre style={{'width': 1000+'px', 'paddingLeft': '20px'}}>
        <h3>Document :</h3>
        <DataTable 
            columns={columnsDocuments}
            data={[data.document]}
            customStyles={customStyles}
        />
        <hr/>
        <br/>
        {
            data.lateReturnDay > 0 &&
                <>
                    <hr/>
                    <h3>Solde du retard : {getSoldeLateReturn(data)}$</h3>  
                    <hr/>
                </>
        }
        <br/>
        
        
    </pre>;

    const getSoldeLateReturn = (data) => {
        return data.lateReturnDay * 0.25;
    }
  
    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows.map(row => {
            return {...row, ['returned']: true}
        }));
    };

    const contextActions = React.useMemo(() => {
        
        const handleReturnBorrowDocs = () => {
            console.log(selectedRows);
            ClientDataService.returnBorrowDocs(selectedRows).then(
                () =>{
                    setSelectedRows(false);
                    setToggleClearRows(!toggledClearRows);
                    fetchData();
                }
            );
        }
        return(
            <button onClick={handleReturnBorrowDocs}>
                Retourné Emprunt
            </button>
        )
    }, [borrowDocs, selectedRows, toggledClearRows])

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
                    <DataTable
                        title={"List d'emprunts :"}
                        columns={columnsBorrowDocs}
                        data={borrowDocs}
                        selectableRows
                        contextActions={contextActions}
                        selectableRowDisabled={rowDisabledCriteria}
                        onSelectedRowsChange={handleChange}
                        clearSelectedRows={toggledClearRows}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        striped
                        pagination
                    />
                    <br/><br/>
                    <Link to={"/client/searchDocuments"} state={{client: client,}}>Emprunter un Document</Link> 
                       
                </div>
                
                
            }
        </>
    )
}