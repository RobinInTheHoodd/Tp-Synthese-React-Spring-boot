package ca.cal.librairie.model.User.Dto;

import ca.cal.librairie.model.Document.Utils.Bill;
import ca.cal.librairie.model.Document.Utils.BorrowDoc;
import ca.cal.librairie.model.User.Dto.UtilsDto.AddressDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@Data
public class ClientDto {


    private String id;
    private String firstName;
    private String secondName;
    private String password;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate bitrhday;
    private String phoneNumber;
    private String email;
    private AddressDto address;
    private double fine;

    @ToString.Exclude
    @JsonIgnore
    private List<BorrowDoc> borrowDocs;
    @ToString.Exclude
    @JsonIgnore
    private List<Bill> bills;



}

