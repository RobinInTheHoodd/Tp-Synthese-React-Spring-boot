import {useLocation} from 'react-router-dom';
import React from "react";
import Header from "../../Header/Header";
import ClientDataService from '../../../Service/ClientDataService';
import { useState, useEffect } from 'react';
import { columnsBill } from '../Home/HomeClient';
import DataTable from 'react-data-table-component';
import UserDataService from '../../../Service/UserDataService';


const useFetch = (id) => {
    const [data, setData] = useState(null);
    
    async function fetchData() {
        let response;
        response = await ClientDataService.getBills(id);
        const json = await response.data;
        setData(json);
    }
    useEffect(() => {fetchData()},[]);

    return [data, fetchData];
};

export default function Bills() {

    const dataClient = useLocation().state.user;
    const [client, setClient] = React.useState(dataClient);
    const [bills, fetchData] = useFetch(client[0].id);



    const handleSubmitPay = () => { 
        ClientDataService.addBill(
            {
                paid: client[0].fine,
            },  client[0].id
        ).then(
            () => {
                fetchData();
                UserDataService.getClientsById(client[0].id).
                then(
                    response => {
                        console.log(response.data);
                        setClient([response.data]);
                    }
                );
            }
        )
    }

    return(
        <div>
            <Header 
                headerFor={'client'}
                user={client}
            />
            <div>
                <br/><br/>
                <h2>Factures :</h2>
                <br/><br/>
                {bills &&
                    <>
                        <p>Somme à payer : {client[0].fine}$</p>

                        { client[0].fine != 0 &&
                            <button onClick={handleSubmitPay}> 
                            Payer !!
                            </button>
                        }

                        <br/><br/>
                        <DataTable
                            title={'Factures précédente :'}
                            columns={columnsBill}
                            data={bills}
                            dense
                            striped
                            pagination
                        />
                    
                    </>
                }
            </div>


        </div>
    )
}