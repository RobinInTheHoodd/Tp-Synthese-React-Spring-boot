package ca.cal.librairie.model.Document.Utils;

import ca.cal.librairie.model.Document.Document;
import ca.cal.librairie.model.User.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BorrowDoc {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    @ToString.Exclude
    @JsonIgnore
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DOCUMENT_ID")
    @ToString.Exclude
    private Document document;

    private LocalDate dateBorrowing;
    private LocalDate dateReturn;
    private int lateReturnDay = 0;
    private boolean returned;

}
