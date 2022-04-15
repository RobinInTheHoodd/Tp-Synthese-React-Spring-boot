package ca.cal.librairie.service.Admin;

import ca.cal.librairie.model.Document.Document;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BillForm;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.Document.DocumentDto.documentDto;
import ca.cal.librairie.model.Document.Utils.Bill;
import ca.cal.librairie.model.Document.Utils.BorrowDoc;
import ca.cal.librairie.model.User.Client;
import ca.cal.librairie.model.User.Dto.AdminDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Dto.EmployeDto;
import ca.cal.librairie.model.User.Dto.UtilsDto.AddressDto;
import ca.cal.librairie.model.User.Employe;
import ca.cal.librairie.persistence.Documents.BookRepository;
import ca.cal.librairie.persistence.Documents.CDRepository;
import ca.cal.librairie.persistence.Documents.DVDRepository;
import ca.cal.librairie.persistence.Documents.DocumentRepository;
import ca.cal.librairie.persistence.Users.AdminRepository;
import ca.cal.librairie.persistence.Users.ClientRepository;
import ca.cal.librairie.persistence.Users.EmployeRepository;
import ca.cal.librairie.persistence.Utils.BillRepository;
import ca.cal.librairie.persistence.Utils.BorrowDocRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final EmployeRepository employeRepository;
    private final ClientRepository clientRepository;
    private final BorrowDocRepository borrowDocRepository;
    private final BookRepository bookRepository;
    private final CDRepository cdRepository;
    private final DVDRepository dvdRepository;
    private final BillRepository billRepository;
    private final AdminRepository adminRepository;
    private final DocumentRepository documentRepository;

    @Autowired
    private ModelMapper modelMapper;

    public AdminServiceImpl(EmployeRepository employeRepository, ClientRepository clientRepository, BorrowDocRepository borrowDocRepository, BookRepository bookRepository, CDRepository cdRepository, DVDRepository dvdRepository, BillRepository billRepository, AdminRepository adminRepository, DocumentRepository documentRepository) {
        this.employeRepository = employeRepository;
        this.clientRepository = clientRepository;
        this.borrowDocRepository = borrowDocRepository;
        this.bookRepository = bookRepository;
        this.cdRepository = cdRepository;
        this.dvdRepository = dvdRepository;
        this.billRepository = billRepository;
        this.adminRepository = adminRepository;
        this.documentRepository = documentRepository;
    }


    @Override
    public List<EmployeDto> getEmployes() {
        return employeRepository.findAll().stream().map(employe -> modelMapper.map(employe, EmployeDto.class)).toList();
    }

    @Override
    public AdminDto getAdminDtoById(Long id) {
        if (adminRepository.findById(id).isPresent()) {
            return modelMapper.map(adminRepository.findById(id).get(), AdminDto.class);
        } else throw new NullPointerException("Aucun admin trouvé");
    }

    @Transactional
    @Override
    public EmployeDto addEmployeDto(EmployeDto employeDto) {
        if (employeDto.getId().equals("")) {
            Employe employe = modelMapper.map(employeDto, Employe.class);
            employeRepository.save(employe);
            return modelMapper.map(employe, EmployeDto.class);
        } else {
            return updateEmploye(employeDto);
        }
    }

    @Transactional
    @Override
    public EmployeDto updateEmploye(EmployeDto employeDto) {

        Employe employe = employeRepository.getById(Long.parseLong(employeDto.getId()));

        if (!employeRepository.existsById(Long.parseLong(employeDto.getId()))) {
            throw new NullPointerException("Aucun Client trouvé");
        }

        employe.setFirstName(employeDto.getFirstName());
        employe.setSecondName(employeDto.getSecondName());
        employe.setEmail(employeDto.getEmail());
        employe.setPassword(employeDto.getPassword());
        employe.setBitrhday(employeDto.getBitrhday());
        employe.setPhoneNumber(employeDto.getPhoneNumber());
        employe.getAddress().setHouseNumber(employeDto.getAddress().getHouseNumber());
        employe.getAddress().setStreetAddress(employeDto.getAddress().getStreetAddress());
        employe.getAddress().setCity(employeDto.getAddress().getCity());
        employe.getAddress().setState(employeDto.getAddress().getState());
        employe.getAddress().setZipCode(employeDto.getAddress().getZipCode());

        employeRepository.save(employe);
        return modelMapper.map(employe, EmployeDto.class);
    }

    @Transactional
    @Override
    public void deleteDocDto(Document removeDoc) {
        if (!documentRepository.existsById(removeDoc.getDocumentId())) {
            throw new NullPointerException("Aucun Document avec cette id :" + removeDoc.getDocumentId());
        } else {
            documentRepository.deleteById(removeDoc.getDocumentId());
        }
    }

    @Transactional
    @Override
    public List<BorrowDocDto> updateBorrow(BorrowDocDto borrowDocDto) {
        System.out.println(borrowDocDto.getId());
        BorrowDoc borrowDoc = borrowDocRepository.getById(Long.parseLong(borrowDocDto.getId()));

        borrowDoc.setDocument(dvdRepository.getDocId(Long.parseLong(borrowDocDto.getDocument().getId())));
        borrowDoc.setClient(clientRepository.getById(Long.parseLong(borrowDocDto.getClient().getId())));

        borrowDoc.setReturned(borrowDocDto.isReturned());
        borrowDoc.setDateBorrowing(borrowDocDto.getDateBorrowing());
        borrowDoc.setDateReturn(borrowDocDto.getDateReturn());
        borrowDoc.setLateReturnDay(borrowDocDto.getLateReturnDay());
        borrowDocRepository.save(borrowDoc);

        return clientRepository.getAllBorrowDoc(borrowDoc.getId()).stream().map(borrowedBook -> {
            modelMapper.map(borrowedBook.getClient().getAddress(), AddressDto.class);
            modelMapper.map(borrowedBook.getClient(), ClientDto.class);
            modelMapper.map(borrowedBook.getDocument(), documentDto.class);
            return modelMapper.map(borrowedBook, BorrowDocDto.class);
        }).collect(Collectors.toList());

    }

    @Override
    public List<BillDto> getBillDtoById(Long id) {
        return billRepository.getBillsById(id).stream().map(bill -> {
            modelMapper.map(bill.getClient().getAddress(), AddressDto.class);
            modelMapper.map(bill.getClient(), ClientDto.class);
            return modelMapper.map(bill, BillDto.class);
        }).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteBillDto(BillDto billDto) {
        billRepository.deleteById(Long.parseLong(billDto.getId()));
    }

    @Transactional
    @Override
    public void deleteEmployeDto(Long id) {
        if (!employeRepository.existsById(id)) {
            throw new NullPointerException("Aucun Employe avec cette id :" + id);
        }
        employeRepository.deleteById(id);
    }

    @Transactional
    @Override
    public List<BillDto> updateBillDto(BillDto billDto) {

        List<BillDto> result = new LinkedList<>();
        Bill bill = billRepository.getById(Long.parseLong(billDto.getId()));

        bill.setAmount(Double.parseDouble(billDto.getAmount()));
        bill.setClient(clientRepository.getById(Long.parseLong(billDto.getClient().getId())));
        bill.setAccountBalanceAfter(Double.parseDouble(billDto.getAccountBalanceAfter()));
        bill.setPaid(Double.parseDouble(billDto.getPaid()));
        bill.setPaidOn(billDto.getPaidOn());
        bill.setAccountBalanceBefore(Double.parseDouble(billDto.getAccountBalanceBefore()));

        billRepository.save(bill);
        result.add(modelMapper.map(billRepository.getById(bill.getId()), BillDto.class));
        return result;
    }

    @Transactional
    @Override
    public Long addBillDto(BillForm billDto) {

        Client client = clientRepository.getById(Long.parseLong(billDto.getIdClient()));

        Bill bill = new Bill();
        bill.setPaid(Double.parseDouble(billDto.getPaid()));
        bill.setClient(client);
        bill.setAccountBalanceBefore(client.getFine());
        bill.setAmount(client.getFine());
        bill.setPaidOn(LocalDate.now());
        bill.setAccountBalanceAfter(bill.getAccountBalanceBefore() - bill.getPaid());
        client.setFine(bill.getAccountBalanceBefore() - bill.getPaid());

        billRepository.save(bill);
        return bill.getId();
    }
}
