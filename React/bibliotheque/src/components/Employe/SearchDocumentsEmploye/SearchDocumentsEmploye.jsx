import Header from "../../Header/Header"
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService";
import FormDocument from "../../Form/FormDocument";
import EmployeDateService from "../../../Service/EmployeDateService";
import {BsFillTrashFill} from "react-icons/bs";
import {AiFillPlusCircle} from "react-icons/ai";
import ModalTable from "../../utils/ModalTable";
import {columnsClients} from "../../Client/Home/HomeClient";


export const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;


export const FilterComponent = ({
                                    typeDocument, filterType,
                                    titleDocument, filterTitle,
                                    authorDocument, filterAuthor,
                                    editorDocument, filterEditor,
                                    genreDocument, filterGenre,
                                    filterText, onFilter, onClear
                                }) => (
    <>
        <select name='type' value={typeDocument} onChange={(event) => filterType(event)}>
            <option value="all">Tous</option>
            <option value="Book">Livre</option>
            <option value="CD">CD</option>
            <option value="DVD">DVD</option>
        </select>

        <label>Titre:
            <input
                type="checkbox"
                name="title"
                value={titleDocument}
                checked={titleDocument}
                onChange={filterTitle}
            />
        </label>

        <label>Autheur:
            <input
                type="checkbox"
                name="author"
                value={authorDocument}
                checked={authorDocument}
                onChange={filterAuthor}
            />
        </label>
        <label>Editeur:
            <input
                type="checkbox"
                name="editor"
                value={editorDocument}
                checked={editorDocument}
                onChange={filterEditor}
            />
        </label>
        <label>Genre :
            <input
                type="checkbox"
                name="genre"
                value={genreDocument}
                checked={genreDocument}
                onChange={filterGenre}
            />
        </label>
        <TextField
            name="search"
            type="text"
            placeholder="Recherche"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <button type="button" onClick={onClear}>
            X
        </button>
    </>
);


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

    const [toggledClearRows, setToggleClearRows] = React.useState(false);


    const [filterText, setFilterText] = React.useState('');
    const [typeDocument, setTypeDocument] = React.useState('all');
    const [titleDocument, setTitleDocument] = React.useState(false);
    const [authorDocument, setAuthorDocument] = React.useState(false);
    const [editorDocument, setEditorDocument] = React.useState(false);
    const [genreDocument, setGenreDocument] = React.useState(false);
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);


    const filteredItems = () => {
        if (typeDocument !== 'all') {
            if (titleDocument === true) {
                return documents.filter(
                    item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) &&
                        item.type && item.type.includes(typeDocument),
                );
            } else if (authorDocument === true) {
                return documents.filter(
                    item => item.author && item.author.toLowerCase().includes(filterText.toLowerCase()) &&
                        item.type && item.type.includes(typeDocument),
                );
            } else if (editorDocument === true) {
                return documents.filter(
                    item => item.editor && item.editor.toLowerCase().includes(filterText.toLowerCase()) &&
                        item.type && item.type.includes(typeDocument),
                );
            } else if (genreDocument === true) {
                return documents.filter(
                    item => item.genre && item.genre.toLowerCase().includes(filterText.toLowerCase()) &&
                        item.type && item.type.includes(typeDocument),
                );
            } else return documents.filter(
                item => item.type && item.type.toLowerCase().includes(typeDocument.toLowerCase()),
            );
        } else {
            if (titleDocument === true) {
                return documents.filter(
                    item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
                );
            } else if (authorDocument === true) {
                return documents.filter(
                    item => item.author && item.author.toLowerCase().includes(filterText.toLowerCase()),
                );
            } else if (editorDocument === true) {
                return documents.filter(
                    item => item.editor && item.editor.toLowerCase().includes(filterText.toLowerCase()),
                );
            } else if (genreDocument === true) {
                return documents.filter(
                    item => item.genre && item.genre.toLowerCase().includes(filterText.toLowerCase()),
                );
            } else return documents;
        }

    }

    const subHeaderComponentMemo = React.useMemo(() => {

        const handleClear = () => {
            if (filterText || typeDocument !== 'all' || titleDocument || authorDocument || editorDocument || genreDocument) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
                setTypeDocument('all');
                setTitleDocument(false);
                setAuthorDocument(false);
                setGenreDocument(false);
                setEditorDocument(false);
            }
        };

        const filterType = (event) => {
            event.preventDefault();
            const name = event.target.name;
            const value = event.target.value;
            setTypeDocument(value);

        };

        const filterTitle = (event) => {
            event.preventDefault();
            const checked = event.target.checked;
            if (checked === true) {
                setAuthorDocument(false);
                setGenreDocument(false);
                setEditorDocument(false);
            }
            setTitleDocument(checked);

        };

        const filterAuthor = (event) => {
            event.preventDefault();
            const checked = event.target.checked;
            if (checked === true) {
                setTitleDocument(false)
                setGenreDocument(false);
                setEditorDocument(false);
            }
            setAuthorDocument(checked);
        };

        const filterEditor = (event) => {
            event.preventDefault();
            const checked = event.target.checked;
            if (checked === true) {
                setTitleDocument(false)
                setAuthorDocument(false);
                setGenreDocument(false);
            }
            setEditorDocument(checked);
        };

        const filterGenre = (event) => {
            event.preventDefault();
            const checked = event.target.checked;
            if (checked === true) {
                setTitleDocument(false)
                setAuthorDocument(false);
                setEditorDocument(false);
            }
            setGenreDocument(checked);
        };

        return (
            <FilterComponent typeDocument={typeDocument} titleDocument={titleDocument} filterTitle={filterTitle}
                             filterType={filterType} onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
                             filterText={filterText}
                             authorDocument={authorDocument} filterAuthor={filterAuthor}
                             editorDocument={editorDocument} filterEditor={filterEditor}
                             genreDocument={genreDocument} filterGenre={filterGenre}

            />
        );
    }, [filterText, typeDocument, authorDocument, titleDocument, editorDocument, genreDocument, resetPaginationToggle]);


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
                    <br/><br/>
                    <AiFillPlusCircle
                        onClick={() => buttonNewDocument()}
                        style={{'paddingLeft': '14px', 'cursor': 'pointer'}}
                        size={40}
                    />
                    <DataTable
                        columns={columnsDocuments(buttonEditDocument, buttonDeleteDocument)}
                        data={filteredItems()}
                        selectableRows
                        selectableRowDisabled={DisabledSelectDocumentCriteria}
                        onSelectedRowsChange={selectDocumentsForBorrow}
                        clearSelectedRows={toggledClearRows}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
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