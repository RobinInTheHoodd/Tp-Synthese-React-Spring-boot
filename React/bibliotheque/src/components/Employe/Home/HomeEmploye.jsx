import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";
import React from "react";
import DataTable from "react-data-table-component";
import EmployeDateService from "../../../Service/EmployeDateService";
import EditClient from "../../Client/Home/EditClient";
import EditAdressClient from "../../Client/Home/EditClientAddress";

const columnsEmploye = (handleButtonClick) => [ 
    {          
        cell: () => <button onClick={handleButtonClick}>Modifier</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Prénom',
        selector: row => row.firstName,
    },
    {
        name: 'Nom',
        selector: row => row.secondName,
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'password',
        selector: row => row.password,
    },
    {
        name: 'Numéro de téléphone',
        selector: row => row.phoneNumber,
    },
    {
        name: 'Anniversaire',
        selector: row => row.bitrhday,
    },
];

export default function HomeEmploye(){

    const dataEmploye = useLocation().state.user;
    const [employe, setEmploye] = React.useState(dataEmploye);

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
        setEditEmploye({...editEmploye,
            [address]: {...editEmploye.address, [name]: value}});        
    }


    const handleSubmitNewEmploye = (event) => {
        event.preventDefault();
        
        EmployeDateService.updateEmployeById(editEmploye, employe[0].id).
        then(
            response => {
                setEmploye([response.data]);
            }
        )
        setEditEmploye(false);
    };

    const handleButtonClick = () => {
        setEditEmploye(employe[0]);
    }

    return(
        <>
        
            <Header 
                headerFor={'employe'}
                user={employe}
            />
            <div>
                {employe &&
                    <>
                        <DataTable
                            title={"Compte :"}
                            data={employe}
                            columns={columnsEmploye(handleButtonClick)}
                        />

                        <div className="editClientContainer">
                        {editEmploye &&
                            <div className="container"> 
                                <EditClient 
                                    handleChange={handleChangeNewEmploye}
                                    handleSubmit={handleSubmitNewEmploye}
                                    handleChangeAddress={handleChangeAddressNewEmploye}
                                    client={editEmploye}
                                />
                            </div>    
                        }
                </div>
                    </>
                    
                }
            </div>
        </>

    )

}