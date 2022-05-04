import Header from "../../Header/Header"
import {useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from "react";
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService"; 
import FormSearchDoc from "../../Client/SearchDocuments/FormSearchDoc";
import FormDocument from "./FormDocument";
import EmployeDateService from "../../../Service/EmployeDateService";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from "../../utils/Modal";
import ModalClients from "./ModalClients";

const modelDocument = {
    id: '',
    type: '',
    title: '',
    author: '',
    editor: '',
    dateOfPublication: '',
    numberPage: '',
    exemplary: '',
    genre: ''
}


export const columnsDocuments = (buttonEditDocument, buttonDeleteDocument) => [
    {          
        cell: (row) => <button onClick={() => buttonEditDocument(row)}> Modifier</button>,
        name: 'Modifier',
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
        cell: (row) => <BsFillTrashFill onClick={() => buttonDeleteDocument(row)} style={{'color': 'red'}} size={20}/>,
        name: 'Supprimer',
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];



const useFetch = (idEmploye) => {
    const [data, setData] = useState(null);
    
    async function fetchData(search) {
        let response;
        if(search === undefined){
            response = await EmployeDateService.getDocuments(idEmploye);
        } else response = await ClientDataService.searchDocument(search ,idEmploye);
        const json = await response.data;
        setData(json);
    }
    useEffect(() => {fetchData()},[]);

    return [data, fetchData];
};

export default function SearchDocumentsEmploye(){ 
    const dataEmploye = useLocation().state.user;
    const [employe, setemploye] = React.useState(dataEmploye);
    const [selectedDocument, setSelectedDocument] = React.useState(false);
    const [documentsForBorrow, setDocumentsForBorrow] = React.useState(false);
    const [newBorrow, setNewBorrow] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [clients, setClients] = useState(false);
    const [client, setClient] = useState(false);

    const [searchBar, setSearchBar] = useState({
        type: "all",
        title: 'false',
        author: 'false',
        editor: 'false',
        genre: 'false',
        research: ''
    });
    const [documents, fetchData] = useFetch(employe[0].id);
    const [ newDocument, setNewDocument] = React.useState(false);
    
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

    const buttonEditDocument = (selectedDocument) => {
        setSelectedDocument(selectedDocument);
    };

    const buttonDeleteDocument = (document) => {
        EmployeDateService.deleteDocument(document, employe[0].id).
        then(
            () => {
                fetchData();
            }
        )
    };
    
    const handleSubmitDocument = (event) => {
        event.preventDefault();
        if(selectedDocument){
            EmployeDateService.addDocument(selectedDocument, employe[0].id).
            then(
                () => {
                    fetchData();
                }
            );
        } else{
            EmployeDateService.addDocument(newDocument, employe[0].id).
            then(
                () => {
                    fetchData();
                }
            );
        }
        setNewDocument(false);
        setSelectedDocument(false);
    }

        
    const handleChangeEditDocument = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setSelectedDocument(values => ({...values, [name]: value}));
    }


    const handleSelectDocuments = ({ selectedRows }) => {
        setDocumentsForBorrow(selectedRows);
        console.log(selectedRows);
    };
       
    
    const chooseClient = () => {
        EmployeDateService.getClients(employe[0].id).
        then( 
            response => {
                setClients(response.data);
            }
        )
        setIsOpen(true);        
    }


    const handleCancel = () => {
        setSelectedDocument(false);

    }

    const buttonNeDocument = () => {
        setNewDocument(modelDocument);

    }

    const handleChangeNewDocument = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;   
        setNewDocument(newDocument => ({...newDocument, [name]: value}));
    }

    const handleSelectClient = ({selectedRows}) => {
        setClient(selectedRows);
    }

    const submitNewBorrow = () => {
        console.log(client);
        EmployeDateService.addBorrows(employe[0].id ,{
            idClient : client[0].id,
            documents: documentsForBorrow
        })

        setClient(false);
        setIsOpen(false);
        setDocumentsForBorrow(false);
    }

    const navigate = useNavigate();
    const BorrowPages = () => 
    {
        return navigate('/client/borrowDocs', 
        {
            replace: true,
            state: {
                user: employe,
            }        
        }) 
    };
      
    return(
        
        <>
            <Header
                headerFor={'employe'}
                user={employe}
            />
            <br/><br/><br/><br/>

            {documents && 
                <>  
                    <div className="container_document">  
                    <h2>Documents :</h2>
                    <div>
                        <FormSearchDoc 
                            searchBar={searchBar}
                            handleChange={handleChangeSearchBar}
                            handleSubmit={HandleSubmitSearchBar}
                        />
                    </div>
                    <br/><br/>
                    <AiFillPlusCircle onClick={() => buttonNeDocument()} style={{'paddingLeft': '14px', 'cursor': 'pointer'}} size={40}/>                  
                        <DataTable
                            columns={columnsDocuments(buttonEditDocument, buttonDeleteDocument)}
                            data={documents}
                            selectableRows
                            selectableRowDisabled={rowDisabledCriteria}
                            onSelectedRowsChange={handleSelectDocuments}
                            clearSelectedRows={toggledClearRows}
                            striped
                            pagination
                            defaultSortFieldId={2}
                        />
                    </div>
                    <div>
                        {selectedDocument &&
                            <div className="container">
                                <div className="containerEditDocument">
                                    <FormDocument 
                                        handleCancel={handleCancel}
                                        handleSubmit={handleSubmitDocument}
                                        handleChangeDocument={handleChangeEditDocument}
                                        document={selectedDocument}
                                    />  
                                </div>

                            </div>
                        }
                    </div>
                    <div>
                        {(documentsForBorrow != false) &&
                            <button onClick={chooseClient}>Emprunter</button>
                            

                        }
                        { isOpen && 
                                    <ModalClients 
                                        setIsOpen={setIsOpen}
                                        Clients={clients}
                                        handleSelectClient={handleSelectClient}
                                        submitBorrow={submitNewBorrow}
                                    />
                                }
                        {newBorrow &&
                            <div className="contaier">
                                <div className="containerNewBorrow">
                                    <DataTable
                                        title
                                    />
                                        
                                </div>
                            </div>

                        }
                    </div>
                    <div>
                        {newDocument &&
                            <div className="container">
                                <div className="containerNewDocument">
                                    <FormDocument 
                                        handleCancel={handleCancel}
                                        handleSubmit={handleSubmitDocument}
                                        handleChangeDocument={handleChangeNewDocument}
                                        document={newDocument}
                                    />  
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}