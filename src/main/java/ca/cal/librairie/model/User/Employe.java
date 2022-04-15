package ca.cal.librairie.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;

@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Employe extends User{

    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="user_seq")
    @SequenceGenerator(
            name="employe_seq",
            sequenceName="user_sequence"
    )
    private Long id;
}
