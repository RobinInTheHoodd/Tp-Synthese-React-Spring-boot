import {Link} from "react-router-dom";


const headerClient = {
    home: 'Home',
    searchDocuments: 'Reherche de document',
    borrowDocs: 'Emprunts',
    bills: 'Factures',
    deconnect: 'Déconnecter'
}

const headerEmploye = {
    home: 'Home',
    clients: 'Clients',
    searchDocuments: 'Reherche de document',
    borrowDocs: 'Emprunts',
    bills: 'Factures',
    newEmploye: 'newEmploye',
    deconnect: 'Déconnecter'
}

const headerAdmin = {
    home: 'Home',
    clients: 'Clients',
    employes: 'Employes',
    searchDocuments: 'Reherche de document',
    borrowDocs: 'Emprunts',
    bills: 'Factures',
    deconnect: 'Déconnecter'
}

export default function Header({headerFor, user}) {

    const header = () => {
        if (headerFor === 'client') {
            return headerForUser(headerClient)
        } else if (headerFor === 'employe') {
            return headerForUser(headerEmploye);
        }
    }


    const headerForUser = (header) => Object.keys(header).map(
        (field) => {
            return (
                <>
                    <Link to={"/" + headerFor + "/" + field} state={{user: user,}}>
                        {header[field]}</Link> | {" "}
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
                {header()}
            </nav>
        </div>
    )
}
