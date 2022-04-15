package ca.cal.librairie.persistence.Users;

import ca.cal.librairie.model.User.Client;
import ca.cal.librairie.model.User.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long> {

    @Query("SELECT c from Client c where c.password = :password AND c.email = :username")
    public Optional<Client> CheckClientLogin(String username, String password);

    @Query("SELECT c from Employe c where c.password = :password AND c.email = :username")
    public Optional<Employe> CheckEmployeLogin(String username, String password);

    @Query("SELECT c FROM Client  c where c.id = :id")
    Client UpdateClientById(Long id);
}
