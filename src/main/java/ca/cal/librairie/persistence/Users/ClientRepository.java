package ca.cal.librairie.persistence.Users;

import ca.cal.librairie.model.Document.Utils.BorrowDoc;
import ca.cal.librairie.model.User.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;


@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    List<Client> getClientByFirstName(String firtName);

    @Query("SELECT c.borrowDocs FROM Client c WHERE c.id = :identif")
    List<BorrowDoc> getAllBorrowDoc(long identif);

    @Query("SELECT c.borrowDocs FROM Client c WHERE c.id = :identif")
    List<BorrowDoc> getBorrowDocById(long identif);

}
