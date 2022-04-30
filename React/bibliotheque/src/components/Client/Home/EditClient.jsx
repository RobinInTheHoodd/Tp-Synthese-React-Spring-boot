
import FormAdress from "./EditClientAddress";
import React from "react";

export default function EditClient({handleSubmit, handleChange, client}) {

    
    return (
        <>
            <form onSubmit={handleSubmit} id="formClient">
                <p>Modification :</p>
                <br></br>
                <label>Prénom :</label>
                    <input 
                        type="text" 
                        name="firstName"
                        value={client.firstName}
                        onChange={handleChange}
                    />

                    <label>Nom :</label>
                    <input 
                        type="text" 
                        name="secondName" 
                        value={client.secondName}
                        onChange={handleChange}
                    />

                    <label>Mot de passe :</label>
                    <input 
                        type="text" 
                        name="password" 
                        value={client.password}
                        onChange={handleChange}
                    />

                    <label>anniversaire :</label>
                    <input 
                        type="date" 
                        name="bitrhday" 
                        datatype="yyyy-MM-dd"
                        value={client.bitrhday}
                        onChange={handleChange}
                    />
                    <br></br>
                    <label>Téléphone :</label>
                    <input 
                        type="number" 
                        name="phoneNumber" 
                        value={client.phoneNumber}
                        onChange={handleChange}
                    />

                    <label>Email :</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={client.email}
                        onChange={handleChange}
                    />
                    
                    <br></br>
                    <br></br>
                    <p>Address : </p>
                    <br></br>
                    <FormAdress 
                        client={client}
                        handleChange={handleChange}
                    />

                    <br></br>
                    <br></br>
                <input type="submit"/>
            </form>
        </>
      )
}