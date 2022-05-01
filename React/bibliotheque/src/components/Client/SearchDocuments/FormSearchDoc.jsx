export default function FormSearchDoc({handleChange, handleSubmit, searchBar}) {  
    return (
      <>
        <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <select name='type' value={searchBar.type} onChange={handleChange} defaultChecked={searchBar.type === "all"}>
          <option value="all">Tous</option>
          <option value="book">Livre</option>
          <option value="cd">CD</option>
          <option value="dvd">DVD</option>
        </select>
      
          <label>Titre:
          <input 
            type="checkbox" 
            name="title"
            value={searchBar.title}
            onChange={handleChange}
          />
          </label>
          <label>Autheur:
          <input 
            type="checkbox" 
            name="author" 
            value={searchBar.author}
            onChange={handleChange}
          />
          </label>
          <label>Editeur:
          <input 
            type="checkbox" 
            name="editor" 
            value={searchBar.editor}
            onChange={handleChange}
          />
          </label>
          <label>Genre :
          <input 
            type="checkbox" 
            name="genre" 
            value={searchBar.genre}
            onChange={handleChange}
          />
          </label>
          <label>Recherche :
          <input 
            type="text" 
            name="research" 
            value={searchBar.research} 
            onChange={handleChange}
          />
          </label>
          <input type="submit" />
      </form>

      
      </>
    )
}
