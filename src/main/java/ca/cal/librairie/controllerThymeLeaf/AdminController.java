package ca.cal.librairie.controllerThymeLeaf;

import ca.cal.librairie.model.Document.DocumentDto.Forms.BillForm;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BorrowForm;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.Document.DocumentDto.documentDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Dto.EmployeDto;
import ca.cal.librairie.model.User.Dto.UtilsDto.SearchBarDto;
import ca.cal.librairie.model.User.Utils.SearchBar;
import ca.cal.librairie.service.Admin.AdminServiceImpl;
import ca.cal.librairie.service.Client.ClientServiceImpl;
import ca.cal.librairie.service.Employe.EmployeServiceImpl;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping("{id}/admin")
public class AdminController {

    private final EmployeServiceImpl employeService;
    private final ClientServiceImpl clientService;
    private final AdminServiceImpl adminService;
    Logger logger = LoggerFactory.getLogger(ClientController.class);

    public AdminController(EmployeServiceImpl employeService, ClientServiceImpl clientService, AdminServiceImpl adminService) {
        this.employeService = employeService;
        this.clientService = clientService;
        this.adminService = adminService;
    }

    @GetMapping("")
    public String getHome(@PathVariable("id") Long id, Model model) {

        model.addAttribute("error", new Error(""));
        model.addAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
        return "AdminPage/Home";
    }

    @GetMapping("/getClients")
    public String getClients(@PathVariable("id") Long id, Model model) {
        model.addAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
        try {
            List<ClientDto> result = employeService.getClientsDto();

            model.addAttribute("error", new Error(""));
            model.addAttribute("clients", result);
            return "AdminPage/Clients";
        } catch (Exception e) {
            model.addAttribute("error", new Error(e.getMessage()));
            return "AdminPage/Home";
        }
    }

    @GetMapping("/createClient")
    public String addClientDto(@PathVariable("id") Long id, Model model, @RequestParam(value = "error", required = false) Boolean error, @RequestParam(value = "idClient", required = false) final Long idClient) {

        List<ClientDto> result = new LinkedList<>();


        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        if (idClient == null) {
            model.addAttribute("createClient", new EmployeDto());
            model.addAttribute("clients", result);
        } else {
            result.add(employeService.getClientDtoById(idClient));
            model.addAttribute("Clients", result);
        }

        model.addAttribute("deleteClient", new EmployeDto());
        model.addAttribute("editClient", new EmployeDto());
        model.addAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
        return "AdminPage/CreateClient";
    }

    @PostMapping("admin/createClient")
    public RedirectView addClient(@PathVariable("id") Long id, @ModelAttribute("createClient") ClientDto clientDto, RedirectAttributes redirectAttributes) {

        try {
            List<ClientDto> result = new ArrayList<>();
            result.add(employeService.addClientDto(clientDto));

            redirectAttributes.addFlashAttribute("clients", result);
            redirectAttributes.addFlashAttribute("createClient", result.get(0));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/createClient?idClient=" + result.get(0).getId());
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/createClient?error=true");
            return redirectView;
        }
    }

    @PostMapping("admin/editClient")
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

    @PostMapping("admin/deleteClient")
    public RedirectView deleteClient(@ModelAttribute("deleteEmploye") EmployeDto employeDto, RedirectAttributes redirectAttributes) {

        try {
            employeService.deleteClientDtoById(Long.parseLong(employeDto.getId()));

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

    @GetMapping("/getEmployes")
    public String getEmployes(@PathVariable("id") Long id, Model model) {
        model.addAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
        try {
            model.addAttribute("error", new Error(""));
            List<EmployeDto> result = adminService.getEmployes();
            model.addAttribute("employes", result);
            return "AdminPage/Employes";

        } catch (Exception e) {
            model.addAttribute("error", new Error(e.getMessage()));
            return "AdminPage/Home";
        }
    }

    @GetMapping("/createEmploye")
    public String addEmployeDto(@PathVariable("id") Long id, Model model, @RequestParam(value = "error", required = false) Boolean error, @RequestParam(value = "idemploye", required = false) final Long idemploye) {

        List<EmployeDto> result = new LinkedList<>();

        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        if (idemploye == null) {
            model.addAttribute("employeDto", new EmployeDto());
            model.addAttribute("employes", result);
        } else {
            result.add(employeService.getEmployeDtoById(idemploye));
            model.addAttribute("employes", result);
        }

        model.addAttribute("deleteEmploye", new EmployeDto());
        model.addAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
        model.addAttribute("employeDtotoEdit", new EmployeDto());
        return "AdminPage/CreateEmploye";
    }

    @PostMapping("admin/createEmploye")
    public RedirectView addEmploye(@PathVariable("id") Long id, @ModelAttribute("employeDto") EmployeDto employeDto, Model model, RedirectAttributes redirectAttributes, BindingResult errors) {

        try {
            List<EmployeDto> result = new ArrayList<>();
            result.add(adminService.addEmployeDto(employeDto));

            redirectAttributes.addFlashAttribute("employes", result);
            redirectAttributes.addFlashAttribute("employeDto", result.get(0));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createEmploye?idemploye=" + result.get(0).getId());
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createEmploye?error=true");
            return redirectView;
        }
    }

    @PostMapping("admin/EmployeToEdit")
    public RedirectView editEmploye(@ModelAttribute("employeDtotoEdit") EmployeDto employeDto, @ModelAttribute("employeDto") ClientDto clientDto, Model model, @PathVariable("id") Long id, RedirectAttributes redirectAttributes) {

        try {
            System.out.println(employeDto.getId());
            EmployeDto employeDtoById = employeService.getEmployeDtoById(Long.parseLong(employeDto.getId()));

            redirectAttributes.addFlashAttribute("employeDto", employeDtoById);
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createEmploye?idemploye=" + employeDtoById.getId());
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createEmploye?error=true");
            return redirectView;
        }
    }

    @PostMapping("admin/deleteEmploye")
    public RedirectView deleteEmploye(@ModelAttribute("deleteEmploye") EmployeDto employeDto, RedirectAttributes redirectAttributes) {

        try {
            adminService.deleteEmployeDto(Long.parseLong(employeDto.getId()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createEmploye");
            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../createEmploye?error=true");
            return redirectView;
        }
    }

    @GetMapping("/getDocs")
    public String getAllDocuments(Model model, @PathVariable("id") Long id, @RequestParam(value = "error", required = false) Boolean error, @RequestParam(value = "idDoc", required = false) Long idDoc) {

        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        if (idDoc == null) {
            model.addAttribute("docDto", new documentDto());
        }

        model.addAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
        model.addAttribute("SearchBarDto", new SearchBarDto());
        model.addAttribute("removeDoc", new documentDto());
        model.addAttribute("updateDoc", new documentDto());
        return "AdminPage/Docs";
    }

    @PostMapping("admin/addDocs")
    public RedirectView getDocumentsBy(@PathVariable(name = "id") Long id, @ModelAttribute documentDto documentDto, Model model, RedirectAttributes redirectAttributes) {

        try {
            employeService.addDocDto(documentDto);

            List<documentDto> documentDtos = new LinkedList<>();
            documentDtos.add(documentDto);

            redirectAttributes.addFlashAttribute("docs", documentDtos);
            redirectAttributes.addFlashAttribute("userHeaderAdmin", employeService.getEmployeDtoById(id));
            redirectAttributes.addFlashAttribute("docs", documentDtos);
            redirectAttributes.addFlashAttribute("removeDoc", new documentDto());

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

    @PostMapping("admin/getDocs")
    public RedirectView getDocumentsBy(@PathVariable("id") Long id, @ModelAttribute SearchBarDto searchBarDto, Model model, RedirectAttributes redirectAttributes) {
        try {
            List<documentDto> documentDtos;

            logger.info("Recherche: " + searchBarDto);

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
            redirectAttributes.addFlashAttribute("userHeadeAdmin", employeService.getEmployeDtoById(id));
            redirectAttributes.addFlashAttribute("removeDoc", new documentDto());

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

    @PostMapping("admin/removeDocs")
    public RedirectView deleteDocumentsBy(@PathVariable("id") Long id, @ModelAttribute documentDto removeDoc, Model model, RedirectAttributes redirectAttributes) {

        try {
            List<documentDto> documentDtos = new LinkedList<>();

            logger.info("Recherche: " + removeDoc);

            adminService.deleteDocDto(clientService.getDocById(Long.parseLong(removeDoc.getId())));

            redirectAttributes.addFlashAttribute("docs", documentDtos);
            redirectAttributes.addFlashAttribute("userHeadeAdmin", employeService.getEmployeDtoById(id));
            redirectAttributes.addFlashAttribute("removeDoc", new documentDto());

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/getDocs");

            return redirectView;
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("../getDocs?error=true");
            return redirectView;
        }
    }

    @PostMapping("admin/updateDoc")
    public RedirectView updateDocumentsBy(@PathVariable("id") Long id, @ModelAttribute("updateDoc") documentDto updateDoc, Model model, RedirectAttributes redirectAttributes) {

        try {
            List<documentDto> documentDtos = new LinkedList<>();

            documentDto documentDto = employeService.getDocsDtoById(Long.parseLong(updateDoc.getId()));

            redirectAttributes.addFlashAttribute("docDto", documentDto);
            redirectAttributes.addFlashAttribute("docs", documentDtos);
            redirectAttributes.addFlashAttribute("userHeadeAdmin", employeService.getEmployeDtoById(id));
            redirectAttributes.addFlashAttribute("removeDoc", new documentDto());

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

    @GetMapping("/addborrow")
    public String getBorrowForm(@PathVariable("id") Long id, @RequestParam(value = "idborrow", required = false) Long idborrow, @RequestParam(value = "error", required = false) Error error, Model model) {

        List<BorrowDocDto> result = employeService.getBorrowsDto();

        if (idborrow == null) {
            model.addAttribute("updateBorrowDocDto", new BorrowDocDto());
        }
        if (error == null) {
            model.addAttribute("error", new Error(""));
        }

        model.addAttribute("updateBorrowForm", new BorrowForm());
        model.addAttribute("deleteBorrowForm", new BorrowForm());
        model.addAttribute("clientBorrows", result);
        model.addAttribute("BorrowDocDto", new BorrowForm());
        model.addAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
        return "AdminPage/Borrows";
    }

    @PostMapping("admin/addborrow")
    public RedirectView addBorrow(@PathVariable(name = "id") Long id, @ModelAttribute BorrowForm borrowForm, Model model, RedirectAttributes redirectAttributes, BindingResult errors) {
        try {

            logger.info("Emprunt: " + borrowForm);
            List<BorrowDocDto> result = employeService.addBorrowDto(borrowForm);

            redirectAttributes.addFlashAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
            redirectAttributes.addFlashAttribute("updateBorrowDocDto", result.get(0));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/addborrow?idborrow=" + result.get(0).getId());

            return redirectView;
        } catch (Exception e) {
            RedirectView redirectViewError = new RedirectView();
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            redirectViewError.setUrl("/" + id + "/admin/addborrow?error=true");
            return redirectViewError;
        }
    }

    @PostMapping("admin/borrowToUpdate")
    public RedirectView updateborrowid(@PathVariable(name = "id") Long id, @ModelAttribute("updateBorrowForm") BorrowForm updateBorrowForm, Model model, RedirectAttributes redirectAttributes, BindingResult errors) {

        try {
            logger.info("Emprunt: " + updateBorrowForm);
            BorrowDocDto result = employeService.getBorrowDtoById(updateBorrowForm.getBorrow());

            System.out.println(result);


            redirectAttributes.addFlashAttribute("updateBorrowDocDto", employeService.getBorrowDtoById(updateBorrowForm.getBorrow()));
            redirectAttributes.addFlashAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/addborrow?idborrow=" + updateBorrowForm.getBorrow());
            return redirectView;
        } catch (Exception e) {
            RedirectView redirectViewError = new RedirectView();
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            redirectViewError.setUrl("/" + id + "/admin/addborrow?error=true");
            return redirectViewError;
        }
    }

    @PostMapping("admin/updateborrow")
    public RedirectView updateBorrow(@PathVariable(name = "id") Long id, @ModelAttribute BorrowDocDto borrowForm, @ModelAttribute("updateBorrowDocDto") BorrowDocDto updateBorrowDocDto, RedirectAttributes redirectAttributes, BindingResult errors) {

        try {
            logger.info("Emprunt: " + borrowForm);
            List<BorrowDocDto> result = adminService.updateBorrow(updateBorrowDocDto);
            String idBorrow = employeService.getBorrowDtoById(Long.parseLong(borrowForm.getId())).getId();


            redirectAttributes.addFlashAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
            redirectAttributes.addFlashAttribute("updateBorrowDocDto", employeService.getBorrowDtoById(Long.parseLong(idBorrow)));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/addborrow?idborrow=" + idBorrow);
            return redirectView;
        } catch (Exception e) {
            RedirectView redirectViewError = new RedirectView();
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            redirectViewError.setUrl("/" + id + "/admin/addborrow?error=true");
            return redirectViewError;
        }
    }

    @PostMapping("admin/deleteborrow")
    public RedirectView deleteBorrow(@PathVariable(name = "id") Long id, @ModelAttribute("deleteBorrowForm") BorrowForm borrowForm, @ModelAttribute("updateBorrowDocDto") BorrowDocDto updateBorrowDocDto, RedirectAttributes redirectAttributes, BindingResult errors) {
        try {
            logger.info("Emprunt: " + borrowForm);

            employeService.deleteBorrow(borrowForm.getBorrow());
            redirectAttributes.addFlashAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/addborrow");
            return redirectView;
        } catch (Exception e) {
            RedirectView redirectViewError = new RedirectView();
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            redirectViewError.setUrl("/" + id + "/admin/addborrow?error=true");
            return redirectViewError;
        }
    }

    @GetMapping("/getBill")
    public String getBill(@PathVariable("id") Long id, @RequestParam(value = "idBill", required = false) Long idBill, @RequestParam(value = "error", required = false) Boolean error, Model model) {
        List<BillDto> result = employeService.getBillsDto();

        if (idBill == null) {
            model.addAttribute("updateBillDto", new BillDto());
        }
        if (error == null) {
            model.addAttribute("error", new Error(""));
        }
        model.addAttribute("Bills", result);
        model.addAttribute("deleteBillId", new BillDto());
        model.addAttribute("updateBillId", new BillDto());
        model.addAttribute("addBill", new BillForm());
        model.addAttribute("BorrowDocDto", new BorrowForm());
        model.addAttribute("userHeaderAdmin", adminService.getAdminDtoById(id));
        return "AdminPage/Bills";
    }

    @PostMapping("admin/updateBill")
    public RedirectView updateBill(@PathVariable("id") Long id, @ModelAttribute("updateBillDto") BillDto billDto, RedirectAttributes redirectAttributes) {

        try {
            List<BillDto> result = adminService.updateBillDto(billDto);

            redirectAttributes.addFlashAttribute("updateBillDto", result.get(0));

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/getBill?idBill=" + result.get(0).getId());
            return redirectView;
        } catch (Exception e) {
            RedirectView redirectViewError = new RedirectView();
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            redirectViewError.setUrl("/" + id + "/admin/getBill?error=true");
            return redirectViewError;
        }
    }

    @PostMapping("admin/updateBillId")
    public RedirectView billToUpdate(@PathVariable("id") Long id, @ModelAttribute("updateBillId") BillDto updateBillId, RedirectAttributes redirectAttributes) {
        try {
            BillDto billDto = adminService.getBillDtoById(Long.parseLong(updateBillId.getId())).get(0);

            redirectAttributes.addFlashAttribute("updateBillDto", billDto);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/getBill?idBill=" + updateBillId.getId());
            return redirectView;
        } catch (Exception e) {
            RedirectView redirectViewError = new RedirectView();
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            redirectViewError.setUrl("/" + id + "/admin/getBill?error=true");
            return redirectViewError;
        }
    }

    @PostMapping("admin/addBill")
    public RedirectView addBill(@PathVariable("id") Long id, @ModelAttribute("addBill") BillForm billDto, RedirectAttributes redirectAttributes) {
        try {
            System.out.println(billDto);
            Long reslut = employeService.addBillDto(billDto);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);

            redirectAttributes.addFlashAttribute("updateBillDto", adminService.getBillDtoById(reslut).get(0));
            redirectView.setUrl("/" + id + "/admin/getBill?idBill=" + reslut);
            return redirectView;
        } catch (Exception e) {

            RedirectView redirectViewError = new RedirectView();
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            redirectViewError.setUrl("/" + id + "/admin/getBill?error=true");
            return redirectViewError;
        }
    }

    @PostMapping("admin/deleteBill")
    public RedirectView deleteBill(@PathVariable("id") Long id, @ModelAttribute("deleteBillId") BillDto billDto, RedirectAttributes redirectAttributes) {

        try {
            adminService.deleteBillDto(billDto);

            RedirectView redirectView = new RedirectView();
            redirectView.setContextRelative(true);
            redirectView.setUrl("/" + id + "/admin/getBill");
            return redirectView;
        } catch (Exception e) {
            RedirectView redirectViewError = new RedirectView();
            redirectAttributes.addFlashAttribute("error", new Error(e.getMessage()));
            redirectViewError.setUrl("/" + id + "/admin/getBill?error=true");
            return redirectViewError;
        }
    }


}
