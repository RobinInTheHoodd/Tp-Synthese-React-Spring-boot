package ca.cal.librairie.persistence.Documents;

import ca.cal.librairie.model.Document.CD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CDRepository extends JpaRepository<CD, Long> {

    @Query("SELECT c FROM CD c WHERE c.title LIKE :title")
    List<CD> getCDsByTitleIsLike(String title);

    @Query("SELECT c FROM CD c WHERE c.author LIKE :author")
    List<CD> getCDsByAuthorIsLike(String author);

    @Query("SELECT c FROM CD c WHERE c.editor LIKE :editor")
    List<CD> getCDsByEditorIsLike(String editor);

    @Query("SELECT c FROM CD c WHERE c.dateOfPublication = :dateofpublish")
    List<CD> getCDsByDateOfPublication(LocalDate dateofpublish);

    @Query(value = "DELETE from Document c WHERE c.documentId = :documentId")
    void deleteCDByDocId(Long documentId);

}
