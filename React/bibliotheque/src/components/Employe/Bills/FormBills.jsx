import React from "react";
import ModalClients from "../SearchDocumentsEmploye/ModalClients";


export default function FormBills(
    {
        handleSubmit,
        bills,
        handleChangeBills,
        handleCancel,
        toggledClearRows,
        clients,
        OnpenModalClient,
        isOpenModalClient,
        selectClientModal,
        submitClientModal,
        setOpenModalClient
    }) {


    return (
        <>
            <form onSubmit={handleSubmit} id="formClient">
                <h1>Modification :</h1>
                <br/>

                <label>Montant dû :</label>
                <input
                    type="number"
                    name="amount"
                    value={bills.amount}
                    onChange={handleChangeBills}
                    required
                /><br/><br/>

                <label>Montant payé :</label>
                <input
                    type="number"
                    name="paid"
                    value={bills.paid}
                    onChange={handleChangeBills}
                    required
                /><br/><br/>

                <label>payé le : :</label>
                <input
                    type="date"
                    name="paidOn"
                    datatype="yyyy-MM-dd"
                    value={bills.paidOn}
                    onChange={handleChangeBills}
                    required
                /><br/><br/>

                <button onClick={OnpenModalClient}> Modifier Client:</button>
                <br/><br/>
                {isOpenModalClient &&
                    <ModalClients
                        setIsOpen={setOpenModalClient}
                        Clients={clients}
                        handleSelectClient={selectClientModal}
                        toggledClearRows={toggledClearRows}
                        submitBorrow={submitClientModal}
                    />
                }

                <input type="submit"/><br/><br/>

                <button name="Cancel" onClick={handleCancel}> Cancel</button>
            </form>
        </>
    )

}