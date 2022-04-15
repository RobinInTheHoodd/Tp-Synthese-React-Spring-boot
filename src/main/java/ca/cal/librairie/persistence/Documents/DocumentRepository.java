package ca.cal.librairie.persistence.Documents;

import ca.cal.librairie.model.Document.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    @Query("SELECT b FROM Document b WHERE b.title LIKE :title")
    List<Document> getDocsByTitleIsLike(String title);

    @Query("SELECT b FROM Document b WHERE b.author LIKE :author")
    List<Document> getDocsByAuthorIsLike(String author);

    @Query("SELECT b FROM Document b WHERE b.editor LIKE :editor")
    List<Document> getDocsByGenreIsLike(String editor);

    @Query("SELECT b FROM Document b")
    List<Document> getDocs();

}
