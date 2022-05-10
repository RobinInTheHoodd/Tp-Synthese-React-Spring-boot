import Header from "../../Header/Header"
import {useLocation, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService";
import FormSearchDoc from "../../Form/FormSearchDoc";
import FormDocument from "../../Form/FormDocument";
import EmployeDateService from "../../../Service/EmployeDateService";
import {BsFillTrashFill} from "react-icons/bs";
import {AiFillPlusCircle} from "react-icons/ai";
import ModalTable from "../../utils/ModalTable";
import {columnsClients} from "../../Client/Home/HomeClient";

const modelDocument = {
    id: '', type: '', title: '', author: '', editor: '', dateOfPublication: '', numberPage: '', exemplary: '', genre: ''
}
export const columnsDocuments = (buttonEditDocument, buttonDeleteDocument) => [{
    cell: (row) => <button onClick={() => buttonEditDocument(row)}> Modifier</button>,
    name: 'Modifier',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
}, {
    name: 'id', selector: row => row.id, omit: true,
}, {
    name: 'Type', selector: row => row.type, sortable: true,
}, {
    name: "Titre", selector: row => row.title, sortable: true,

}, {
    name: 'Autheur', selector: row => row.author, sortable: true,
}, {

    name: 'Editor', selector: row => row.editor, sortable: true,
}, {
    name: 'date de publication', selector: (row) => row.dateOfPublication, sortable: true,
}, {
    name: 'Nombre de page', selector: (row) => row.numberPage, sortable: true,
}, {
    name: 'Exemplaire', selector: (row) => row.exemplary, sortable: true, conditionalCellStyles: [{
        when: row => {
            if (row.exemplary > 1) {
                return true;
            }
        }, style: {
            disabled: 'true',
        },
    },]
}, {
    cell: (row) => <BsFillTrashFill onClick={() => buttonDeleteDocument(row)} style={{'color': 'red'}} size={20}/>,
    name: 'Supprimer',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
},];

const DisabledSelectDocumentCriteria = row => row.exemplary <= 1;

const useFetch = (idEmploye) => {
    const [document, setDocument] = useState(null);

    async function fetchDataDocuments(search) {
        let response;
        if (search === undefined) {
            response = await EmployeDateService.getDocuments(idEmploye);
        } else response = await ClientDataService.searchDocument(search, idEmploye);
        const json = await response.data;
        setDocument(json);
    }

    useEffect(() => {
        fetchDataDocuments()
    }, []);

    return [document, fetchDataDocuments];
};

export default function SearchDocumentsEmploye() {
    const dataEmploye = useLocation().state.user;
    const [employe] = React.useState(dataEmploye);

    const [isOpenModalClient, setIsOpenModalClient] = useState(false);
    const [modalClients, setModalClients] = useState(false);
    const [clientForBorrow, setClientForBorrow] = useState(false);

    const [documents, fetchDataDocuments] = useFetch(employe[0].id);
    const [newDocument, setNewDocument] = React.useState(false);
    const [documentsForBorrow, setDocumentsForBorrow] = React.useState(false);
    const [selectedEditDocument, setSelectedEditDocument] = React.useState(false);

    const [searchBar, setSearchBar] = useState({
        type: "all", title: false, author: false, editor: false, genre: false, research: ''
    });


    const [toggledClearRows, setToggleClearRows] = React.useState(false);


    const handleChangeSearchBar = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const check = event.target.checked;
        if (name === 'research' || name === 'type') {
            setSearchBar(values => ({...values, [name]: value}));
        } else {
            setSearchBar({...searchBar, [name]: check});
        }
    }

    const submitSearchBar = (event) => {
        event.preventDefault();
        fetchDataDocuments(searchBar);
    };

    const buttonEditDocument = (selectedDocument) => {
        setSelectedEditDocument(selectedDocument);
    };

    const buttonNewDocument = () => {
        setNewDocument(modelDocument);
    }

    const buttonDeleteDocument = (document) => {
        EmployeDateService.deleteDocument(document, employe[0].id).then(() => {
            fetchDataDocuments();
        })
    };

    const handleChangeEditDocument = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setSelectedEditDocument(values => ({...values, [name]: value}));
    }

    const handleChangeNewDocument = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setNewDocument(newDocument => ({...newDocument, [name]: value}));
    }

    const submitDocument = (event) => {
        event.preventDefault();
        if (selectedEditDocument) {
            EmployeDateService.addDocument(selectedEditDocument, employe[0].id).then(() => {
                fetchDataDocuments();
            });
        } else {
            EmployeDateService.addDocument(newDocument, employe[0].id).then(() => {
                fetchDataDocuments();
            });
        }
        setNewDocument(false);
        setSelectedEditDocument(false);
    }

    const OpenModalClient = () => {
        EmployeDateService.getClients(employe[0].id).then(response => {
            setModalClients(response.data);
        })
        setIsOpenModalClient(true);
    }

    const selectDocumentsForBorrow = ({selectedRows}) => {
        setDocumentsForBorrow(selectedRows);
    };

    const selectClientModal = ({selectedRows}) => {
        setClientForBorrow(selectedRows);
    }

    const handleCancel = () => {
        setSelectedEditDocument(false);
        setNewDocument(false);
    }

    const submitNewBorrow = () => {
        EmployeDateService.addBorrows(employe[0].id, {
            idClient: clientForBorrow[0].id, documents: documentsForBorrow
        }).then(() => {

            setModalClients(false);
            setDocumentsForBorrow(false);
            setIsOpenModalClient(false);
            setToggleClearRows(!toggledClearRows);
            BorrowPages();
            fetchDataDocuments();
        })


    }


    const navigate = useNavigate();
    const BorrowPages = () => {
        return navigate('/employe/borrowDocs', {
            replace: true, state: {
                user: employe,
                client: clientForBorrow[0]
            }
        })
    };

    return (
        <>
            <Header
                headerFor={'employe'}
                user={employe}
            />
            <br/><br/><br/><br/>

            {documents && <div className="contentContainer">
                <div className="container_document">
                    <h2>Documents :</h2>
                    <div className="searchContainer">
                        <FormSearchDoc
                            searchBar={searchBar}
                            handleChange={handleChangeSearchBar}
                            handleSubmit={submitSearchBar}
                        />
                    </div>
                    <br/><br/>
                    <AiFillPlusCircle
                        onClick={() => buttonNewDocument()}
                        style={{'paddingLeft': '14px', 'cursor': 'pointer'}}
                        size={40}
                    />
                    <DataTable
                        columns={columnsDocuments(buttonEditDocument, buttonDeleteDocument)}
                        data={documents}
                        selectableRows
                        selectableRowDisabled={DisabledSelectDocumentCriteria}
                        onSelectedRowsChange={selectDocumentsForBorrow}
                        clearSelectedRows={toggledClearRows}
                        striped
                        pagination
                        defaultSortFieldId={2}
                    />
                </div>
                {selectedEditDocument && <div className="container">
                    <div className="containerEditDocument">
                        <FormDocument
                            handleCancel={handleCancel}
                            handleSubmit={submitDocument}
                            handleChangeDocument={handleChangeEditDocument}
                            document={selectedEditDocument}
                        />
                    </div>

                </div>}

                {(documentsForBorrow != false) && <button onClick={OpenModalClient}>Emprunter</button>

                }
                {isOpenModalClient && <div className="modalClient">
                    <ModalTable
                        columns={columnsClients}
                        setIsOpen={setIsOpenModalClient}
                        data={modalClients}
                        handleSelectData={selectClientModal}
                        clearSelectedRows={toggledClearRows}
                        submitData={submitNewBorrow}
                    />
                </div>
                }

                {newDocument && <div className="container">
                    <div className="containerNewDocument">
                        <FormDocument
                            handleCancel={handleCancel}
                            handleSubmit={submitDocument}
                            handleChangeDocument={handleChangeNewDocument}
                            document={newDocument}
                        />
                    </div>
                </div>}
            </div>}
        </>
    )
}