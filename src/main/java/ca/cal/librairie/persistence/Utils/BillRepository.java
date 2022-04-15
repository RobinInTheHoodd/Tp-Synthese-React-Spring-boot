package ca.cal.librairie.persistence.Utils;

import ca.cal.librairie.model.Document.Utils.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query("SELECT b FROM Bill b WHERE b.client.id = :id")
    public List<Bill> getBillByClientId(Long id);

    @Query("SELECT b FROM Bill b WHERE b.id = :id")
    public List<Bill> getBillsById(Long id);


}
