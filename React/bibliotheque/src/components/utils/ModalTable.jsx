import Modal from "./Modal";
import React from "react";
import DataTable from 'react-data-table-component';

export default function ModalClients({columns, setIsOpen, data, handleSelectData, toggledClearRows, submitData}) {

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