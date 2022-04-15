package ca.cal.librairie.persistence.Documents;

import ca.cal.librairie.model.Document.DVD;
import ca.cal.librairie.model.Document.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DVDRepository extends JpaRepository<DVD, Long> {

    @Query("SELECT d FROM DVD d WHERE d.title = :title")
    List<DVD> getDVDsByTitleIsLike(String title);

    @Query("SELECT d FROM DVD d WHERE d.author = :author")
    List<DVD> getDVDsByAuthorIsLike(String author);

    @Query("SELECT d FROM DVD d WHERE d.editor = :editor")
    List<DVD> getDVDsByEditorIsLike(String editor);

    @Query("SELECT d FROM DVD d WHERE d.dateOfPublication = :dateofpublish")
    List<DVD> getDVDsByDateOfPublication(LocalDate dateofpublish);

    @Query(value = "DELETE from Document d WHERE d.documentId = :documentId")
    void deleteDVDByDocId(Long documentId);

    @Query(value = "select d from Document d WHERE d.documentId = :documentId")
    Document getDocId(Long documentId);
}

