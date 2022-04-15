package ca.cal.librairie.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Admin extends User{
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="user_seq")
    @SequenceGenerator(
            name="user_seq",
            sequenceName="user_sequence"
    )
    private Long id;
}
