package ca.cal.librairie.model.Document.DocumentDto.UtilsDto;

import ca.cal.librairie.model.Document.DocumentDto.documentDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class BorrowDocDto {

    private String id;
    private ClientDto client;
    private documentDto document;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateBorrowing;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateReturn;
    private int lateReturnDay;
    private boolean returned;


}
