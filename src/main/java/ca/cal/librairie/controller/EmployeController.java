package ca.cal.librairie.controller;


import ca.cal.librairie.model.Document.DocumentDto.Forms.BillForm;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BorrowForm;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.Document.DocumentDto.documentDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Dto.EmployeDto;
import ca.cal.librairie.model.User.Dto.UtilsDto.SearchBarDto;
import ca.cal.librairie.model.User.Utils.SearchBar;
import ca.cal.librairie.service.Client.ClientServiceImpl;
import ca.cal.librairie.service.Employe.EmployeServiceImpl;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;


@Controller
@RequestMapping("{id}/employe")
public class EmployeController {

    private final EmployeServiceImpl employeService;
    private final ClientServiceImpl clientService;
    Logger logger = LoggerFactory.getLogger(ClientController.class);

    public EmployeController(EmployeServiceImpl employeService, ClientServiceImpl clientService) {
        this.employeService = employeService;
        this.clientService = clientService;
    }

    @GetMapping()
    public String getEmployeById(@PathVariable(name = "id") Long id, Model model) {

        EmployeDto employeDto = employeService.getEmployeDtoById(id);

        model.addAttribute("error", new Error(""));
        model.addAttribute("userHeaderEmploye", employeService.getEmployeDtoById(id));
        return "EmployePage/Employe";
    }

    @GetMapping("/getClients")
    public String getClients(@PathVariable("id") Long id, Model model) {
        model.addAttribute("userHeaderEmploye", employeService.getEmployeDtoById(id));

        List<ClientDto> result = employeService.getClientsDto();
        model.addAttribute("error", new Error(""));
        model.addAttribute("clients", result);
        return "EmployePage/clientsByEmploye";

    }

    @GetMapping("/createClient")
    public String getClient(@PathVariable("id") Long id, Model model, @RequestParam(value = "error", required = false) Boolean error, @RequestParam(value = "idClient", required = false) final Long idClient) {
        model.addAttribute("userHeaderEmploye", employeService.getEmployeDtoById(id));

        List<ClientDto> result = new LinkedList<>();

        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        if (idClient == null) {
            model.addAttribute("createClient", new ClientDto());
            model.addAttribute("clients", result);
        } else {
            result.add(employeService.getClientDtoById(idClient));
            model.addAttribute("Clients", result);
        }

        model.addAttribute("deleteClient", new ClientDto());
        model.addAttribute("editClient", new ClientDto());
        return "EmployePage/CreateClient";
    }

    @PostMapping("client/createClient")
    public RedirectView addClient(@PathVariable("id") Long id, @ModelAttribute("createClient") ClientDto clientDto, RedirectAttributes redirectAttributes) {

        try {
            List<ClientDto> result = new ArrayList<>();
            result.add(employeService.addClientDto(clientDto));

            redirectAttributes.addFlashAttribute("clients", result);
            redirectAttributes.addFlashAttribute("createClient", result.get(0));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createClient?idClient=" + result.get(0).getId());
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createClient?error=true");
            return redirectView;
        }
    }

    @PostMapping("client/editClient")
    public RedirectView editClient(@ModelAttribute("editClient") ClientDto editclientDto, @ModelAttribute("createClient") ClientDto createClientDto, @PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        try {
            ClientDto clientDto = employeService.getClientDtoById(Long.parseLong(editclientDto.getId()));

            redirectAttributes.addFlashAttribute("createClient", clientDto);
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createClient?idClient=" + clientDto.getId());
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createClient?error=true");
            return redirectView;
        }
    }

    @PostMapping("client/deleteClient")
    public RedirectView deleteClient(@ModelAttribute("deleteClient") ClientDto clientDto, Model model, RedirectAttributes redirectAttributes) {
        try {
            employeService.deleteClientDtoById(Long.parseLong(clientDto.getId()));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createClient");
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createClient?error=true");
            return redirectView;
        }
    }

    @GetMapping("/getDocs")
    public String getDocuments(Model model, @PathVariable("id") Long id, @RequestParam(value = "error", required = false) Boolean error, @RequestParam(value = "idDoc", required = false) Long idDoc) {
        model.addAttribute("userHeaderEmploye", employeService.getEmployeDtoById(id));
        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        if (idDoc != null) {
            System.out.println(employeService.getDocsDtoById(idDoc));
            model.addAttribute("createDoc", employeService.getDocsDtoById(idDoc));
        } else model.addAttribute("createDoc", new documentDto());


        model.addAttribute("SearchBarDto", new SearchBarDto());
        model.addAttribute("removeDoc", new documentDto());
        model.addAttribute("updateDoc", new documentDto());
        return "EmployePage/Docs";

    }

    @PostMapping("employe/addDoc")
    public RedirectView addDocument(@PathVariable(name = "id") Long id, @ModelAttribute("createDoc") documentDto documentDto, RedirectAttributes redirectAttributes) {

        try {
            employeService.addDocDto(documentDto);

            List<documentDto> documentDtos = new LinkedList<>();
            documentDtos.add(documentDto);

            redirectAttributes.addFlashAttribute("docs", documentDtos);
            redirectAttributes.addFlashAttribute("createDoc", documentDto);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            if (documentDto.getId().equals("")) {
                redirectView.setUrl("../getDocs");
            } else redirectView.setUrl("../getDocs?idDoc=" + documentDto.getId());
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getDocs?error=true");
            return redirectView;
        }
    }

    @PostMapping("employe/searchDoc")
    public RedirectView editDocument(@PathVariable("id") Long id, @ModelAttribute("SearchBarDto") SearchBarDto searchBarDto, Model model, RedirectAttributes redirectAttributes) {

        try {
            List<documentDto> documentDtos;

            ModelMapper modelMapper = new ModelMapper();
            SearchBar result = modelMapper.map(searchBarDto, SearchBar.class);
            if (searchBarDto.getType().equals("all")) {
                documentDtos = clientService.getDocsDtoByFilter(result);
            } else if (result.getType().equals("book")) {
                documentDtos = clientService.getBooksDtoByFilter(result);
            } else if (result.getType().equals("cd")) {
                documentDtos = clientService.getCDsDtoByFilter(result);
            } else {
                documentDtos = clientService.getDVDsDtoByFilter(result);
            }

            redirectAttributes.addFlashAttribute("docs", documentDtos);
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getDocs");
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getDocs?error=true");
            return redirectView;
        }
    }

    @PostMapping("employe/removeDocs")
    public RedirectView deleteDocument(@PathVariable("id") Long id, @ModelAttribute("removeDoc") documentDto removeDoc, RedirectAttributes redirectAttributes) {
        try {
            System.out.println(removeDoc.getId());
            employeService.deleteDocDto(clientService.getDocById(Long.parseLong(removeDoc.getId())));

            List<documentDto> newDocumentDtos = new LinkedList<>();
            redirectAttributes.addFlashAttribute("docs", newDocumentDtos);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getDocs");
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getDocs?error=true");
            return redirectView;
        }
    }

    @PostMapping("employe/updateDoc")
    public RedirectView updateDocumentsBy(@PathVariable("id") Long id, @ModelAttribute("error") boolean error, @ModelAttribute("updateDoc") documentDto updateDoc, RedirectAttributes redirectAttributes) throws Exception {

        try {
            List<documentDto> documentDtos = new LinkedList<>();

            documentDto documentDto = employeService.getDocsDtoById(Long.parseLong(updateDoc.getId()));

            List<documentDto> newDocumentDtos = new LinkedList<>();
            redirectAttributes.addFlashAttribute("docs", newDocumentDtos);
            redirectAttributes.addFlashAttribute("createDoc", documentDto);
            redirectAttributes.addFlashAttribute("docs", documentDtos);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getDocs?idDoc=" + documentDto.getId());

            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getDocs?error=true");
            return redirectView;
        }
    }

    @GetMapping("/getBill")
    public String getBill(@PathVariable("id") Long id, @RequestParam(value = "error", required = false) Boolean error, @RequestParam(value = "idBill", required = false) Long idBill, Model model) {

        List<BillDto> result = employeService.getBillsDto();

        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        if (idBill == null) {
            model.addAttribute("updateBill", new BillDto());
        }

        model.addAttribute("Bills", result);
        model.addAttribute("deleteBill", new BillDto());
        model.addAttribute("editBill", new BillDto());
        model.addAttribute("addBill", new BillForm());
        model.addAttribute("userHeaderEmploye", employeService.getEmployeDtoById(id));
        return "EmployePage/Bills";
    }

    @PostMapping("employe/updateBill")
    public RedirectView updateBill(@PathVariable("id") Long id, @ModelAttribute("updateBill") BillDto updateBill, RedirectAttributes redirectAttributes) {
        try {
            BillDto billDto = employeService.updateBill(updateBill);

            System.out.println(billDto);
            redirectAttributes.addFlashAttribute("updateBill", billDto);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBill?idBill=" + billDto.getId());
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBill?error=true");
            return redirectView;
        }
    }

    @PostMapping("employe/editBill")
    public RedirectView billToUpdate(@PathVariable("id") Long id, @ModelAttribute("editBill") BillDto editBill, RedirectAttributes redirectAttributes) {

        try {
            BillDto updateBil = employeService.getBillById(Long.parseLong(editBill.getId()));

            redirectAttributes.addFlashAttribute("updateBill", updateBil);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBill?idBill=" + updateBil.getId());
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBill?error=true");
            return redirectView;
        }
    }

    @PostMapping("employe/addBill")
    public RedirectView addBill(@PathVariable("id") Long id, @ModelAttribute("addBill") BillForm billDto, RedirectAttributes redirectAttributes) {

        try {
            Long reslut = employeService.addBillDto(billDto);

            redirectAttributes.addFlashAttribute("updateBill", employeService.getBillById(reslut));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBill?idBill=" + reslut);
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBill?error=true");
            return redirectView;
        }
    }

    @GetMapping("/getBorrow")
    public String getBorrowForm(@PathVariable("id") Long id, @RequestParam(value = "error", required = false) Boolean error, @RequestParam(value = "idborrow", required = false) Long idborrow, Model model) {
        model.addAttribute("userHeaderEmploye", employeService.getEmployeDtoById(id));
        List<BorrowDocDto> result = employeService.getBorrowsDto();
        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        if (idborrow == null) {
            model.addAttribute("editBorrow", new BorrowDocDto());
        }

        model.addAttribute("updateBorrow", new BorrowForm());
        model.addAttribute("deleteBorrow", new BorrowForm());
        model.addAttribute("clientBorrows", result);
        model.addAttribute("addBorrow", new BorrowForm());
        return "EmployePage/Borrows";
    }

    @PostMapping("employe/addborrow")
    public RedirectView addBorrow(@PathVariable(name = "id") Long id, @ModelAttribute("addBorrow") BorrowForm borrowForm, RedirectAttributes redirectAttributes) {

        try {
            logger.info("Emprunt: " + borrowForm);
            List<BorrowDocDto> result = employeService.addBorrowDto(borrowForm);

            redirectAttributes.addFlashAttribute("editBorrow", result.get(0));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrow?idborrow=" + result.get(0).getId());

            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrow?error=true");
            return redirectView;
        }
    }

    @PostMapping("employe/updateBorrow")
    public RedirectView updateborrowid(@PathVariable(name = "id") Long id, @ModelAttribute("updateBorrow") BorrowForm updateBorrowForm, Model model, RedirectAttributes redirectAttributes, BindingResult errors) {

        try {
            logger.info("Emprunt: " + updateBorrowForm);
            BorrowDocDto result = employeService.getBorrowDtoById(updateBorrowForm.getBorrow());

            System.out.println(result);


            redirectAttributes.addFlashAttribute("editBorrow", employeService.getBorrowDtoById(updateBorrowForm.getBorrow()));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrow?idborrow=" + updateBorrowForm.getBorrow());
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrow?error=true");
            return redirectView;
        }
    }

    @PostMapping("employe/editBorrow")
    public RedirectView updateBorrow(@PathVariable(name = "id") Long id, @ModelAttribute("editBorrow") BorrowDocDto editBorrow, @ModelAttribute("updateBorrowDocDto") BorrowDocDto updateBorrowDocDto, RedirectAttributes redirectAttributes, BindingResult errors) {

        try {
            logger.info("Emprunt: " + editBorrow);

            Long result = employeService.updateBorrow(editBorrow);

            System.out.println(result);
            redirectAttributes.addFlashAttribute("editBorrow", employeService.getBorrowDtoById(result));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrow?idborrow=" + result);
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrow?error=true");
            return redirectView;
        }
    }

    @PostMapping("employe/deleteborrow")
    public RedirectView deleteBorrow(@PathVariable(name = "id") Long id, @ModelAttribute("deleteBorrow") BorrowForm borrowForm, @ModelAttribute("updateBorrowDocDto") BorrowDocDto updateBorrowDocDto, RedirectAttributes redirectAttributes, BindingResult errors) {
        try {
            logger.info("Emprunt: " + borrowForm);
            employeService.deleteBorrow(borrowForm.getBorrow());

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrow");
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrow?error=true");
            return redirectView;
        }
    }


    @Scheduled(fixedRate = 86400000)
    public void addFineByTimerDay() {
        employeService.getBorrowsAfterDelay();
    }


}
