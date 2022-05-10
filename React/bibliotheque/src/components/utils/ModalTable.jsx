import Modal from "./Modal";
import React from "react";
import DataTable from 'react-data-table-component';

const columnsClient = [{
    name: 'id', selector: row => row.id, omit: true,
}, {
    name: 'Prénom', selector: row => row.firstName, sortable: true
}, {
    name: 'Nom', selector: row => row.secondName, sortable: true
}, {
    name: 'Email', selector: row => row.email, sortable: true
}, {
    name: 'password', selector: row => row.password,
}, {
    name: 'Numéro de téléphone', selector: row => row.phoneNumber, sortable: true
}, {
    name: 'Anniversaire', selector: row => row.bitrhday, sortable: true
}, {
    name: 'Solde', selector: row => row.fine + ' $', sortable: true
},];
export default function ModalClients({columns ,setIsOpen, data, handleSelectData, toggledClearRows, submitData}) {

    const TableClients = <div className="tableModalClient">
        <DataTable
            columns={columns}
            data={data}
            selectableRows
            selectableRowsSingle
            onSelectedRowsChange={handleSelectData}
            clearSelectedRows={toggledClearRows}
        />
    </div>;

    return (<div className="Modal">
        <Modal
            title={"Choisir un client :"}
            setIsOpen={setIsOpen}
            data={TableClients}
            submitBorrow={submitData}
        />
    </div>)


}