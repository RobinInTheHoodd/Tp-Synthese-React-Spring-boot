
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
    
    const donne = [
        {
            id: 1,
            grade: 'client',
            firstName: 'Robin',
            secondName: 'Mazouni',
        },
        {
            id: 2,
            grade: 'client',
            firstName: 'Hugo',
            secondName: 'tuto',
        },
    ]


    
    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows[0]);
      };


    return (
        <div>
            <div>
                <h1>Login :</h1>
                <br/>
                <p> Veuillez selectionner un utilisateur :</p>
            </div>
            <hr/>
            <DataTable
                columns={columns}
                data={dataClient}
                selectableRows
                selectableRowsSingle
                onSelectedRowsChange={handleChange}
                
                
            />
            <hr/>
        </div>
    );
}