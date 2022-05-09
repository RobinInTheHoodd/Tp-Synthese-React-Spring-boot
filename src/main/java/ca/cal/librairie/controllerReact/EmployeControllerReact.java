package ca.cal.librairie.controllerReact;

import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.Document.DocumentDto.documentDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Dto.EmployeDto;
import ca.cal.librairie.service.Client.ClientServiceImpl;
import ca.cal.librairie.service.Employe.EmployeServiceImpl;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("{id}/employeReact")
public class EmployeControllerReact {

    private final EmployeServiceImpl employeService;
    private final ClientServiceImpl clientService;
    Logger logger = LoggerFactory.getLogger(ClientControllerReact.class);

    public EmployeControllerReact(EmployeServiceImpl employeService, ClientServiceImpl clientService) {
        this.employeService = employeService;
        this.clientService = clientService;
    }


    @GetMapping("/employes")
    public List<EmployeDto> getEmployes(){
        return employeService.getEmployesDto();
    }

    @GetMapping("/employe")
    public List<EmployeDto> getEmploye(@PathVariable(name = "id") Long id) {
        List<EmployeDto> result = new ArrayList<>();
        result.add(employeService.getEmployeDtoById(id));
        return  result;
    }

    @PostMapping("/newEmploye")
    public void newEmploye(@RequestBody Map<String, Object> payLoad) {
        ModelMapper mapper = new ModelMapper();
        EmployeDto employeDto = mapper.map(payLoad, EmployeDto.class);
        LocalDate birthday = LocalDate.parse((String)payLoad.get("bitrhday"));
        employeDto.setBitrhday(birthday);
        employeService.addEmploye(employeDto);
    }

    @PostMapping("/editEmploye")
    public void updateEmploye(@RequestBody Map<String, Object> payLoad) {
        ModelMapper mapper = new ModelMapper();
        EmployeDto employeDto = mapper.map(payLoad, EmployeDto.class);
        LocalDate birthday = LocalDate.parse((String)payLoad.get("bitrhday"));
        employeDto.setBitrhday(birthday);
        employeService.updateEmployeDto(employeDto);
    }

    @PostMapping("/deleteEmploye")
    public void deleteEmploye(@RequestBody Map<String, Object> payLoad) throws IllegalAccessException {
        ModelMapper mapper = new ModelMapper();
        EmployeDto employeDto = mapper.map(payLoad, EmployeDto.class);
        LocalDate birthday = LocalDate.parse((String)payLoad.get("bitrhday"));
        employeDto.setBitrhday(birthday);
        employeService.deleteEmploye(employeDto);
    }

    @GetMapping("/getClients")
    public List<ClientDto> getClients() {
        return employeService.getClientsDto();
    }


    @PostMapping("/deleteClient")
    public void deleteClient(@RequestBody Map<String, Object> payLoad) {
        long idClient = Long.parseLong((String) payLoad.get("idClient"));
        employeService.deleteClientDtoById(idClient);

    }

    @PostMapping("/createClient")
    public void addClient(@RequestBody Map<String, Object> payLoad) {
        ModelMapper modelMapper = new ModelMapper();
        ClientDto clientDto = modelMapper.map(payLoad, ClientDto.class);
        employeService.addClientDto(clientDto);
    }

    @PostMapping("/editClient")
    public void editClient(@RequestBody Map<String, Object> payLoad) {
        ModelMapper mapper = new ModelMapper();
        ClientDto clientDto = mapper.map(payLoad, ClientDto.class);
        LocalDate date = LocalDate.parse((String)payLoad.get("bitrhday"));
        clientDto.setBitrhday(date);

        employeService.updateClientDto(clientDto);
        System.out.println("Client avec mapper " + clientDto);
    }


    @PostMapping("/getBorrowsClientId")
    public List<BorrowDocDto> getBorrowByIdClient(@RequestBody Map<String, Object> payLoad) {
        System.out.println(payLoad);
        return employeService.getClientBorrowId(Long.parseLong((String) payLoad.get("id")));
    }

    @GetMapping("/getBorrowsClient")
    public List<BorrowDocDto> getBorrowsClient() {
        System.out.println("Bonjur");
        return employeService.getBorrowsDto();
    }

    @PostMapping("/addBorrows")
    public void addBorrowDoc(@RequestBody Map<String, Object> payLoad) {
        ModelMapper mapper = new ModelMapper();
        ClientDto clientDto = new ClientDto();
        String idClient = (String) payLoad.get("idClient");

        List<Object> list = mapper.map(payLoad.get("documents"), List.class);
        list.forEach(document -> {
            BorrowDocDto borrowDocDto = new BorrowDocDto();
            clientDto.setId(idClient);
            borrowDocDto.setClient(clientDto);
            borrowDocDto.setDocument(mapper.map(document, documentDto.class));
            System.out.println(borrowDocDto);
            clientService.addBorrowDto(borrowDocDto);
        });
    }


    @PostMapping("/editBorrow")
    public void updateBorrow(@RequestBody Map<String, Object> payLoad) {
        ModelMapper mapper = new ModelMapper();
        BorrowDocDto borrowDocDto = mapper.map(payLoad, BorrowDocDto.class);
        LocalDate dateBorrowing = LocalDate.parse((String)payLoad.get("dateBorrowing"));
        LocalDate dateReturn = LocalDate.parse((String)payLoad.get("dateReturn"));
        borrowDocDto.setDateBorrowing(dateBorrowing);
        borrowDocDto.setDateReturn(dateReturn);
        System.out.println(borrowDocDto);
        employeService.updateBorrow(borrowDocDto);
    }

    @PostMapping("/deleteBorrow")
    public void deleteBorrow(@RequestBody Map<String, Object> payLoad) {
        employeService.deleteBorrow(Long.parseLong((String)payLoad.get("id")));
    }


    @PostMapping("/getBillsClient")
    public List<BillDto> getBillsByIdClient(@RequestBody Map<String, Object> payLoad) {
        return employeService.getBillsByIdClient(Long.parseLong((String) payLoad.get("id")));
    }

    @GetMapping("/getBills")
    public List<BillDto> getBills() {
        return employeService.getBillsDto();
    }

    @PostMapping("/editBills")
    public void updateBills(@RequestBody Map<String, Object> payLoad) {
        ModelMapper mapper = new ModelMapper();
        BillDto billDto = mapper.map(payLoad, BillDto.class);
        LocalDate paidOn = LocalDate.parse((String)payLoad.get("paidOn"));
        billDto.setPaidOn(paidOn);
        employeService.updateBill(billDto);
    }

    @PostMapping("/deleteBill")
    public void deleteBill(@RequestBody Map<String, Object> payLoad) {
        employeService.deleteBill(Long.parseLong((String)payLoad.get("id")));
    }

    @PostMapping("/addDocument")
    public void addDocuments(@RequestBody Map<String, Object> payLoad) {

        ModelMapper modelMapper = new ModelMapper();
        documentDto temp = modelMapper.map(payLoad, documentDto.class);
        LocalDate date = LocalDate.parse((String)payLoad.get("dateOfPublication"));
        temp.setDateOfPublication(date);
        System.out.println(temp);
        employeService.addDocDto(temp);
    }

    @GetMapping("/getDocuments")
    public List<documentDto> getDocuments() {
        return clientService.getDocsDto();
    }


    @PostMapping("/deleteDocument")
    public void deleteDocument(@RequestBody Map<String, Object> payLoad) {
        employeService.deleteDocDto(clientService.getDocById(Long.parseLong((String) payLoad.get("id"))));
    }
}
