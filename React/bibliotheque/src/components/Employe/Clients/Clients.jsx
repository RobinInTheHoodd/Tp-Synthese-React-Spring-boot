import React,  { useEffect, useState } from "react";
import Header from "../../Header/Header";
import {useLocation} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService";
import EditClient from "../../Client/Home/EditClient"
import { AiFillCheckCircle, AiOutlineConsoleSql } from "react-icons/ai";
import { ImCross } from "react-icons/im"
import EmployeDateService from "../../../Service/EmployeDateService";
 
const columnsClient = (handleButtonClick, handleButtonBorrows, handleButtonBills) => [ 
    {          
        cell: (row) => <button onClick={() => handleButtonClick(row)}>Modifier</button>,
        name: 'Modification',
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Prénom',
        selector: row => row.firstName,
        sortable: true
    },
    {
        name: 'Nom',
        selector: row => row.secondName,
        sortable: true
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true
    },
    {
        name: 'password',
        selector: row => row.password,
    },
    {
        name: 'Numéro de téléphone',
        selector: row => row.phoneNumber,
        sortable: true
    },
    {
        name: 'Anniversaire',
        selector: row => row.bitrhday,
        sortable: true
    },
    {
        name: 'Solde',
        selector: row => row.fine + ' $',
        sortable: true
    },
    {          
        cell: (row) => <button onClick={() => handleButtonBorrows(row)}>Emprunts</button>,
        name: 'Emprunts',
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
    {          
        cell: (row) => <button onClick={() => handleButtonBills(row)}>Factures</button>,
        name: 'Factures',
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

export const columnsBill = [
    {
        name: 'id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Montant',
        selector: row => row.amount,
    },
    {
        name: 'a payé',
        selector: row => row.paid,
    },
    {
        name: 'payé le',
        selector: row => row.paidOn,
    },
];

export const columnsBorrowDocs = [
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
            
            let dateNow = new Date().getTime();
            let difference = Math.abs(dateNow - new Date(row.dateReturn).getTime());
            let dayToMilisecond = 86400000
            let daysLate = Math.trunc(difference/dayToMilisecond);


            if( new Date() > new Date(row.dateReturn) && row.returned == false ){
                row.lateReturnDay = daysLate;
                return daysLate;
            } else if (row.lateReturnDay != 0){
                return row.lateReturnDay;   
            } else return "/";
            
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

export const columnsDocuments = [
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
];

const customStyles = {
    rows: {
        style: {
            minHeight: '72px', 
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
};


const useFetch = (id) => {
    const [data, setData] = useState(false);
    
    async function fetchData() {
        let response;
        response = await EmployeDateService.getClients(id);
        const json = await response.data;
        setData(json);
    }

    useEffect(() => {fetchData()},[data]);

    return [data, fetchData];
};


export default function Clients({}){

    const dataEmploye = useLocation().state.user;
    const [employe, setEmploye] = useState(dataEmploye);
    const [client, fetchData] = useFetch(employe[0].id)
    const [editClient, setEditClient] = useState(false);
    const [borrowDocsClient, setborrowDocsClient ] = useState(false);
    const [billsClient, setBillsClient ] = useState(false);


 
    useEffect(() => {
        setEditClient()
    }, []);



    const handleChangeNewClient = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value);
        setEditClient(editClient => ({...editClient, [name]: value}));
    }

    const handleChangeAddressNewClient = (event) => {
        const name = event.target.name.split(".")[1];
        const address = event.target.name.split(".")[0];
        const value = event.target.value;
        setEditClient({...editClient,
            [address]: {...editClient.address, [name]: value}});        
    }

    
    const handleSubmitNewClient = (event) => {
        event.preventDefault();
        
        EmployeDateService.updateClient(editClient, employe[0].id).
        then(
            response => {
                fetchData(employe[0].id);
            }
        )
        setEditClient(false);
    };
    
    const handleButtonClick = (row) => {
        setEditClient(row);
        EmployeDateService.getBorrowsDocByIdClient({id: row.id}, employe[0].id).
        then(
            response => {
                console.log(response.data);
                setborrowDocsClient(response.data);
            }
        );
       
        EmployeDateService.getBillsByIdClient({id: row.id}, employe[0].id).
        then(
            response => {
                console.log(response.data);
                setBillsClient(response.data);
            }
        );
    }
    
    const handleButtonBorrows = (row) =>{
        
       
    }

        
    const handleButtonBills = (row) =>{
        
       
    }

    const handleButtonCancel = () => {
        setEditClient(false);
        setborrowDocsClient(false);
        setBillsClient(false);
    }

    
    return(
        <>
            <Header 
                headerFor={'employe'}
                user={employe}
            />
            {
                client && 
                <div>
                <br/><br/>
                <h1> Compte Client : </h1>
                <DataTable
                    columns={columnsClient(handleButtonClick, handleButtonBorrows, handleButtonBills)}
                    data={client}
                    customStyles={customStyles}
                    pagination
                    dense
                />

                <div className="editClientContainer">
                    {editClient &&
                        <>
                            <div className="container"> 
                            <ImCross onClick={() => handleButtonCancel()} style={{'color': 'red'}}/>
                                <EditClient 
                                    handleChange={handleChangeNewClient}
                                    handleSubmit={handleSubmitNewClient}
                                    handleChangeAddress={handleChangeAddressNewClient}
                                    handleCancel={handleButtonCancel}
                                    client={editClient}
                                />
                            </div>
                            <div className="container"> 
                                <h1>Emprunt :</h1>
                                <DataTable
                                    columns={columnsBorrowDocs}
                                    data={borrowDocsClient}
                                    customStyles={customStyles}
                                    striped
                                    dense
                                />
                            </div> 
                            <div className="container"> 
                                <h1>Facture :</h1>
                                <DataTable
                                    columns={columnsBill}
                                    data={billsClient}
                                    customStyles={customStyles}
                                    striped
                                    dense
                                />
                            </div>   
                        </>
                    }
                </div>
                <br/><br/>
            </div>
            
            }
        </>
    )

}
