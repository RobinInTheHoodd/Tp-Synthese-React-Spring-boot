package ca.cal.librairie.service.Login;

import ca.cal.librairie.model.User.Dto.AdminDto;

interface LoginService {


    AdminDto CheckLoginAdmin(String username, String password);
}
