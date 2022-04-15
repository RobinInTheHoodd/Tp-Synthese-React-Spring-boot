package ca.cal.librairie.service.Client;

import ca.cal.librairie.model.Document.Document;
import ca.cal.librairie.model.Document.DocumentDto.*;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BillForm;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BorrowForm;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Utils.SearchBar;

import java.util.List;


public interface ClientService {

    ClientDto getClientDtoById(long id);

    List<documentDto> getBooksDto();

    List<documentDto> getBooksDtoByFilter(SearchBar searchBar);

    List<documentDto> getBooksDtoByTitle(String title);

    List<documentDto> getBooksDtoByAuthor(String author);

    List<documentDto> getBooksDtoByEditor(String editor);

    List<documentDto> getBooksDtoByGenre(String genre);

    List<documentDto> getCDsDto();

    List<documentDto> getCDsDtoByFilter(SearchBar searchBar);

    List<documentDto> getCDsDtoByTitle(String title);

    List<documentDto> getCDsDtoByAuthor(String author);

    List<documentDto> getCDsDtoByEditor(String editor);

    List<documentDto> getDVDsDto();

    List<documentDto> getDVDsDtoByFilter(SearchBar searchBar);

    List<documentDto> getDVDsDtoByTitle(String title);

    List<documentDto> getDVDsDtoByAuthor(String author);

    List<documentDto> getDVDsDtoByEditor(String editor);

    List<documentDto> getDocsDto();

    Document getDocById(long id);

    List<documentDto> getDocsDtoByFilter(SearchBar searchBar);

    List<documentDto> getDocsDtoByTitle(String title);

    List<documentDto> getDocsDtoByAuthor(String author);

    List<documentDto> getDocsDtoByEditor(String editor);

    List<BorrowDocDto> addBorrowDto(BorrowForm borrowForm);

    List<BorrowDocDto> getBorrowsByClientId(Long id);

    Long addBill(BillForm billForm);

    List<BillDto> getBillsByClientId(Long id);

}
