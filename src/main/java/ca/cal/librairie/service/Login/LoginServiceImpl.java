package ca.cal.librairie.service.Login;

import ca.cal.librairie.model.User.Admin;
import ca.cal.librairie.model.User.Client;
import ca.cal.librairie.model.User.Dto.AdminDto;
import ca.cal.librairie.model.User.Dto.ClientDto;
import ca.cal.librairie.model.User.Dto.EmployeDto;
import ca.cal.librairie.model.User.Employe;
import ca.cal.librairie.persistence.Users.AdminRepository;
import ca.cal.librairie.persistence.Users.ClientRepository;
import ca.cal.librairie.persistence.Users.EmployeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginServiceImpl implements LoginService {

    private final EmployeRepository employeRepository;
    private final ClientRepository clientDao;
    private final AdminRepository adminRepository;
    @Autowired
    private ModelMapper modelMapper;


    public LoginServiceImpl(EmployeRepository employeRepository, ClientRepository clientDao, AdminRepository adminRepository) {
        super();
        this.employeRepository = employeRepository;
        this.clientDao = clientDao;
        this.adminRepository = adminRepository;
    }


    public ClientDto CheckLoginClient(String username, String password){

        Optional<Client> LoginClient = employeRepository.CheckClientLogin(username, password) ;

        return LoginClient.map(client -> modelMapper.map(client, ClientDto.class)).orElse(null);
    }


    public EmployeDto CheckLoginEmploye(String username, String password){

        Optional<Employe> LoginEmploye = employeRepository.CheckEmployeLogin(username, password) ;

        return LoginEmploye.map(employe -> modelMapper.map(employe, EmployeDto.class)).orElse(null);
    }

    @Override
    public AdminDto CheckLoginAdmin(String username, String password) {
        Optional<Admin> LoginAdmin = adminRepository.CheckAdminLogin(username, password);
        return LoginAdmin.map(admin -> modelMapper.map(admin, AdminDto.class)).orElse(null);
    }
}
