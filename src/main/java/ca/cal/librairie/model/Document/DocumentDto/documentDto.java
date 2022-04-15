package ca.cal.librairie.model.Document.DocumentDto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class documentDto {

    private String id;
    private String type;
    private String title;
    private String author;
    private String editor;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfPublication;
    private int numberPage;
    private int exemplary;
    private String genre;

}
