import { Link, useLocation } from "react-router-dom";


const headerClient = {
    home: 'Home',
    searchDocument: 'Reherche de document',
    borrowDocs: 'Emprunts',
    bills: 'Factures',
    deconnect: 'Déconnecter'
}

const headerEmploye = {
    home: 'Home',
    clients: 'Clients',
    searchDocument: 'Reherche de document',
    borrowDocs: 'Emprunts',
    bills: 'Factures',
    deconnect: 'Déconnecter'
}

const headerAdmin = {
    home: 'Home',
    client: 'Clients',
    employes: 'Employes',
    searchDocument: 'Reherche de document',
    borrowDocs: 'Emprunts',
    bills: 'Factures',
    deconnect: 'Déconnecter'
}

export default function Header({ headerFor, clients}){

    const header = () => {
        if(headerFor === 'client' ){
            return headerForUser(headerClient)
        } else if(headerFor === 'employe' ){
            return headerForUser(headerEmploye);
        } else return headerForUser(headerAdmin);
    }


    const headerForUser = (header) => Object.keys(header).map(
        (field) => {
            return (
                <>
                    <Link to={"/client/"+field} state={{client: clients,}}>
                        {header[field]}</Link> | { " " }
                </>
            );
        }
    )

    return (
        <div>
        <h1>{headerFor}</h1>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
        {console.log(clients)}
        {header()}
        </nav>
      </div>
    )
}

/* 
        <Link to="/home">home</Link> |{" "}
          <Link to="/searchDocument">Reherche de document</Link> |{" "}
          <Link to="/borrowDocs">Emprunts</Link> |{" "}
          <Link to="/bills">Factures</Link> |{" "}

*/