package ca.cal.librairie;

import ca.cal.librairie.model.Document.Book;
import ca.cal.librairie.model.Document.CD;
import ca.cal.librairie.model.Document.Utils.BorrowDoc;
import ca.cal.librairie.model.User.Admin;
import ca.cal.librairie.model.User.Client;
import ca.cal.librairie.model.User.Employe;
import ca.cal.librairie.model.User.Utils.Address;
import ca.cal.librairie.persistence.Users.AdminRepository;
import ca.cal.librairie.persistence.Utils.AddressRepository;
import ca.cal.librairie.service.Client.ClientServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDate;
import java.util.HashSet;

@SpringBootApplication
@EnableScheduling
public class LibrairieApplication {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    public static void main(String[] args) {
        SpringApplication.run(LibrairieApplication.class, args);

    }


    @Bean
    public CommandLineRunner mappingDemo(AddressRepository addressRepository, ClientServiceImpl clientService, AdminRepository adminRepository) {
        return args -> {

            ModelMapper modelMapper = new ModelMapper();

            Client client1 = Client.builder()
                    .firstName("Robin")
                    .secondName("Mazouni")
                    .bitrhday(LocalDate.of(2000, 10, 8))
                    .phoneNumber("2211234")
                    .email("robin@gmail.com")
                    .password("password")
                    .address(null)
                    .borrowDocs(new HashSet<>())
                    .fine(10)
                    .build();

            Client client2 = Client.builder()
                    .firstName("Robin")
                    .secondName("Mazouni")
                    .bitrhday(LocalDate.of(2000, 10, 8))
                    .phoneNumber("2211234")
                    .email("rmzn@gmail.com")
                    .password("password")
                    .address(null)
                    //.borrowDocs(new HashSet<>())
                    .fine(0)
                    .build();

            Employe employe = Employe.builder()
                    .firstName("Robin")
                    .secondName("Mazouni")
                    .bitrhday(LocalDate.of(2000, 10, 8))
                    .phoneNumber("2211234")
                    .email("rmzn@gmail.com")
                    .password("password")
                    .address(null)
                    .build();

            Admin admin = Admin.builder()
                    .firstName("Robin")
                    .secondName("Mazouni")
                    .bitrhday(LocalDate.of(2000, 10, 8))
                    .phoneNumber("2211234")
                    .email("rmzn@gmail.com")
                    .password("password")
                    .address(null)
                    .build();

            Address address1 = Address.builder()
                    .houseNumber(34)
                    .streetAddress("Wellington street")
                    .city("JavaTown")
                    .state("Quebec")
                    .zipCode("H4G 1V6")
                    .build();

            Address address2 = Address.builder()
                    .houseNumber(34)
                    .streetAddress("Wellington street")
                    .city("JavaTown")
                    .state("Quebec")
                    .zipCode("H4G 1V6")
                    .build();

            Address address3 = Address.builder()
                    .houseNumber(34)
                    .streetAddress("Wellington street")
                    .city("JavaTown")
                    .state("Quebec")
                    .zipCode("H4G 1V6")
                    .build();

            Address address4 = Address.builder()
                    .houseNumber(34)
                    .streetAddress("Wellington street")
                    .city("JavaTown")
                    .state("Quebec")
                    .zipCode("H4G 1V6")
                    .build();



            Book book = Book.builder()
                    .title("Salut")
                    .author("Victor Hugo")
                    .editor("Papier")
                    .dateOfPublication(LocalDate.of(1990, 10, 4))
                    .numberPage(30)
                    .exemplary(3)
                    .genre("Aventure")
                    .build();

            Book book1 = Book.builder()
                    .title("Salut")
                    .author("Paul Cohen")
                    .editor("Rare")
                    .dateOfPublication(LocalDate.of(2010, 4, 20))
                    .numberPage(30)
                    .exemplary(3)
                    .genre("Action")
                    .build();

            CD cd = CD.builder()
                    .title("Storm")
                    .author("AC/CD")
                    .editor("Music")
                    .dateOfPublication(LocalDate.of(2000, 3, 10))
                    .exemplary(3).build();

            BorrowDoc borrowDoc = BorrowDoc.builder()
                    .dateBorrowing(LocalDate.of(2000, 10, 8))
                    .dateReturn(LocalDate.of(2000, 11, 9))
                    .client(client1)
                    .document(book1)
                    .build();

            clientService.addBook(book);
            clientService.addBook(book1);
            clientService.addCD(cd);

            client1.addBorrowBook(borrowDoc);
            borrowDoc.setClient(client1);

            client1.setAddress(address1);
            client2.setAddress(address2);

            employe.setAddress(address3);

            admin.setAddress(address4);
            adminRepository.save(admin);

            clientService.addEmployetest(employe);

            clientService.addClienttest(client1);
            clientService.addClienttest(client2);


        };
    }

}
