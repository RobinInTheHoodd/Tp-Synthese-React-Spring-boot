import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header"

export default function BorrowDocuments(){
    const dataClient = useLocation().state.client;
    const [client, setClient] = React.useState(dataClient);

    return(
        <>
            <div>
                <Header 
                    headerFor={'client'} 
                    clients={client}
                />
            </div>

            
        </>
    )
}