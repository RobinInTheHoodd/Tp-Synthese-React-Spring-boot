package ca.cal.librairie.model.Document.Utils;

import ca.cal.librairie.model.User.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bill")
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private double amount;
    private double paid;
    private LocalDate paidOn;
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
    @JoinColumn(name = "client_id")
    private Client client;
    private double accountBalanceBefore;
    private double accountBalanceAfter;
}
