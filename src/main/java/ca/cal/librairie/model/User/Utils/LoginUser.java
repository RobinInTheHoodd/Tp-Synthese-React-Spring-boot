package ca.cal.librairie.model.User.Utils;

public class LoginUser {


    private String role;
    private String username;
    private String password;


    public LoginUser() {
        super();
        // TODO Auto-generated constructor stub
    }

    public LoginUser(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
