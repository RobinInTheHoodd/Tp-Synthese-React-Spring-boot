package ca.cal.librairie.persistence.Documents;

import ca.cal.librairie.model.Document.Book;
import ca.cal.librairie.model.Document.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.title LIKE :title")
    List<Book> getBooksByTitleIsLike(String title);

    @Query("SELECT b FROM Book b WHERE b.author LIKE :author")
    List<Book> getBooksByAuthorIsLike(String author);

    @Query("SELECT b FROM Book b WHERE b.editor LIKE :editor")
    List<Book> getBooksByEditorIsLike(String editor);

    @Query("SELECT b FROM Book b WHERE b.dateOfPublication = :dateofpublish")
    List<Book> getBooksByDateOfPublication(@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateofpublish);

    @Query("SELECT b FROM Book b WHERE b.genre LIKE :genre")
    List<Book> getBooksByGenre(String genre);

    @Query("SELECT b FROM Document b WHERE b.documentId = :id")
    Document getDocById(long id);



}
