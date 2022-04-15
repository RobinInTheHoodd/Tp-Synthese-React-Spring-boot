package ca.cal.librairie.persistence.Users;

import ca.cal.librairie.model.User.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query("SELECT c FROM Admin  c WHERE c.email = :username AND c.password = :password")
    Optional<Admin> CheckAdminLogin(String username, String password);

}
