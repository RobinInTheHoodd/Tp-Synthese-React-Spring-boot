package ca.cal.librairie.persistence.Utils;

import ca.cal.librairie.model.Document.Utils.BorrowDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BorrowDocRepository extends JpaRepository<BorrowDoc, Long> {

    @Query("SELECT d FROM BorrowDoc d WHERE d.dateReturn < :currentdate AND d.returned IS FALSE ")
    List<BorrowDoc> getborrowedBookByExpireDelay(LocalDate currentdate);

    @Query("SELECT b FROM BorrowDoc  b WHERE b.id = :id")
    List<BorrowDoc> getBorrowDocBy(long id);
}
