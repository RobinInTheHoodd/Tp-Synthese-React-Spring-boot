import Header from "../../Header/Header"
import {useLocation} from 'react-router-dom';
import React from "react";

export default function SearchDocument(){
    console.log(useLocation());

    const dataClient = useLocation().state.client;
    const [client, setClient] = React.useState(dataClient);

    return(
        <>
        {console.log(client)}
            <Header
                headerFor={'client'}
                clients={client}
            />
        </>
    )

    
}