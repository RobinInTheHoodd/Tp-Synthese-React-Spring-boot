import React,  { useEffect } from "react";
import Header from "../../Header/Header";
import {useLocation} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService";
import EditClient from "./EditClient";
 
const columnsClient = (handleButtonClick) => [ 
    {          
        cell: () => <button onClick={handleButtonClick}>Modifier</button>,
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
        selector: row => Date(row.bitrhday),
    },
    {
        name: 'Solde',
        selector: row => row.fine + ' $',
    },
];

const columnsBill = [
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
        name: 'Date de retour prévue',
        selector: row => row.dateReturn,
        conditionalCellStyles:[
            {
                when: row => {
                    const date = new Date(row.dateReturn)
                    if(date < Date.now()){
                      return true;        
                    } 
                  },
                style: {
                  backgroundColor: 'red',
                },
            },
        ]
    },
    {
        
        name: 'Jours de retard',
        selector: row => row.lateReturnDay,
    },
    {
        name: 'Retourné',
        selector: (row) => { 
            if(row.returned){
                return "true";
            } else return "false";
        }
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


export default function HomeClient({}){
    const dataClient = useLocation().state.client;

    const [client, setClient] = React.useState(dataClient);
    const [editClient, setEditClient] = React.useState(false);

    const [borrowDocs, setBorrowDocs] = React.useState(false);
    const [bills, setBills] = React.useState(false);


    const getBorrowDocs = () => {
        ClientDataService.getBorrowDocsById(client[0].id).then(
            response => { 
                return setBorrowDocs(response.data);
            }
        );
    }

    const getBills = () => {
        ClientDataService.getBills(client[0].id).then(
            response => { 
                return setBills(response.data);
            }
        );
    }

    useEffect(() => {
        setBorrowDocs(getBorrowDocs());
        setBills(getBills())
    }, [client]);




    const handleChangeNewClient = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditClient(editClient => ({...editClient, [name]: value}));
        console.log(editClient);
    }
    
    const handleSubmitNewClient = (event) => {
        event.preventDefault();
        
        ClientDataService.editClient(editClient, client[0].id).
        then(
            response => {
                setClient([response.data]);
            }
        )
        setEditClient(false);
    };
    


    const handleButtonClick = () => {
        setEditClient(client[0]);
    }


    
    return(
        <>
            <Header 
                headerFor={'client'}
                clients={client}
            />
            <div>
                <br/><br/>
                <h1> Compte Client : </h1>
                <DataTable
                    columns={columnsClient(handleButtonClick)}
                    data={client}
                    customStyles={customStyles}
                    dense
                />
                <div className="editClientContainer">

                    {
                    editClient &&
                        <div className="container"> 
                        <EditClient 
                            handleChange={handleChangeNewClient}
                            handleSubmit={handleSubmitNewClient}
                            client={editClient}
                        />
                        </div>    
                    }
                </div>
                <br/><br/>
                <h1>Emprunt :</h1>
                <DataTable
                    columns={columnsBorrowDocs}
                    data={borrowDocs}
                    customStyles={customStyles}
                    striped
                    dense
                />
            
                <br/><br/>
                <h1>Facture :</h1>
                <DataTable
                    columns={columnsBill}
                    data={bills}
                    customStyles={customStyles}
                    striped
                    dense
                />
            </div>
        </>
    )

}