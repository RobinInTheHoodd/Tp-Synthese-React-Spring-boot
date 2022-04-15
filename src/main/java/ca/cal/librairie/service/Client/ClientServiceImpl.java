package ca.cal.librairie.service.Client;

import ca.cal.librairie.model.Document.Book;
import ca.cal.librairie.model.Document.CD;
import ca.cal.librairie.model.Document.Document;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BillForm;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BorrowForm;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.Document.DocumentDto.documentDto;
import ca.cal.librairie.model.Document.Utils.Bill;
import ca.cal.librairie.model.Document.Utils.BorrowDoc;
import ca.cal.librairie.model.User.Client;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Dto.UtilsDto.AddressDto;
import ca.cal.librairie.model.User.Employe;
import ca.cal.librairie.model.User.Utils.SearchBar;
import ca.cal.librairie.persistence.Documents.BookRepository;
import ca.cal.librairie.persistence.Documents.CDRepository;
import ca.cal.librairie.persistence.Documents.DVDRepository;
import ca.cal.librairie.persistence.Documents.DocumentRepository;
import ca.cal.librairie.persistence.Users.ClientRepository;
import ca.cal.librairie.persistence.Users.EmployeRepository;
import ca.cal.librairie.persistence.Utils.BillRepository;
import ca.cal.librairie.persistence.Utils.BorrowDocRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final BorrowDocRepository borrowDocRepository;
    private final BookRepository bookRepository;
    private final CDRepository cdRepository;
    private final DVDRepository dvdRepository;
    private final DocumentRepository documentRepository;
    private final BillRepository billRepository;
    private final EmployeRepository employeRepository;
    @Autowired
    private ModelMapper modelMapper;


    public ClientServiceImpl(ClientRepository clientRepository, BorrowDocRepository borrowDocRepository, BookRepository bookRepository, CDRepository cdRepository, DVDRepository dvdRepository, DocumentRepository documentRepository, BillRepository billRepository, EmployeRepository employeRepository) {
        this.clientRepository = clientRepository;
        this.borrowDocRepository = borrowDocRepository;
        this.bookRepository = bookRepository;
        this.cdRepository = cdRepository;
        this.dvdRepository = dvdRepository;
        this.documentRepository = documentRepository;
        this.billRepository = billRepository;
        this.employeRepository = employeRepository;
    }

    @Override
    public ClientDto getClientDtoById(long id) {
        checkNotNull(clientRepository.findById(id));
        System.out.println(clientRepository.findById(id));
        return modelMapper.map(clientRepository.findById(id).get(), ClientDto.class);

    }

    @Override
    public List<documentDto> getBooksDto() {
        return bookRepository.findAll().stream().map(book -> modelMapper.map(book, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getBooksDtoByFilter(SearchBar searchBar) {

        List<documentDto> documentDtos;

        if (searchBar.isTitle()) {
            documentDtos = getBooksDtoByTitle(searchBar.getResearch());
        } else if (searchBar.isAuthor()) {
            documentDtos = getBooksDtoByAuthor(searchBar.getResearch());
        } else if (searchBar.isEditor()) {
            documentDtos = getBooksDtoByEditor(searchBar.getResearch());
        } else if (searchBar.isGenre()) {
            documentDtos = getBooksDtoByGenre(searchBar.getResearch());
        } else documentDtos = getBooksDto();

        return documentDtos;
    }

    @Override
    public List<documentDto> getBooksDtoByTitle(String title) {
        return bookRepository.getBooksByTitleIsLike(title).stream().map(book -> modelMapper.map(book, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getBooksDtoByAuthor(String author) {
        return bookRepository.getBooksByAuthorIsLike(author).stream().map(book -> modelMapper.map(book, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getBooksDtoByEditor(String editor) {
        return bookRepository.getBooksByEditorIsLike(editor).stream().map(book -> modelMapper.map(book, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getBooksDtoByGenre(String genre) {
        return bookRepository.getBooksByGenre(genre).stream().map(book -> modelMapper.map(book, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getCDsDto() {
        return cdRepository.findAll().stream().map(cd -> modelMapper.map(cd, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getCDsDtoByFilter(SearchBar searchBar) {
        List<documentDto> documentDtos;

        if (searchBar.isTitle()) {
            documentDtos = getCDsDtoByTitle(searchBar.getResearch());
        } else if (searchBar.isAuthor()) {
            documentDtos = getCDsDtoByAuthor(searchBar.getResearch());
        } else if (searchBar.isEditor()) {
            documentDtos = getCDsDtoByEditor(searchBar.getResearch());
        } else documentDtos = getCDsDto();

        return documentDtos;
    }

    @Override
    public List<documentDto> getCDsDtoByTitle(String title) {
        return cdRepository.getCDsByTitleIsLike(title).stream().map(cd -> modelMapper.map(cd, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getCDsDtoByAuthor(String author) {
        return cdRepository.getCDsByAuthorIsLike(author).stream().map(cd -> modelMapper.map(cd, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getCDsDtoByEditor(String editor) {
        return cdRepository.getCDsByEditorIsLike(editor).stream().map(cd -> modelMapper.map(cd, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getDVDsDto() {
        return dvdRepository.findAll().stream().map(dvd -> modelMapper.map(dvd, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getDVDsDtoByFilter(SearchBar searchBar) {

        List<documentDto> documentDtos;

        if (searchBar.isTitle()) {
            documentDtos = getDVDsDtoByTitle(searchBar.getResearch());
        } else if (searchBar.isAuthor()) {
            documentDtos = getDVDsDtoByAuthor(searchBar.getResearch());
        } else if (searchBar.isEditor()) {
            documentDtos = getDVDsDtoByEditor(searchBar.getResearch());
        } else documentDtos = getDVDsDto();

        return documentDtos;
    }

    @Override
    public List<documentDto> getDVDsDtoByTitle(String title) {
        return dvdRepository.getDVDsByTitleIsLike(title).stream().map(dvd -> modelMapper.map(dvd, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getDVDsDtoByAuthor(String author) {
        return dvdRepository.getDVDsByAuthorIsLike(author).stream().map(dvd -> modelMapper.map(dvd, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getDVDsDtoByEditor(String editor) {
        return dvdRepository.getDVDsByEditorIsLike(editor).stream().map(dvd -> modelMapper.map(dvd, documentDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<documentDto> getDocsDto() {
        return documentRepository.getDocs().stream().map(document -> modelMapper.map(document, documentDto.class)).toList();
    }

    public Document getDocById(long id) {

        if (documentRepository.existsById(id)) {
            return documentRepository.getById(id);
        } else throw new NullPointerException("Aucun Id trouvé");


    }

    @Override
    public List<documentDto> getDocsDtoByFilter(SearchBar searchBar) {

        List<documentDto> result;

        if (searchBar.isTitle()) {
            result = getDocsDtoByTitle(searchBar.getResearch());
        } else if (searchBar.isAuthor()) {
            result = getDocsDtoByAuthor(searchBar.getResearch());
        } else if (searchBar.isEditor()) {
            result = getDocsDtoByEditor(searchBar.getResearch());
        } else result = getDocsDto();

        return result;
    }

    @Override
    public List<documentDto> getDocsDtoByTitle(String title) {
        return documentRepository.getDocsByTitleIsLike(title).stream().map(document -> modelMapper.map(document, documentDto.class)).toList();
    }

    @Override
    public List<documentDto> getDocsDtoByAuthor(String author) {
        return documentRepository.getDocsByAuthorIsLike(author).stream().map(document -> modelMapper.map(document, documentDto.class)).toList();
    }

    @Override
    public List<documentDto> getDocsDtoByEditor(String editor) {
        return documentRepository.getDocsByGenreIsLike(editor).stream().map(document -> modelMapper.map(document, documentDto.class)).toList();
    }

    @Override
    public List<BorrowDocDto> addBorrowDto(BorrowForm borrowForm) {
        BorrowDoc borrowDoc = new BorrowDoc();
        List<BorrowDocDto> result = new LinkedList<>();

        borrowDoc.setClient(modelMapper.map(getClientDtoById(borrowForm.getClient()), Client.class));
        borrowDoc.setDocument(getDocumentById(borrowForm.getDocument()));

        if (borrowDoc.getDocument().getExemplary() == 0) {
            return result;
        }

        borrowDoc.getDocument().setExemplary(borrowDoc.getDocument().getExemplary() - 1);
        borrowDoc.setReturned(false);
        if (borrowDoc.getDocument().getType().equals("Book")) {
            borrowDoc.setDateBorrowing(LocalDate.now());
            borrowDoc.setDateReturn(LocalDate.now().plusDays(21));
        } else if (borrowDoc.getDocument().getType().equals("CD")) {
            borrowDoc.setDateBorrowing(LocalDate.now());
            borrowDoc.setDateReturn(LocalDate.now().plusDays(14));
        } else {
            borrowDoc.setDateBorrowing(LocalDate.now());
            borrowDoc.setDateReturn(LocalDate.now().plusDays(7));
        }

        borrowDocRepository.save(borrowDoc);
        result.add(modelMapper.map(borrowDoc, BorrowDocDto.class));

        return result;
    }

    public Document getDocumentById(Long documentDtoId) {

        return documentRepository.getById(documentDtoId);
    }


    @Override
    public List<BorrowDocDto> getBorrowsByClientId(Long id) {
        return clientRepository.getAllBorrowDoc(id).stream().map(borrowedBook -> {
            modelMapper.map(borrowedBook.getClient().getAddress(), AddressDto.class);
            modelMapper.map(borrowedBook.getClient(), ClientDto.class);
            modelMapper.map(borrowedBook.getDocument(), documentDto.class);
            return modelMapper.map(borrowedBook, BorrowDocDto.class);
        }).collect(Collectors.toList());
    }

    @Override
    public Long addBill(BillForm billForm) {

        Client client = clientRepository.getById(Long.parseLong(billForm.getIdClient()));

        if (client.getFine() == 0 || client.getFine() - Double.parseDouble(billForm.Paid) < 0) {
            throw new NumberFormatException("Montant trop grand que demandé");
        }

        Bill bill = new Bill();
        bill.setClient(client);
        bill.setPaid(Double.parseDouble(billForm.getPaid()));
        bill.setAccountBalanceBefore(client.getFine());
        bill.setAmount(client.getFine());
        bill.setPaidOn(LocalDate.now());
        bill.setAccountBalanceAfter(bill.getAccountBalanceBefore() - bill.getPaid());
        client.setFine(bill.getAccountBalanceBefore() - bill.getPaid());

        billRepository.save(bill);

        return bill.getId();
    }

    @Override
    public List<BillDto> getBillsByClientId(Long id) {
        return clientRepository.getById(id).getBills().stream().map(bill -> modelMapper.map(bill, BillDto.class)).toList();
    }


    public void addBook(Book book) {
        bookRepository.save(book);
    }

    public void addCD(CD cd) {
        cdRepository.save(cd);
    }

    public void checkNotNull(Object object) {
        if (object == null) throw new NullPointerException("non trouvé");
    }

    public void addClienttest(Client client) {
        checkNotNull(client);
        clientRepository.save(client);
    }

    public void addEmployetest(Employe client) {
        checkNotNull(client);
        employeRepository.save(client);

    }

}
