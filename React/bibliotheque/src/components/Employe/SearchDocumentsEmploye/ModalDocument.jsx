import Modal from "../../utils/Modal";
import React from "react";
import DataTable from 'react-data-table-component';
import {columnsDocuments} from "../../Client/Home/HomeClient";

export default function ModalDocument({setIsOpen, documents, handleSelectDocument, toggledClearRows, submitDocument}) {


    const TableDocument = <div className="tableModalDocuments">
        <DataTable
            columns={columnsDocuments}
            data={documents}
            selectableRows
            selectableRowsSingle
            onSelectedRowsChange={handleSelectDocument}
            clearSelectedRows={toggledClearRows}
        />
    </div>;

    return (<div className="Modal">
        <Modal
            title={"Choisir un Document :"}
            setIsOpen={setIsOpen}
            data={TableDocument}
            submitBorrow={submitDocument}
        />
    </div>)


}