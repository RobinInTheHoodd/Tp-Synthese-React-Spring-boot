import Header from "../../Header/Header"
import {useLocation, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import ClientDataService from "../../../Service/ClientDataService";

import FormSearchDoc from "./FormSearchDoc";
import {columnsDocuments} from "../Home/HomeClient";


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
    const [searchBar, setSearchBar] = useState({
        type: "all",
        title: 'false',
        author: 'false',
        editor: 'false',
        genre: 'false',
        research: ''
    });

    const documentsDisabledSelectCriteria = row => row.exemplary <= 1;

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

    const handleChangeSearchBar = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const check = event.target.checked;
        if (name === 'research' || name === 'type') {
            setSearchBar(values => ({...values, [name]: value}));
        } else setSearchBar(values => ({...values, [name]: check.toString()}));

    }

    const handleSubmitSearchBar = (event) => {
        event.preventDefault();
        fetchDataDocuments(searchBar);
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
                        <div>
                            <FormSearchDoc
                                searchBar={searchBar}
                                handleChange={handleChangeSearchBar}
                                handleSubmit={handleSubmitSearchBar}
                            />
                        </div>
                        <br/><br/>
                        <div className="container_document">
                            <DataTable
                                title={"Documents :"}
                                columns={columnsDocuments}
                                data={documents}
                                selectableRows
                                selectableRowDisabled={documentsDisabledSelectCriteria}
                                onSelectedRowsChange={handleChangeBorrow}
                                clearSelectedRows={toggledClearSelectedDocuments}
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