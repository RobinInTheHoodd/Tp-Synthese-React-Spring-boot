import Header from "../../Header/Header"
import {useLocation, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService";
import {columnsDocuments} from "../Home/HomeClient";
import {FilterComponent} from "../../Employe/SearchDocumentsEmploye/SearchDocumentsEmploye";


const useFetch = (id) => {
    const [documents, setDocuments] = useState(null);

    async function fetchDataDocuments(search) {
        let response;
        if (search === undefined) {
            response = await ClientDataService.getDocuments(id);
        } else response = await ClientDataService.searchDocument(search, id);
        const json = await response.data;
        setDocuments(json);
    }

    useEffect(() => {
        fetchDataDocuments()
    }, []);

    return [documents, fetchDataDocuments];
};

export default function SearchDocuments() {
    const dataClient = useLocation().state.user;
    const [client] = React.useState(dataClient);
    const [documents, fetchDataDocuments] = useFetch(client[0].id);
    const [selectedDocuments, setSelectedDocuments] = React.useState(false);
    const [toggledClearSelectedDocuments, setToggleClearSelectedDocuments] = React.useState(false);

    const documentsDisabledSelectCriteria = row => row.exemplary <= 1;


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


    const navigate = useNavigate();
    const BorrowPages = () => {
        return navigate('/client/borrowDocs',
            {
                replace: true,
                state: {
                    user: client,
                }
            })
    };


    const handleChangeBorrow = ({selectedRows}) => {
        setSelectedDocuments(selectedRows.map(row => {
            return {
                id: '',
                client: client[0],
                document: row,
            }
        }));
    };

    const handleBorrow = () => {
        ClientDataService.addBorrowDocs(selectedDocuments, client[0].id)
            .then(() => {
                setSelectedDocuments(false);
                setToggleClearSelectedDocuments(!toggledClearSelectedDocuments);
                return BorrowPages();
            });
    }

    return (

        <>
            <Header
                headerFor={'client'}
                user={client}
            />
            <br/><br/><br/><br/>

            <div className="documentsContainer">
                {documents &&
                    <>
                        <br/><br/>
                        <div className="container_document">
                            <DataTable
                                title={"Documents :"}
                                columns={columnsDocuments}
                                data={filteredItems()}
                                selectableRows
                                selectableRowDisabled={documentsDisabledSelectCriteria}
                                onSelectedRowsChange={handleChangeBorrow}
                                clearSelectedRows={toggledClearSelectedDocuments}
                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                                striped
                                pagination
                                defaultSortFieldId={2}
                            />
                        </div>
                        <div className="documentToBorrowContainer">
                            {
                                (selectedDocuments != false) &&
                                <button onClick={handleBorrow}>
                                    Emprunter
                                </button>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}