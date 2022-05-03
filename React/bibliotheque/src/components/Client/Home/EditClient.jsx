
import FormAdress from "./EditClientAddress";
import React from "react";

export default function EditClient({handleSubmit, handleChange, handleChangeAddress, client, handleCancel}) {

    
    return (
        <>
            <form onSubmit={handleSubmit} id="formClient">
                <h1>Modification :</h1>
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
                    <h2>Address : </h2>
                    <br></br>
                    <FormAdress 
                        client={client}
                        handleChange={handleChangeAddress}
                    />

                    <br></br>
                    <br></br>
                <input type="submit"/>
                <br></br>
                <br></br>
                <button name="Cancel" onClick={handleCancel}> Cancel </button>
            </form>
        </>
      )
}