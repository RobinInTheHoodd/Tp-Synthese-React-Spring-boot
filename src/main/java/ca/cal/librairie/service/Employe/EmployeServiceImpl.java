package ca.cal.librairie.service.Employe;

import ca.cal.librairie.model.Document.Book;
import ca.cal.librairie.model.Document.CD;
import ca.cal.librairie.model.Document.DVD;
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
import ca.cal.librairie.model.User.Dto.EmployeDto;
import ca.cal.librairie.model.User.Dto.UtilsDto.AddressDto;
import ca.cal.librairie.persistence.Documents.BookRepository;
import ca.cal.librairie.persistence.Documents.CDRepository;
import ca.cal.librairie.persistence.Documents.DVDRepository;
import ca.cal.librairie.persistence.Documents.DocumentRepository;
import ca.cal.librairie.persistence.Users.ClientRepository;
import ca.cal.librairie.persistence.Users.EmployeRepository;
import ca.cal.librairie.persistence.Utils.BillRepository;
import ca.cal.librairie.persistence.Utils.BorrowDocRepository;
import org.jetbrains.annotations.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeServiceImpl implements EmployeService {


    private final EmployeRepository employeRepository;
    private final ClientRepository clientRepository;
    private final BorrowDocRepository borrowDocRepository;
    private final BookRepository bookRepository;
    private final CDRepository cdRepository;
    private final DVDRepository dvdRepository;
    private final BillRepository billRepository;
    private final DocumentRepository documentRepository;

    @Autowired
    private ModelMapper modelMapper;

    public EmployeServiceImpl(ClientRepository clientRepository, EmployeRepository employeRepository, BorrowDocRepository borrowDocRepository, BookRepository bookRepository, CDRepository cdRepository, DVDRepository dvdRepository, BillRepository billRepository, DocumentRepository documentRepository) {
        super();
        this.clientRepository = clientRepository;
        this.employeRepository = employeRepository;
        this.borrowDocRepository = borrowDocRepository;
        this.bookRepository = bookRepository;
        this.cdRepository = cdRepository;
        this.dvdRepository = dvdRepository;
        this.billRepository = billRepository;
        this.documentRepository = documentRepository;
    }

    @Override
    public EmployeDto getEmployeDtoById(long id) {
        if (employeRepository.findById(id).isPresent()) {
            return modelMapper.map(employeRepository.findById(id).get(), EmployeDto.class);
        } else throw new NullPointerException("Aucun Employé avec cette Id : " + id);
    }

    @Transactional
    @Override
    public ClientDto addClientDto(@NotNull ClientDto client) {
        if (client.getId().equals("")) {
            Client client1 = modelMapper.map(client, Client.class);
            System.out.println("Client dans le service " + client1);
            clientRepository.save(client1);
            return modelMapper.map(client1, ClientDto.class);
        } else {
            System.out.println("Client dans le service add" + client);
            return updateClientDto(client);
        }
    }

    @Override
    public List<ClientDto> getClientsDto() {
        return clientRepository.findAll().stream().map(client -> {
            modelMapper.map(client.getAddress(), AddressDto.class);
            return modelMapper.map(client, ClientDto.class);
        }).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public ClientDto updateClientDto(@NotNull ClientDto clientDto) {
        System.out.println(Long.parseLong(clientDto.getId()));
        Client client = clientRepository.findById(Long.parseLong(clientDto.getId())).get();

        client.setFirstName(clientDto.getFirstName());
        client.setSecondName(clientDto.getSecondName());
        client.setEmail(clientDto.getEmail());
        client.setPassword(clientDto.getPassword());
        client.setBitrhday(clientDto.getBitrhday());
        client.setPhoneNumber(clientDto.getPhoneNumber());
        client.getAddress().setHouseNumber(clientDto.getAddress().getHouseNumber());
        client.getAddress().setStreetAddress(clientDto.getAddress().getStreetAddress());
        client.getAddress().setCity(clientDto.getAddress().getCity());
        client.getAddress().setState(clientDto.getAddress().getState());
        client.getAddress().setZipCode(clientDto.getAddress().getZipCode());

        System.out.println("Client dans update service " + client);
        clientRepository.save(client);

        return modelMapper.map(client, ClientDto.class);
    }

    @Transactional
    @Override
    public void addDocDto(@NotNull documentDto documentDto) {

        if (documentDto.getId().equals("")) {
            if (documentDto.getType().equals("Book")) {
                bookRepository.save(modelMapper.map(documentDto, Book.class));
            } else if (documentDto.getType().equals("CD")) {
                documentDto.setGenre(null);
                cdRepository.save(modelMapper.map(documentDto, CD.class));
            } else {
                documentDto.setGenre(null);
                dvdRepository.save(modelMapper.map(documentDto, DVD.class));
            }
        } else {
            Document document = bookRepository.getDocById(Long.parseLong(documentDto.getId()));
            document.setAuthor(documentDto.getAuthor());
            document.setType(documentDto.getType());
            document.setEditor(documentDto.getEditor());
            document.setDateOfPublication(documentDto.getDateOfPublication());
            document.setExemplary(documentDto.getExemplary());
            documentRepository.save(document);
        }
    }

    @Override
    public ClientDto getClientDtoById(long id) {
        if (clientRepository.findById(id).isPresent()) {
            System.out.println(modelMapper.map(clientRepository.findById(id).get(), ClientDto.class));
            return modelMapper.map(clientRepository.findById(id).get(), ClientDto.class);
        } else throw new NullPointerException("Aucun Client avec cette id : " + id);
    }

    @Override
    public List<BorrowDocDto> getBorrowsDto() {
        return borrowDocRepository.findAll().stream().map(borrowedBook -> {
            modelMapper.map(borrowedBook.getClient().getAddress(), AddressDto.class);
            modelMapper.map(borrowedBook.getClient(), ClientDto.class);
            modelMapper.map(borrowedBook.getDocument(), documentDto.class);
            return modelMapper.map(borrowedBook, BorrowDocDto.class);
        }).collect(Collectors.toList());

    }

    @Transactional
    @Override
    public List<BorrowDocDto> addBorrowDto(@NotNull BorrowForm borrowForm) {
        BorrowDoc borrowDoc = new BorrowDoc();
        List<BorrowDocDto> result = new LinkedList<>();

        if (getClientDtoById(borrowForm.getClient()) == null || getDocumentById(borrowForm.getDocument()) == null) {
            throw new NullPointerException("Aucun Client ou Id trouvé");
        }

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
        Document result;

        if (documentRepository.existsById(documentDtoId)) {
            result = documentRepository.getById(documentDtoId);
        } else result = null;

        return result;
    }

    @Transactional
    @Override
    public Long addBillDto(@NotNull BillForm billForm) {

        Client client = clientRepository.getById(Long.parseLong(billForm.getIdClient()));

        if (client.getFine() == 0 || client.getFine() - Double.parseDouble(billForm.Paid) < 0) {
            return null;
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
    public List<BillDto> getBillsDto() {
        return billRepository.findAll().stream().map(bill -> {
            modelMapper.map(bill.getClient().getAddress(), AddressDto.class);
            modelMapper.map(bill.getClient(), ClientDto.class);
            return modelMapper.map(bill, BillDto.class);
        }).collect(Collectors.toList());
    }

    @Override
    public documentDto getDocsDtoById(long id) {
        if (!documentRepository.existsById(id)) {
            throw new NullPointerException("Aucun Document avec cette id : " + id);
        } else return modelMapper.map(documentRepository.getById(id), documentDto.class);
    }

    @Override
    public void getBorrowsAfterDelay() {
        addFineToBorrowsDtoDelay(borrowDocRepository.getborrowedBookByExpireDelay(LocalDate.now()));
    }

    @Transactional
    @Override
    public void addFineToBorrowsDtoDelay(@NotNull List<BorrowDoc> borrowDocs) {

        double cost = 0.25;

        for (BorrowDoc borrowDoc : borrowDocs) {

            borrowDoc.setLateReturnDay(borrowDoc.getLateReturnDay() + 1);
            borrowDoc.getClient().setFine(borrowDoc.getClient().getFine() + cost);

            clientRepository.save(borrowDoc.getClient());
            borrowDocRepository.save(borrowDoc);
        }
    }

    @Override
    public void deleteBorrow(long id) {
        if (borrowDocRepository.existsById(id)) {
            borrowDocRepository.deleteById(id);
        } else throw new NullPointerException("Aucun Emprunt avec l'id :" + id);
    }

    @Override
    public void deleteClientDtoById(long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public void deleteDocDto(Document deleteDoc) {
        if (deleteDoc.getType().equals("Book")) {
            bookRepository.deleteById(deleteDoc.getDocumentId());
        } else if (deleteDoc.getType().equals("CD")) {
            cdRepository.deleteById(deleteDoc.getDocumentId());
        } else {
            dvdRepository.deleteById(deleteDoc.getDocumentId());
        }
    }

    @Override
    public BillDto getBillById(Long billId) {
        if (!billRepository.existsById(billId)) {
            throw new NullPointerException("Aucune facture trouvé pour : " + billId);
        }
        Bill bill = billRepository.getById(billId);
        return modelMapper.map(bill, BillDto.class);
    }

    @Transactional
    @Override
    public Long updateBorrow(@NotNull BorrowDocDto borrowDocDto) {
        BorrowDoc borrowDoc = borrowDocRepository.getById(Long.parseLong(borrowDocDto.getId()));

        borrowDoc.setDocument(dvdRepository.getDocId(Long.parseLong(borrowDocDto.getDocument().getId())));
        borrowDoc.setClient(clientRepository.getById(Long.parseLong(borrowDocDto.getClient().getId())));

        borrowDoc.setReturned(borrowDocDto.isReturned());
        borrowDoc.setDateBorrowing(borrowDocDto.getDateBorrowing());
        borrowDoc.setDateReturn(borrowDocDto.getDateReturn());
        borrowDoc.setLateReturnDay(borrowDocDto.getLateReturnDay());
        borrowDocRepository.save(borrowDoc);

        System.out.println(borrowDoc);
        return borrowDoc.getId();

    }

    @Transactional
    public BillDto updateBill(BillDto billDto) {

        System.out.println(billDto);

        Bill bill = billRepository.getById(Long.parseLong(billDto.getId()));

        Client client = clientRepository.getById(Long.parseLong(billDto.getClient().getId()));

        bill.setAmount(Double.parseDouble(billDto.getAmount()));
        bill.setClient(client);
        bill.setAccountBalanceAfter(Double.parseDouble(billDto.getAccountBalanceAfter()));
        bill.setPaid(Double.parseDouble(billDto.getPaid()));
        bill.setPaidOn(billDto.getPaidOn());
        bill.setAccountBalanceBefore(Double.parseDouble(billDto.getAccountBalanceBefore()));

        billRepository.save(bill);

        return getBillById(bill.getId());
    }


    public BorrowDocDto getBorrowDtoById(long id) {
        if (!borrowDocRepository.existsById(id)) {
            throw new NullPointerException("L'emprunt avec l'id : " + id + " n'existe pas");
        }
        return modelMapper.map(borrowDocRepository.getBorrowDocBy(id).get(0), BorrowDocDto.class);
    }

}