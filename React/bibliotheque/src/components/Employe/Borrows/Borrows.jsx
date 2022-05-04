import Header from "../../Header/Header"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import EmployeDateService from "../../../Service/EmployeDateService";
import DataTable from "react-data-table-component";
import { AiFillCheckCircle, AiFillPlusCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BsFillTrashFill } from "react-icons/bs";
import FormBorrow from "./FormBorrows";

const columnsBorrowDocs = (handleEditBorrow) => [
    {          
        cell: (row) => <button onClick={() => handleEditBorrow(row)} >Modifier</button>,
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
    {          
        cell: (row) => <BsFillTrashFill style={{'color': 'red'}} size={20}/>,
        name: 'Supprimer',
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];



const useFetch = (id, client) => {
    const [data, setData] = useState(false);
    async function fetchData() {
        let response;
        if(!client){
            response = await EmployeDateService.getBorrowsDoc(id);    
        } else response = await EmployeDateService.getBorrowsDocByIdClient(client, id)
        const json = await response.data;
        setData(json);
    }

    useEffect(() => {fetchData()},[data]);

    return [data, fetchData];
};

export default function Borrows() {

    const dataEmploye = useLocation().state.user;
    const dataClient = useLocation().state.client;


    const [employe, setEmploye] = React.useState(dataEmploye);

    const [borrows, fetData] = useFetch(employe[0].id, dataClient);
    const [editBorrow, setEditBorrow] = useState(false);

    const handleEditBorrow = (selectedBorrow) => {
        setEditBorrow(selectedBorrow);
        
    }
    const handleCancel = () =>{
        setEditBorrow(false);
    }
    const handleChangeEditBorrow = (event) =>{
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const checked = event.target.checked;
        if(name == "returned"){
            setEditBorrow({...editBorrow, [name]: checked});    
        }
        else setEditBorrow(values => ({...values, [name]: value}));
        
    }
    

    const [isOpenModalDocument, setOpenModalDocument ] = useState(false);
    const [document, setDocument ] = useState(false);
    const [selectedDocument, setSelectedDocument ] = useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    
    const [isOpenModalClient, setOpenModalClient ] = useState(false);
    const [clients, setClients ] = useState(false);
    const [selectedClient, setSelectedClient ] = useState(false);
    

    
    

    useEffect(() => {
        setEditBorrow();
    }, []);


    const selectDocumentModal = ({selectedRows}) => {
        setSelectedDocument(selectedRows);
    }
    const submitDocument = () => {
        setEditBorrow({...editBorrow, document: selectedDocument[0]})
        setSelectedDocument(false);
        setOpenModalDocument(false); 
    }
    const OnpenModalDocument = (event) =>{
        event.preventDefault();
        EmployeDateService.getDocuments(employe[0].id).
        then(
            response => {
                setDocument(response.data);
            }
        );
        setOpenModalDocument(true);
    }



    const selectClientModal = ({selectedRows}) => {
        setSelectedClient(selectedRows);
    }
    const submitClient = (event) => { 
        event.preventDefault();
        setEditBorrow({...editBorrow, clients: selectedClient[0]})
        setSelectedClient(false);
        setOpenModalClient(false); 
    }
    const OnpenModalClient = (event) =>{
        event.preventDefault();
        EmployeDateService.getClients(employe[0].id).
        then(
            response => {
                setClients(response.data);
            }
        );
        setOpenModalClient(true);
    }


    const sumbitEditBorrow = (event) =>{
        event.preventDefault();
        console.log(editBorrow);
        EmployeDateService.editBorrows(employe[0].id, editBorrow).
        then(
            () => {
                setEditBorrow(false);
            }
        );
    }


    const expandableBorrows = ({data}) => {
        return(
            <>  
                <h3>Document</h3>
                <pre>{"{ \n"+ JSON.stringify(data.document, null, 2).substring(15)}</pre> 
                {dataClient != null &&
                    <pre>{"{ \n"+ JSON.stringify(dataClient, null, 2).substring(15)}</pre> 
                }
            </>
        )
    }

    const navigate = useNavigate();
    const seeBorrows = () => {
        return navigate('/employe/borrowDocs',
            {
                replace: true,
                state: {
                    user: employe,
                }
            })
    }
    return(
        <>
            <Header 
                headerFor={'employe'}
                user={employe}
            />
            
            { dataClient != null &&
                <>
                    <h2>Emprunt du Client : {dataClient.firstName} {dataClient.secondName}</h2>
                    <button onClick={() => seeBorrows()}>Tous les Emprunts</button>
                </>
            }
            <div className="containerBorrows">
                {   borrows &&
                    <DataTable
                        columns={columnsBorrowDocs(handleEditBorrow)}
                        data={borrows}
                        expandableRows
                        expandableRowsComponent={expandableBorrows}
                        pagination
                        striped
                        dense
                    />
                }
                {   editBorrow &&
                    <div className="container">
                        <FormBorrow
                            handleSubmit={sumbitEditBorrow}
                            borrow={editBorrow}
                            handleChangeBorrow={handleChangeEditBorrow}
                            handleCancel={handleCancel}
                            
                            OnpenModalDocument={OnpenModalDocument}
                            setOpenModalDocument={setOpenModalDocument}
                            document={document}
                            isOpenModalDocument={isOpenModalDocument}
                            selectDocumentModal={selectDocumentModal}
                            submitDocument={submitDocument}

                            OnpenModalClient={OnpenModalClient}
                            setOpenModalClient={setOpenModalClient}
                            clients={clients}
                            selectClientModal={selectClientModal}
                            isOpenModalClient={isOpenModalClient}
                            submitClientModal={submitClient}

                            
                            
                            
                        />
                    </div>  
                }
            </div>
        </>
    )
}