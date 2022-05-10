import React from "react";
import ModalTable from "../utils/ModalTable";
import {columnsClients, columnsDocuments} from "../Client/Home/HomeClient";


export default function FormBorrow(
    {
        handleSubmit,
        borrow,
        handleChangeBorrow,
        handleCancel,
        OnpenModalDocument,
        isOpenModalDocument,
        document,
        selectDocumentModal,
        toggledClearRows,
        submitDocument,
        setOpenModalDocument,
        OnpenModalClient,
        isOpenModalClient,
        clients,
        selectClientModal,
        submitClientModal,
        setOpenModalClient
    }) {


    return (
        <>
            <form onSubmit={handleSubmit} id="formClient">
                <h1>Modification :</h1>
                <br/>

                <label>Date d'emprunt :</label>
                <input
                    type="date"
                    name="dateBorrowing"
                    datatype="yyyy-MM-dd"
                    value={borrow.dateBorrowing}
                    onChange={handleChangeBorrow}
                /><br/><br/>

                <label>Date de retour :</label>
                <input
                    type="date"
                    name="dateReturn"
                    value={borrow.dateReturn}
                    onChange={handleChangeBorrow}
                /><br/><br/>

                <label>Nombre de jours rendu en retard :</label>
                <input
                    type="number"
                    name="lateReturnDay"
                    value={borrow.lateReturnDay}
                    onChange={handleChangeBorrow}
                /><br/><br/>

                <label>Retourné :</label>
                <input
                    type="checkbox"
                    name="returned"
                    value={borrow.returned}
                    checked={borrow.returned}
                    onChange={handleChangeBorrow}
                /><br/><br/>

                <button onClick={OnpenModalClient}> Modifier Client:</button>
                <br/><br/>
                {isOpenModalClient &&
                    <ModalTable
                        columns={columnsClients}
                        setIsOpen={setOpenModalClient}
                        data={clients}
                        handleSelectData={selectClientModal}
                        toggledClearRows={toggledClearRows}
                        submitData={submitClientModal}
                    />
                }

                <button onClick={OnpenModalDocument}> Modifier Document:</button>
                <br/><br/>
                {isOpenModalDocument &&
                    <ModalTable
                        columns={columnsDocuments}
                        setIsOpen={setOpenModalDocument}
                        data={document}
                        handleSelectData={selectDocumentModal}
                        toggledClearRows={toggledClearRows}
                        submitData={submitDocument}
                    />
                }

                <input type="submit"/><br/><br/>

                <button name="Cancel" onClick={handleCancel}> Cancel</button>
            </form>
        </>
    )

}