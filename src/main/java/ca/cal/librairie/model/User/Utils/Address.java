package ca.cal.librairie.model.User.Utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int houseNumber;
    private  String streetAddress;
    private String city;
    private String state;
    private String zipCode;


/**
 *     public Address(int houseNumber, String streetAddress, String city, String state, String zipCode) {
 *         this.houseNumber = houseNumber;
 *         this.streetAddress = streetAddress;
 *         this.city = city;
 *         this.state = state;
 *         this.zipCode = zipCode;
 *     }
 */

}
