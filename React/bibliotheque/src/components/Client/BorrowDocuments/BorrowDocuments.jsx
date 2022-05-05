import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import ClientDataService from "../../../Service/ClientDataService";
import Header from "../../Header/Header"
import DataTable from 'react-data-table-component';
import {columnsBorrowDocs, columnsDocuments} from "../Home/HomeClient";


const useFetch = (id) => {
    const [data, setData] = useState(null);

    async function fetchDataBorrows() {
        let response;
        response = await ClientDataService.getBorrowDocsById(id);
        const json = await response.data;
        setData(json);
    }

    useEffect(() => {
        fetchDataBorrows().then(r => {});
    }, [data]);

    return [data, fetchDataBorrows];
};

const customStyles = {
    header: {
        style: {
            minHeight: '80px',
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: 'black',
        },
    },
    Cells: {
        style: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: 'black',
        },
    },
};

export default function BorrowDocuments() {
    const dataClient = useLocation().state.user;
    const [client] = React.useState(dataClient);
    const [borrows, fetchDataBorrows] = useFetch(client[0].id);
    const [selectedBorrow, setSelectedBorrow] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);


    const selectedBorrowDisabledCriteria = row => row.returned;

    const ExpandedBorrow = ({data}) =>
        <pre style={{'width': 1000 + 'px', 'paddingLeft': '20px'}}>
        <h3>Document :</h3>
        <DataTable
            columns={columnsDocuments}
            data={[data.document]}
            customStyles={customStyles}
        />
        <hr/>
        <br/>
            {
                data.lateReturnDay > 0 &&
                <>
                    <hr/>
                    <h3>Solde du retard : {getSoldeLateReturn(data)}$</h3>
                    <hr/>
                </>
            }
            <br/>
        
        
    </pre>;

    const getSoldeLateReturn = (borrow) => {
        return borrow.lateReturnDay * 0.25;
    }

    const handleReturnBorrow = ({selectedRows}) => {
        setSelectedBorrow(selectedRows.map(row => {
            return {...row, ['returned']: true}
        }));
    };

    const contextReturnBorrows = React.useMemo(() => {

        const returnBorrows = () => {
            ClientDataService.returnBorrowDocs(selectedBorrow).then(
                () => {
                    setSelectedBorrow(false);
                    setToggleClearRows(!toggledClearRows);
                    fetchDataBorrows();
                }
            );
        }
        return (
            <button onClick={returnBorrows}>
                Retourné Emprunt
            </button>
        )
    }, [borrows, selectedBorrow, toggledClearRows])

    return (
        <>
            <div>
                <Header
                    headerFor={'client'}
                    user={client}
                />
            </div>
            {
                borrows &&
                <div className="containerBorrowDocs">
                    <br/><br/>
                    <DataTable
                        title={"List d'emprunts :"}
                        columns={columnsBorrowDocs}
                        data={borrows}
                        selectableRows
                        contextActions={contextReturnBorrows}
                        selectableRowDisabled={selectedBorrowDisabledCriteria}
                        onSelectedRowsChange={handleReturnBorrow}
                        clearSelectedRows={toggledClearRows}
                        expandableRows
                        expandableRowsComponent={ExpandedBorrow}
                        striped
                        pagination
                    />
                    <br/><br/>
                    <Link to={"/client/searchDocuments"} state={{user: client,}}>Emprunter un Document</Link>

                </div>
            }
        </>
    )
}