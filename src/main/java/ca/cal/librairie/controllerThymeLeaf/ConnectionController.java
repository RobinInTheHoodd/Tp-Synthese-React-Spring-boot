package ca.cal.librairie.controllerThymeLeaf;

import ca.cal.librairie.model.User.Dto.AdminDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Dto.EmployeDto;
import ca.cal.librairie.model.User.Utils.LoginUser;
import ca.cal.librairie.service.Login.LoginServiceImpl;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/")
public class ConnectionController {

    @Autowired
    private ModelMapper modelMapper;

    private final LoginServiceImpl loginService;
    Logger logger = LoggerFactory.getLogger(ClientController.class);

    public ConnectionController(LoginServiceImpl loginService) {
        super();
        this.loginService = loginService;
    }

    @GetMapping("/login")
    public String showLogin(){
        return "index.html";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute(name="loginForm") LoginUser login, Model model, RedirectAttributes redirectAttributes) {
        String uname;
        String pass;
        String role = login.getRole();


        if(role.equals("Employe")){
            /**
             EmployeDto employeDto = loginService.CheckLoginEmploye(uname, pass);
             if (employeDto == null){
             model.addAttribute("error", "Incorrect Username & Password");
             return "index";
             } else{
             System.out.println("depuis login form : "+employeDto);
             redirectAttributes.addFlashAttribute("userHeaderEmp", employeDto);
             model.addAttribute("userHeaderEmp", employeDto);
             return "redirect:" + employeDto.getId() + "/employe";
             }
             */
            uname = "rmzn@gmail.com";
            pass = "password";
            EmployeDto employeDto = loginService.CheckLoginEmploye(uname, pass);
            if (employeDto == null){
                model.addAttribute("error", "Incorrect Username & Password");
                return "index";
            } else{
                System.out.println("depuis login form : "+employeDto);
                redirectAttributes.addFlashAttribute("userHeaderEmp", employeDto);
                model.addAttribute("userHeaderEmp", employeDto);
                return "redirect:" + employeDto.getId() + "/employe";
            }


        } else if (role.equals("Client")){

            /**
             ClientDto clientDto = loginService.CheckLoginClient(uname, pass);
             if (clientDto == null){
             model.addAttribute("error", "Incorrect Username & Password");
             return "index";
             } else{
             System.out.println(clientDto);
             redirectAttributes.addFlashAttribute("userHeader", clientDto);
             model.addAttribute("userHeader", clientDto);
             return "redirect:" + clientDto.getId() + "/client";
             }
             */

            uname = "rmzn@gmail.com";
            pass = "password";
            ClientDto clientDto = loginService.CheckLoginClient(uname, pass);
            if (clientDto == null){
                model.addAttribute("error", "Incorrect Username & Password");
                return "index";
            } else{
                System.out.println(clientDto);
                redirectAttributes.addFlashAttribute("userHeader", clientDto);
                model.addAttribute("userHeader", clientDto);
                return "redirect:" + clientDto.getId() + "/client";
            }


        } else {
            /**
             AdminDto adminDto = loginService.CheckLoginAdmin(uname, pass);
             if (adminDto == null){
             model.addAttribute("error", "Incorrect Username & Password");
             return "index";
             } else{
             System.out.println(adminDto);
             redirectAttributes.addFlashAttribute("userHeaderAdmin", adminDto);
             model.addAttribute("userHeaderAdmin", adminDto);
             return "redirect:" + adminDto.getId() + "/admin";
             }
             */

            uname = "rmzn@gmail.com";
            pass = "password";
            AdminDto adminDto = loginService.CheckLoginAdmin(uname, pass);
            if (adminDto == null){
                model.addAttribute("error", "Incorrect Username & Password");
                return "index";
            } else{
                System.out.println(adminDto);
                redirectAttributes.addFlashAttribute("userHeaderAdmin", adminDto);
                model.addAttribute("userHeaderAdmin", adminDto);
                return "redirect:" + adminDto.getId() + "/admin";
            }
        }
    }
}
