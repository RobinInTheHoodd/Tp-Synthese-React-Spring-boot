package ca.cal.librairie.model.User.Utils;

import lombok.Data;

@Data
public class SearchBar {

    private  String research;
    private  boolean title;
    private  boolean author;
    private  boolean editor;
    private  boolean genre;
    private String type;
}
