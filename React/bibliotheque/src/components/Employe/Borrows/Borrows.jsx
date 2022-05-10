import Header from "../../Header/Header"
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import EmployeDateService from "../../../Service/EmployeDateService";
import DataTable from "react-data-table-component";
import {AiFillCheckCircle} from "react-icons/ai";
import {ImCross} from "react-icons/im";
import {BsFillTrashFill} from "react-icons/bs";
import FormBorrow from "../../Form/FormBorrows";


const columnsBorrowDocs = (handleEditBorrow, handleDeleteBorrow) => [{
    cell: (row) => <button onClick={() => handleEditBorrow(row)}>Modifier</button>,
    name: 'Modification',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
}, {
    name: 'id', selector: row => row.id, omit: true,
}, {
    name: 'Document', selector: row => row.document, omit: true,
}, {
    name: "Date d'emprunt", selector: row => row.dateBorrowing, sortable: true,

}, {
    name: 'Retour prêvu le', selector: row => row.dateReturn, sortable: true,
}, {

    name: 'Jour de retard', selector: row => {

        let dateNow = new Date().getTime();
        let difference = Math.abs(dateNow - new Date(row.dateReturn).getTime());
        let dayToMilisecond = 86400000
        let daysLate = Math.trunc(difference / dayToMilisecond);


        if (new Date() > new Date(row.dateReturn) && row.returned === false) {
            row.lateReturnDay = daysLate;
            return daysLate;
        } else if (row.lateReturnDay !== 0) {
            return row.lateReturnDay;
        } else return "/";

    }, sortable: true,
}, {
    name: 'Retourné', selector: (row) => {
        if (row.returned === false) {
            return <ImCross style={{color: 'red'}} size={30}/>
        } else {
            return <AiFillCheckCircle style={{color: 'green'}} size={30}/>
        }
    },
}, {
    cell: (row) => <BsFillTrashFill onClick={() => handleDeleteBorrow(row)} style={{'color': 'red'}} size={20}/>,
    name: 'Supprimer',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
},];


const useFetch = (idEmploye, client) => {
    const [data, setData] = useState(false);

    async function fetchDataBorrows() {
        let response;
        if (!client) {
            response = await EmployeDateService.getBorrowsDoc(idEmploye);
        } else response = await EmployeDateService.getBorrowsDocByIdClient(client, idEmploye)
        const json = await response.data;
        setData(json);
    }

    async function refresDataBorrows(id) {
        let response;
        response = await EmployeDateService.getBorrowsDoc(id);
        const json = await response.data;
        setData(json);
    }

    useEffect(() => {
        fetchDataBorrows()
    }, []);

    return [data, refresDataBorrows];
};

export default function Borrows() {

    const dataEmploye = useLocation().state.user;
    const dataClient = useLocation().state.client;

    const [employe] = React.useState(dataEmploye);
    const [client, setClient] = React.useState(dataClient);

    const [borrows, refresDataBorrows] = useFetch(employe[0].id, client);
    const [editBorrow, setEditBorrow] = useState(false);


    const [isOpenModalDocument, setOpenModalDocument] = useState(false);
    const [document, setDocument] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(false);


    const [isOpenModalClient, setOpenModalClient] = useState(false);
    const [clients, setClients] = useState(false);
    const [selectedClient, setSelectedClient] = useState(false);


    useEffect(() => {
        setEditBorrow();
    }, []);

    const handleEditBorrow = (selectedBorrow) => {
        setEditBorrow(selectedBorrow);
    }

    const handleDeleteBorrow = (selectedBorrow) => {
        EmployeDateService.deleteBorrow(employe[0].id, selectedBorrow)
            .then(() => {
                refresDataBorrows(employe[0].id)
            });
    }

    const handleCancel = () => {
        setEditBorrow(false);
    }

    const handleChangeEditBorrow = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const checked = event.target.checked;
        if (name === "returned") {
            setEditBorrow({...editBorrow, [name]: checked});
        } else setEditBorrow(values => ({...values, [name]: value}));
    }

    const selectDocumentModal = ({selectedRows}) => {
        setSelectedDocument(selectedRows);
    }

    const submitDocumentModal = () => {
        setEditBorrow({...editBorrow, document: selectedDocument[0]})
        setSelectedDocument(false);
        setOpenModalDocument(false);
    }

    const OnpenModalDocument = (event) => {
        event.preventDefault();
        EmployeDateService.getDocuments(employe[0].id).then(response => {
            setDocument(response.data);
        });
        setOpenModalDocument(true);
    }

    const selectClientModal = ({selectedRows}) => {
        setSelectedClient(selectedRows);
    }
    const submitClientModal = (event) => {
        event.preventDefault();
        console.log(selectedClient);
        setEditBorrow({...editBorrow, client: selectedClient[0]})
        setSelectedClient(false);
        setOpenModalClient(false);
    }
    const OnpenModalClient = (event) => {
        event.preventDefault();
        EmployeDateService.getClients(employe[0].id).then(response => {
            setClients(response.data);
        });
        setOpenModalClient(true);
    }

    const sumbitEditBorrow = (event) => {
        event.preventDefault();
        EmployeDateService.editBorrows(employe[0].id, editBorrow).then(() => {
            setEditBorrow(false);
            refresDataBorrows(employe[0].id);
        });
    }


    const expandableBorrows = ({data}) => {
        return (<>
            <h3>Document</h3>
            <pre>{"{ \n" + JSON.stringify(data.document, null, 2).substring(15)}</pre>
            {client != null && <pre>{"{ \n" + JSON.stringify(client, null, 2).substring(15)}</pre>}
        </>)
    }

    const seeBorrows = () => {
        setClient(null);
        refresDataBorrows(employe[0].id);
    }
    return (
        <>
            <Header
                headerFor={'employe'}
                user={employe}
            />

            {client != undefined && <div className="buttonRefereshBorrows">
                <h2>Emprunt du Client : {client.firstName} {client.secondName}</h2>
                <button onClick={() => seeBorrows()}>Tous les Emprunts</button>
            </div>}

            {borrows && <div className="containerBorrows">
                <DataTable
                    columns={columnsBorrowDocs(handleEditBorrow, handleDeleteBorrow)}
                    data={borrows}
                    expandableRows
                    expandableRowsComponent={expandableBorrows}
                    pagination
                    striped
                    dense
                />
            </div>}
            {editBorrow && <div className="container">
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
                    submitDocument={submitDocumentModal}

                    OnpenModalClient={OnpenModalClient}
                    setOpenModalClient={setOpenModalClient}
                    clients={clients}
                    selectClientModal={selectClientModal}
                    isOpenModalClient={isOpenModalClient}
                    submitClientModal={submitClientModal}


                />
            </div>}
        </>
    )
}