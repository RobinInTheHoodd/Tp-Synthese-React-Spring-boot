import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'id',
        selector: row => row.id,
        omit: true,
    },
    {
        name: 'Poste',
        selector: row => row.grade,
        conditionalCellStyles: [
            {
                when: row => row.grade === 'Client',
                style: {
                    color: 'Black',
                },
            },
            {
                when: row => row.grade === 'Employe',
                style: {
                    color: 'Green',
                },
            },
            {
                when: row => row.grade === 'Admin',
                style: {
                    color: 'Red',
                },
            },
        ]
    },
    {
        name: 'Prénom',
        selector: row => row.firstName,
    },
    {
        name: 'Nom',
        selector: row => row.secondName,
    },
];

export default function Login({dataClient}){
    
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows[0]);
        setSelectedRows(selectedRows[0]);
    };


    const handleClearRows = () => {
        console.log(selectedRows);
        setToggleClearRows(!toggledClearRows);
    }


    return (
        <div>
            <div>
                <h1>Login :</h1>
                <br/>
                <p> Veuillez selectionner un utilisateur :</p>
            </div>
            <hr/>
            <>    
                <DataTable
                    columns={columns}
                    data={dataClient}
                    selectableRows
                    selectableRowsSingle
                    onSelectedRowsChange={handleChange}
                    clearSelectedRows={toggledClearRows}
                    dense
                    
                />
                <hr/>
                {
                    selectedRows !== undefined && 
                        <button onClick={handleClearRows}>
                            Connecté
                        </button>
                }
            </>
            
        </div>
    );
}