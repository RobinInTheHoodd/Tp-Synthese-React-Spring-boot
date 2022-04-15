package ca.cal.librairie.model.Document.DocumentDto.UtilsDto;

import ca.cal.librairie.model.User.Dto.ClientDto;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class BillDto {

    private String id;
    private String amount;
    private String paid;
    private ClientDto client;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate paidOn;
    private String accountBalanceBefore;
    private String accountBalanceAfter;

}

