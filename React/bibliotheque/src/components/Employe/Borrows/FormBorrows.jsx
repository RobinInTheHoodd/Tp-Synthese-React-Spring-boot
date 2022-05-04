import React from "react";
import { useState } from "react"
import EmployeDateService from "../../../Service/EmployeDateService";
import ModalClients from "../SearchDocumentsEmploye/ModalClients";
import ModalDocument from "../SearchDocumentsEmploye/ModalDocument";

                        
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
    }){

    
    

    return (
        <>
            <form onSubmit={handleSubmit} id="formClient">
                <h1>Modification :</h1>
                <br></br>
                
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

                <button onClick={OnpenModalClient}> Modifier Client: </button><br/><br/>
                {isOpenModalClient &&
                    <ModalClients
                        setIsOpen={setOpenModalClient}
                        Clients={clients}
                        handleSelectDocument={selectClientModal}
                        toggledClearRows={toggledClearRows}
                        submitBorrow={submitClientModal}
                    />
                }
                    
                <button onClick={OnpenModalDocument}> Modifier Document: </button><br/><br/>
                {isOpenModalDocument &&
                    <ModalDocument
                        setIsOpen={setOpenModalDocument}
                        documents={document}
                        handleSelectDocument={selectDocumentModal}
                        toggledClearRows={toggledClearRows}
                        submitDocument={submitDocument}
                    />
                }
                
                <input type="submit"/><br></br><br></br>

                <button name="Cancel" onClick={handleCancel}> Cancel </button>
            </form>
        </>
      )

}