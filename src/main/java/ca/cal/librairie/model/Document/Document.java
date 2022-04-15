package ca.cal.librairie.model.Document;

import ca.cal.librairie.model.Document.Utils.BorrowDoc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "DOCUMENT")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="Type", discriminatorType = DiscriminatorType.STRING)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public abstract class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "DOCUMENT_ID")
    private Long documentId;

    @Column(name="Type", insertable = false, updatable = false)
    private String type;
    private String title;
    private String author;
    private String editor;
    private LocalDate dateOfPublication;
    private int exemplary;

    private long dayForBorrow;


    @OneToMany(mappedBy = "document", fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<BorrowDoc> documentsBorrows;

}
