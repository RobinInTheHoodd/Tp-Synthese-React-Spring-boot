package ca.cal.librairie.model.User;

import ca.cal.librairie.model.User.Utils.Address;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @ToString.Exclude
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    @ToString.Exclude
    private Address address;
    private String firstName;
    private String secondName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate bitrhday;
    private String phoneNumber;
    private String email;
    private String password;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
