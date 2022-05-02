import {useLocation} from 'react-router-dom';
import React from "react";
import Header from "../../Header/Header";

export default function Bills() {

    const dataClient = useLocation().state.client;
    const [client, setClient] = React.useState(dataClient);


    return(
        <div>
            <Header 
                headerFor={'client'}
                clients={client}
            />

            

        </div>
    )
}