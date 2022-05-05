import Header from "../../Header/Header"
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import EmployeDateService from "../../../Service/EmployeDateService";
import DataTable from "react-data-table-component";
import {BsFillTrashFill} from "react-icons/bs";
import FormBills from "./FormBills";


//TODO supprimer emprunts

const columnsBills = (handleEditBills, handleDeleteBill) => [{
    cell: (row) => <button onClick={() => handleEditBills(row)}>Modifier</button>,
    name: 'Modification',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
}, {
    name: 'id', selector: row => row.id, omit: true,
}, {
    name: 'Montant', selector: row => row.amount,
}, {
    name: 'a payé', selector: row => row.paid,
}, {
    name: 'payé le', selector: row => row.paidOn,
}, {
    cell: (row) => <BsFillTrashFill onClick={() => handleDeleteBill(row)} style={{'color': 'red'}} size={20}/>,
    name: 'Supprimer',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
},];


const useFetch = (idEmploye, idClient) => {
    const [data, setData] = useState(false);

    async function fetchDataBills() {
        let response;
        if (!idClient) {
            response = await EmployeDateService.getBills(idEmploye);
        } else response = await EmployeDateService.getBillsByIdClient(idClient, idEmploye)
        const json = await response.data;
        setData(json);
    }

    async function refresDataBills(id) {
        let response;
        response = await EmployeDateService.getBills(id);
        const json = await response.data;
        setData(json);
    }

    useEffect(() => {
        fetchDataBills()
    }, []);

    return [data, refresDataBills];
};

export default function EmployeBills() {

    const dataEmploye = useLocation().state.user;
    const dataClient = useLocation().state.client;

    const [employe] = React.useState(dataEmploye);
    const [client, setClient] = React.useState(dataClient);

    const [bills, refreshDataBills] = useFetch(employe[0].id, client);
    const [editBills, setEditBills] = useState(false);


    const [isOpenModalClient, setOpenModalClient] = useState(false);
    const [clients, setClients] = useState(false);
    const [selectedClient, setSelectedClient] = useState(false);


    useEffect(() => {
        setEditBills();
    }, []);

    const handleEditBills = (selectedBill) => {
        setEditBills(selectedBill);
    }

    const handleDeleteBill = (selectedBill) => {
        EmployeDateService.deleteBill(employe[0].id, selectedBill)
            .then(() => refreshDataBills(employe[0].id));
    }

    const handleCancel = () => {
        setEditBills(false);
    }

    const handleChangeEditBills = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setEditBills(values => ({...values, [name]: value}));
    }

    const selectClientModal = ({selectedRows}) => {
        setSelectedClient(selectedRows);
    }
    const submitClientModal = (event) => {
        event.preventDefault();
        setEditBills({...editBills, client: selectedClient[0]})
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

    const sumbitEditBills = (event) => {
        event.preventDefault();
        EmployeDateService.editBills(employe[0].id, editBills).then(() => {
            setEditBills(false);
            refreshDataBills(employe[0].id);
        });
    }


    const expandableBills = ({data}) => {
        return (<>
            <h3>Client :</h3>
            <pre>{"{ \n" + JSON.stringify(data.client, null, 2).substring(15)}</pre>
        </>)
    }

    const seeBills = () => {
        setClient(null);
        refreshDataBills(employe[0].id);
    }
    return (
        <>
            <Header
                headerFor={'employe'}
                user={employe}
            />

            {client != undefined && <div className="buttonRefereshBorrows">
                <h2>Factures du Client : {client.firstName} {client.secondName}</h2>
                <button onClick={() => seeBills()}>Toute les Factures</button>
            </div>}

            {bills && <div className="containerBorrows">
                <DataTable
                    columns={columnsBills(handleEditBills, handleDeleteBill)}
                    data={bills}
                    expandableRows
                    expandableRowsComponent={expandableBills}
                    pagination
                    striped
                    dense
                />
            </div>}
            {editBills && <div className="container">
                <FormBills
                    handleSubmit={sumbitEditBills}
                    bills={editBills}
                    handleChangeBills={handleChangeEditBills}
                    handleCancel={handleCancel}

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