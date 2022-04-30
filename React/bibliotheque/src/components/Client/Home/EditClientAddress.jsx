export default function EditAdressClient({handleChange, client}) {
    return(
        <>
                    <label>Numéro de maison :</label>
                    <input 
                        type="number" 
                        name="address.houseNumber" 
                        value={client.address.houseNumber}
                        onChange={handleChange}
                    />
                    <label>Rue :</label>
                    <input 
                        type="text" 
                        name="address.streetAddress" 
                        value={client.address.streetAddress}
                        onChange={handleChange}
                    />
                    <label>Ville :</label>
                    <input 
                        type="text" 
                        name="address.city" 
                        value={client.address.city}
                        onChange={handleChange}
                    />
                    <label>Province :</label>
                    <input 
                        type="text" 
                        name="address.state" 
                        value={client.address.state}
                        onChange={handleChange}
                    />
                    <br></br>
                    <label>Code postal :</label>
                    <input 
                        type="text" 
                        name="address.zipCode" 
                        value={client.address.zipCode}
                        onChange={handleChange}
                    />
        </>
    )

}