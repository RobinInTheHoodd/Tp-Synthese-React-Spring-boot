export default function FormDocument({handleSubmit, document, handleChangeDocument, handleCancel}) {

    return (
        <>
            <form onSubmit={handleSubmit} id="formClient">
                <h1>Modification :</h1>
                <br/>
                <label>Titre :</label>
                <select name="type" value={document.type} onChange={handleChangeDocument} required>
                    <option value=""/>
                    <option value="Book">Livre</option>
                    <option value="CD">CD</option>
                    <option value="DVV">DVD</option>
                </select>

                <label>Titre :</label>
                <input
                    type="text"
                    name="title"
                    value={document.title}
                    onChange={handleChangeDocument}
                    required
                /><br/><br/>

                <label>Autheur :</label>
                <input
                    type="text"
                    name="author"
                    value={document.author}
                    onChange={handleChangeDocument}
                    required
                /><br/><br/>

                <label>Editeur :</label>
                <input
                    type="text"
                    name="editor"
                    value={document.editor}
                    onChange={handleChangeDocument}
                    required
                /><br/><br/>

                <label>Date de publication :</label>
                <input
                    type="date"
                    name="dateOfPublication"
                    datatype="yyyy-MM-dd"
                    value={document.dateOfPublication}
                    onChange={handleChangeDocument}
                    required
                /><br/><br/>

                <label>Nombre de page :</label>
                <input
                    type="number"
                    name="numberPage"
                    value={document.numberPage}
                    onChange={handleChangeDocument}
                /><br/><br/>

                <label>Exemplaire :</label>
                <input
                    type="number"
                    name="exemplary"
                    value={document.exemplary}
                    onChange={handleChangeDocument}
                    required
                /><br/><br/>

                <input type="submit"/>
                <br/>
                <br/>
                <button name="Cancel" onClick={handleCancel}> Cancel</button>
            </form>
        </>
    )

}