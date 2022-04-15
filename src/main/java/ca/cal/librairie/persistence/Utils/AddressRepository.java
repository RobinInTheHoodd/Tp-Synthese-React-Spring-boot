package ca.cal.librairie.persistence.Utils;

import ca.cal.librairie.model.User.Utils.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long>  {
}
