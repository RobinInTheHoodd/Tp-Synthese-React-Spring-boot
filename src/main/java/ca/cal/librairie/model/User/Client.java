package ca.cal.librairie.model.User;


import ca.cal.librairie.model.Document.Utils.Bill;
import ca.cal.librairie.model.Document.Utils.BorrowDoc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;


@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Client extends User {

    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="user_seq")
    @SequenceGenerator(
            name="user_seq",
            sequenceName="user_sequence"
    )
    private Long id;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private Set<BorrowDoc> borrowDocs = new HashSet<>();

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Bill> bills = new LinkedList<>();

    private double fine;

    public void addBorrowBook(BorrowDoc book) {
        this.borrowDocs.add(book);
    }
}
