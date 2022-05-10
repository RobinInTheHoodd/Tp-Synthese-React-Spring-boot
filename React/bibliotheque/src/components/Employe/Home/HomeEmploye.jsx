import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "../../Header/Header";
import DataTable from "react-data-table-component";
import EmployeDateService from "../../../Service/EmployeDateService";
import FormUser from "../../Form/FormUser";

const columnsEmploye = (handleButtonClick) => [{
    cell: () => <button onClick={handleButtonClick}>Modifier</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
}, {
    name: 'id', selector: row => row.id, omit: true,
}, {
    name: 'Prénom', selector: row => row.firstName,
}, {
    name: 'Nom', selector: row => row.secondName,
}, {
    name: 'Email', selector: row => row.email,
}, {
    name: 'password', selector: row => row.password,
}, {
    name: 'Numéro de téléphone', selector: row => row.phoneNumber,
}, {
    name: 'Anniversaire', selector: row => row.bitrhday,
},];


const useFetch = (idEmploye) => {
    const [data, setData] = useState(false);

    async function fetchDataEmploye() {
        let response;
        response = await EmployeDateService.getEmployeById(idEmploye);
        const json = await response.data;
        setData(json);
    }


    useEffect(() => {
        fetchDataEmploye()
    }, []);

    return [data, fetchDataEmploye];
};


export default function HomeEmploye() {

    const dataEmploye = useLocation().state.user;
    const [employe, fetchDataEmploye] = useFetch(dataEmploye[0].id);

    const [editEmploye, setEditEmploye] = React.useState(false);


    const handleChangeNewEmploye = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditEmploye(editEmploye => ({...editEmploye, [name]: value}));
    }

    const handleChangeAddressNewEmploye = (event) => {
        const name = event.target.name.split(".")[1];
        const address = event.target.name.split(".")[0];
        const value = event.target.value;
        console.log(editEmploye.id);
        setEditEmploye({
            ...editEmploye, [address]: {...editEmploye.address, [name]: value}
        });
    }


    const handleSubmitNewEmploye = (event) => {
        event.preventDefault();

        EmployeDateService.updateEmploye(editEmploye, employe[0].id).then(() => {
            fetchDataEmploye();
        })
        setEditEmploye(false);
    };

    const handleButtonClick = () => {
        setEditEmploye(employe[0]);
    }

    return (<>
            <Header
                headerFor={'employe'}
                user={employe}
            />
            {employe && <div className="contentContainer">
                <DataTable
                    title={"Compte :"}
                    data={employe}
                    columns={columnsEmploye(handleButtonClick)}
                />

                <div className="editClientContainer">
                    {editEmploye && <div className="container">
                        <FormUser
                            handleChangeClient={handleChangeNewEmploye}
                            handleSubmit={handleSubmitNewEmploye}
                            handleChangeClientAddress={handleChangeAddressNewEmploye}
                            client={editEmploye}
                        />
                    </div>}
                </div>
            </div>}
        </>)
}