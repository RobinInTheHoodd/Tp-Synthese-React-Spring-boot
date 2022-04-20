package ca.cal.librairie.model.User.Utils;

public class LoginUser {


    private String role;

    public LoginUser() {
        super();
        // TODO Auto-generated constructor stub
    }

    public LoginUser(String role) {
        this.role = role;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
