package ca.cal.librairie.model.Document.DocumentDto.Forms;

import lombok.Data;

@Data
public class BorrowForm {

    private Long document;
    private Long client;
    private Long borrow;


}
