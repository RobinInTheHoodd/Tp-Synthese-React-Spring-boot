package ca.cal.librairie.controllerReact;


import ca.cal.librairie.model.Document.DocumentDto.Forms.BillForm;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.Document.DocumentDto.documentDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Utils.SearchBar;
import ca.cal.librairie.service.Client.ClientServiceImpl;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("{id}/clientReact")
public class ClientControllerReact {

    private final ClientServiceImpl clientService;
    Logger logger = LoggerFactory.getLogger(ClientControllerReact.class);
    @Autowired
    private ModelMapper modelMapper;

    public ClientControllerReact(ClientServiceImpl clientService) {
        super();
        this.clientService = clientService;
    }

    @GetMapping("/getBorrows")
    public List<BorrowDocDto> getBorrows(@PathVariable("id") Long id, @RequestParam(value = "error", required = false) Boolean error, Model model) {
        return  clientService.getBorrowsByClientId(id);
    }

    @GetMapping("/getBills")
    public List<BillDto> getBills(@PathVariable("id") Long id) {

        return  clientService.getBillsByClientId(id);
    }

    @PostMapping("/addBills")
    public void addBills(@PathVariable("id") Long id, @RequestBody Map<String, Object> payLoad) {

        BillForm billForm = new BillForm();

        String paid = String.valueOf(payLoad.get("paid"));
        String idClient = Long.toString(id);
        billForm.setIdClient(idClient);
        billForm.setPaid(paid);
        Long reslut = clientService.addBill(billForm);
    }


    @GetMapping("/getDocsDto")
    public List<documentDto> getDocsDtoReact() {
        try {

            return clientService.getDocsDto();
        }catch (Exception e){

            return null;
        }
    }

    @PostMapping("/editClient")
    public ClientDto editClient(@PathVariable("id") Long id, @RequestBody Map<String, Object> payLoad) throws IllegalAccessException {
        Long idClient = Long.parseLong( (String) payLoad.get("id"));
        if (!Objects.equals(id, idClient)){
            throw new IllegalAccessException();
        } else {
            ModelMapper mapper = new ModelMapper();
            ClientDto clientDto = mapper.map(payLoad, ClientDto.class);
            LocalDate dateReturn = LocalDate.parse((String) payLoad.get("bitrhday"));
            clientDto.setBitrhday(dateReturn);
            return clientService.updateClientDto(clientDto);

        }
    }

    @PostMapping("/searchDocs")
    public List<documentDto> searchDoc(@RequestBody Map<String, Object> payLoad) {

        List<documentDto> documentDtos;

        ModelMapper modelMapper = new ModelMapper();

        SearchBar result = modelMapper.map(payLoad, SearchBar.class);
        if (result.getType().equals("all")) {
            documentDtos = clientService.getDocsDtoByFilter(result);
        } else if (result.getType().equals("book")) {
            documentDtos = clientService.getBooksDtoByFilter(result);
        } else if (result.getType().equals("cd")) {
            documentDtos = clientService.getCDsDtoByFilter(result);
        } else {
            documentDtos = clientService.getDVDsDtoByFilter(result);
        }
        return documentDtos;
    }

    @PostMapping("/editBorrow")
    public void updateBorrowDocs(@RequestBody List<Map<String, Object>> payLoad) {

        ModelMapper mapper = new ModelMapper();
        payLoad.forEach( stringObjectMap -> {
            BorrowDocDto borrowDocDto = mapper.map(stringObjectMap, BorrowDocDto.class);
            LocalDate dateBorrowing = LocalDate.parse((String)stringObjectMap.get("dateBorrowing"));
            LocalDate dateReturn = LocalDate.parse((String)stringObjectMap.get("dateReturn"));
            borrowDocDto.setDateBorrowing(dateBorrowing);
            borrowDocDto.setDateReturn(dateReturn);


            clientService.updateBorrow(borrowDocDto);
        });
    }


    @PostMapping("/addBorrows")
    public void addBorrowDoc(@RequestBody List<Map<String, Object>> payLoad) {

        ModelMapper mapper = new ModelMapper();
        payLoad.forEach( borrowDoc -> {

            BorrowDocDto borrowDocDto = mapper.map(borrowDoc, BorrowDocDto.class);

            clientService.addBorrowDto(borrowDocDto);
        });
    }

}
