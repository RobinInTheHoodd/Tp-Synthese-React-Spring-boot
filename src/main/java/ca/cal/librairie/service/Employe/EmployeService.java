package ca.cal.librairie.service.Employe;

import ca.cal.librairie.model.Document.Document;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BillForm;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BorrowForm;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.Document.Utils.BorrowDoc;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Dto.EmployeDto;
import ca.cal.librairie.model.Document.DocumentDto.documentDto;

import java.util.List;

public interface EmployeService {


    EmployeDto getEmployeDtoById(long id);

    List<ClientDto> getClientsDto();

    ClientDto getClientDtoById(long id);

    ClientDto addClientDto(ClientDto client);

    ClientDto updateClientDto(ClientDto clientDto);

    void deleteClientDtoById(long id);

    documentDto getDocsDtoById(long id);

    Document getDocumentById(Long documentDtoId);

    void addDocDto(documentDto documentDto);

    void deleteDocDto(Document deleteDoc);

    List<BillDto> getBillsDto();

    BillDto getBillById(Long billId);

    Long addBillDto(BillForm billForm);

    List<BorrowDocDto> getBorrowsDto();

    List<BorrowDocDto> addBorrowDto(BorrowForm borrowForm);

    void deleteBorrow(long id);

    Long updateBorrow(BorrowDocDto updateBorrowDocDto);


    void getBorrowsAfterDelay();

    void addFineToBorrowsDtoDelay(List<BorrowDoc> borrowDocs);


}
