import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";


export default function Clients() {

    const dataEmploye = useLocation().state.user;
    const [employe, setEmploye] = useState(dataEmploye);


    return(
        <>
            <Header 
                headerFor={"employe"}
                user={employe}
            />

        </>
    )
}