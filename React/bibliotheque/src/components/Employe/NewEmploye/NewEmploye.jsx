import React, {useEffect, useState} from "react";
import Header from "../../Header/Header";
import {useLocation} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import FormUser from "../../Form/FormUser"
import {AiFillPlusCircle} from "react-icons/ai";
import {ImCross} from "react-icons/im";
import {BsFillTrashFill} from "react-icons/bs";
import EmployeDateService from "../../../Service/EmployeDateService";

const columnsEmploye = (handleButtonEditEmploye, handleButtonDeleteEmploye) => [{
    cell: (row) => <button onClick={() => handleButtonEditEmploye(row)}>Modifier</button>,
    name: 'Modification',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
}, {
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
    cell: (row) => <BsFillTrashFill onClick={() => handleButtonDeleteEmploye(row)} style={{'color': 'red'}}
                                    size={20}/>,
    name: 'Supprimer',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
},];

const customStyles = {
    rows: {
        style: {
            minHeight: '72px',
        },
    }, headCells: {
        style: {
            paddingLeft: '8px', paddingRight: '8px',
        },
    }, cells: {
        style: {
            paddingLeft: '8px', paddingRight: '8px',
        },
    },
};

const modelAddress = {
    houseNumber: '', streetAddress: '', city: '', state: '', zipCode: ''
};

const modelEmploye = {
    id: '', firstName: '', secondName: '', password: '', bitrhday: '', phoneNumber: '', email: '', address: modelAddress
};


const useFetch = (id) => {
    const [employes, setEmployes] = useState(false);

    async function fetchEmployes() {
        let response;
        response = await EmployeDateService.getEmployes(id);
        const json = await response.data;
        setEmployes(json);
    }

    useEffect(() => {
        fetchEmployes()
    }, [employes]);

    return [employes, fetchEmployes];
};


export default function NewEmploye({}) {

    const dataEmploye = useLocation().state.user;
    const [employe] = useState(dataEmploye);
    const [employes, fetchEmployes] = useFetch(employe[0].id)
    const [editEmploye, setEditEmploye] = useState(false);
    const [newEmploye, setNewEmploye] = useState(false);


    useEffect(() => {
        setEditEmploye();
        setNewEmploye();
    }, []);


    const handleChangeEditEmploye = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditEmploye(editEmploye => ({...editEmploye, [name]: value}));
    }

    const handleChangeEditEmployeAddress = (event) => {
        const name = event.target.name.split(".")[1];
        const address = event.target.name.split(".")[0];
        const value = event.target.value;
        setEditEmploye({
            ...editEmploye, [address]: {...editEmploye.address, [name]: value}
        });
    }

    const handleSubmitEditEmploye = (event) => {
        event.preventDefault();

        EmployeDateService.updateEmploye(editEmploye, employe[0].id).then(() => {
            fetchEmployes(employe[0].id);
        })
        setEditEmploye(false);
    };


    const handleButtonEditEmploye = (editEmploye) => {
        setEditEmploye(editEmploye);
    }

    const handleButtonDeleteEmploye = (deletedEmploye) => {
        EmployeDateService.deleteEmploye(deletedEmploye, employe[0].id)
            .then(() => fetchEmployes(employe[0].id));
    }

    const handleButtonCancel = () => {
        setEditEmploye(false);
        setNewEmploye(false);
    }

    const handleButtonNewEmploye = () => {
        setNewEmploye(modelEmploye);
    }

    const handleChangeNewEmploye = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewEmploye(newEmploye => ({...newEmploye, [name]: value}));
    }

    const handleChangeNewEmployeAddress = (event) => {
        const name = event.target.name.split(".")[1];
        const address = event.target.name.split(".")[0];
        const value = event.target.value;
        setNewEmploye({
            ...newEmploye, [address]: {...newEmploye.address, [name]: value}
        });
    }

    const handleSubmitNewEmploye = (event) => {
        event.preventDefault();
        EmployeDateService.addEmploye(newEmploye, employe[0].id).then(() => handleButtonCancel());
    };


    return (<>
        <Header
            headerFor={'employe'}
            user={employe}
        />
        <h1> Compte Employes : </h1>
        <AiFillPlusCircle onClick={() => handleButtonNewEmploye()}
                          style={{'paddingLeft': '14px', 'cursor': 'pointer'}} size={40}/>
        {employes && <div className="employesContainer">
            <br/><br/>
            <DataTable
                columns={columnsEmploye(handleButtonEditEmploye, handleButtonDeleteEmploye)}
                data={employes}
                customStyles={customStyles}
                pagination
                dense
            />

            <div className="editEmployeContainer">
                {editEmploye && <>
                    <div className="container">
                        <ImCross onClick={() => handleButtonCancel()}
                                 style={{'color': 'red', 'cursor': 'pointer'}}/>
                        <FormUser
                            handleChangeClient={handleChangeEditEmploye}
                            handleSubmit={handleSubmitEditEmploye}
                            handleChangeClientAddress={handleChangeEditEmployeAddress}
                            handleCancel={handleButtonCancel}
                            client={editEmploye}
                        />
                    </div>
                </>}
                {newEmploye && <div className="newEmployeContainer">
                    <FormUser
                        handleChangeClient={handleChangeNewEmploye}
                        handleChangeClientAddress={handleChangeNewEmployeAddress}
                        handleSubmit={handleSubmitNewEmploye}
                        handleCancel={handleButtonCancel}
                        client={newEmploye}
                    />
                </div>

                }
            </div>
            <br/><br/>
        </div>

        }
    </>)

}
