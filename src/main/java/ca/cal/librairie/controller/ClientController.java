package ca.cal.librairie.controller;

import ca.cal.librairie.model.Document.DocumentDto.Forms.BillForm;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BorrowForm;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.Document.DocumentDto.documentDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Dto.UtilsDto.SearchBarDto;
import ca.cal.librairie.model.User.Utils.SearchBar;
import ca.cal.librairie.service.Client.ClientServiceImpl;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@Controller
@RequestMapping("{id}/client")
public class ClientController {

    private final ClientServiceImpl clientService;
    Logger logger = LoggerFactory.getLogger(ClientController.class);
    @Autowired
    private ModelMapper modelMapper;

    public ClientController(ClientServiceImpl clientService) {
        super();
        this.clientService = clientService;
    }

    @GetMapping()
    public String getClientById(@PathVariable(name = "id") Long id, Model model) {
        ClientDto client = clientService.getClientDtoById(id);
        model.addAttribute("error", new Error(""));
        model.addAttribute("client", client);
        model.addAttribute("userHeaderClient", client);
        return "ClientPage/client";
    }

    @GetMapping("/getBorrows")
    public String getBorrows(@PathVariable("id") Long id, @RequestParam(value = "error", required = false) Boolean error, Model model) {
        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        List<BorrowDocDto> result = clientService.getBorrowsByClientId(id);
        model.addAttribute("clientBorrows", result);
        model.addAttribute("addBorrow", new BorrowForm());
        model.addAttribute("userHeaderClient", clientService.getClientDtoById(id));
        return "ClientPage/Borrows";
    }

    @PostMapping("client/addBorrow")
    public RedirectView addBorrow(@PathVariable(name = "id") Long id, @ModelAttribute("addBorrow") BorrowForm borrowForm, RedirectAttributes redirectAttributes) {

        try {
            borrowForm.setClient(id);
            logger.info("Emprunt: " + borrowForm);
            List<BorrowDocDto> result = clientService.addBorrowDto(borrowForm);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrows");

            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBorrows?error=true");

            return redirectView;
        }
    }


    @GetMapping("/getDocs")
    public String getDocuments(Model model, @PathVariable("id") Long id, @RequestParam(value = "error", required = false) Boolean error) {
        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        model.addAttribute("userHeaderClient", clientService.getClientDtoById(id));
        model.addAttribute("SearchBarDto", new SearchBarDto());
        return "ClientPage/Docs";
    }

    @PostMapping("client/searchDoc")
    public RedirectView editDocument(@ModelAttribute("SearchBarDto") SearchBarDto searchBarDto, RedirectAttributes redirectAttributes) {

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
    }

    @GetMapping("/getBills")
    public String getBill(@PathVariable("id") Long id, @RequestParam(value = "error", required = false) Boolean error, Model model) {
        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        List<BillDto> result = clientService.getBillsByClientId(id);
        model.addAttribute("client", clientService.getClientDtoById(id));
        model.addAttribute("Bills", result);
        model.addAttribute("addBill", new BillForm());
        model.addAttribute("userHeaderClient", clientService.getClientDtoById(id));
        return "ClientPage/Bills";
    }

    @PostMapping("client/addBill")
    public RedirectView addBill(@PathVariable("id") Long id, @ModelAttribute("addBill") BillForm billForm, RedirectAttributes redirectAttributes) {
        try {

            billForm.setIdClient(id.toString());
            Long reslut = clientService.addBill(billForm);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBills");
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getBills?error=true");
            return redirectView;
        }
    }


}
