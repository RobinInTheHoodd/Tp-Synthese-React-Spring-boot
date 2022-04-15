package ca.cal.librairie.model.User.Dto;

import ca.cal.librairie.model.User.Dto.UtilsDto.AddressDto;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class EmployeDto {

    private String id;
    private String firstName;
    private String secondName;
    private String password;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate bitrhday;
    private String phoneNumber;
    private String accountNumber;
    private String email;
    private AddressDto address;
}
