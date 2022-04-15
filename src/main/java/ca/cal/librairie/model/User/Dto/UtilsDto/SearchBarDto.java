package ca.cal.librairie.model.User.Dto.UtilsDto;

import lombok.Data;

@Data
public class SearchBarDto {

    private  String research;
    private  boolean title;
    private  boolean author;
    private  boolean editor;
    private  boolean genre;
    private  String type;
}
