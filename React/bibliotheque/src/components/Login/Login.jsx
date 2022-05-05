import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';

const columnsUser = [{
    name: 'id', selector: row => row.id, omit: true,
}, {
    name: 'Poste', selector: row => row.grade, conditionalCellStyles: [{
        when: row => row.grade === 'Client', style: {
            color: 'Black',
        },
    }, {
        when: row => row.grade === 'Employe', style: {
            color: 'Green',
        },
    }, {
        when: row => row.grade === 'Admin', style: {
            color: 'Red',
        },
    },]
}, {
    name: 'Prénom', selector: row => row.firstName,
}, {
    name: 'Nom', selector: row => row.secondName,
},];

export default function Login({dataUser}) {

    const [selectedUser, setSelectedUser] = React.useState(false);
    const [toggledClearSelectedUser, setToggleClearSelectedUser] = React.useState(false);

    const navigate = useNavigate();

    const ClientPage = useCallback(() => {
        return navigate('/client/home', {
            replace: true, state: {
                user: [selectedUser],
            }
        }), [navigate]
    });


    const EmployePage = useCallback(() => {
        return navigate('/employe/home', {
            replace: true, state: {
                user: [selectedUser],
            }
        }), [navigate]
    });


    const AdminPage = useCallback(() => navigate('/admin', {replace: true}), [navigate]);

    const loginSubmit = () => {
        if (selectedUser.grade === 'Client') {
            ClientPage();
        } else if (selectedUser.grade === 'Employe') {
            EmployePage();
        } else {
            AdminPage();
        }
    }

    const ChangeSelectedUser = ({selectedRows: selectedUser}) => {
        setSelectedUser(selectedUser[0]);
    };


    return (<div>
            <div>
                <h1>Login :</h1>
                <br/>
                <p> Veuillez selectionner un utilisateur :</p>
            </div>
            <hr/>
            <>
                <DataTable
                    columns={columnsUser}
                    data={dataUser}
                    selectableRows
                    selectableRowsSingle
                    onSelectedRowsChange={ChangeSelectedUser}
                    clearSelectedRows={toggledClearSelectedUser}
                    dense
                />
                <hr/>
                {selectedUser !== undefined && <button onClick={loginSubmit}>
                    Connecté
                </button>}
            </>

        </div>);
}