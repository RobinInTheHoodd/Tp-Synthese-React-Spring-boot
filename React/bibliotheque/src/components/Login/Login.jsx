import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
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

    const navigate = useNavigate();
    const ClientPage = useCallback(() => 
    {
        return navigate('/client/home', 
        {
            replace: true,
            state: {
                client: [selectedRows],
            }        
        }), [navigate]
    });          

    
    const EmployePage = useCallback(() => navigate('/employe', {replace: true}), [navigate]);          
    const AdminPage = useCallback(() => navigate('/admin', {replace: true}), [navigate]);          

    const loginSubmit = () => {
        if(selectedRows.grade === 'Client'){
            ClientPage();
        } else if (selectedRows.grade === 'Employe'){
            EmployePage();
        } else {
            AdminPage();
        }
    }

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows[0]);
    };


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
                {selectedRows !== undefined && 
                    <button onClick={loginSubmit}>
                        Connecté
                    </button>
                }
            </>
            
        </div>
    );
}