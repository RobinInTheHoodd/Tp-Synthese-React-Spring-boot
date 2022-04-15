package ca.cal.librairie.model.User.Dto.UtilsDto;

import lombok.Data;

@Data
public class AddressDto {

    private Long id;

    private int houseNumber;
    private  String streetAddress;
    private String city;
    private String state;
    private String zipCode;


}
