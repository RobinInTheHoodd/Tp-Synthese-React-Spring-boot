package ca.cal.librairie.service.Admin;

import ca.cal.librairie.model.Document.Document;
import ca.cal.librairie.model.Document.DocumentDto.Forms.BillForm;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BillDto;
import ca.cal.librairie.model.Document.DocumentDto.UtilsDto.BorrowDocDto;
import ca.cal.librairie.model.User.Dto.AdminDto;
import ca.cal.librairie.model.User.Dto.EmployeDto;

import java.util.List;

public interface AdminService {
    AdminDto getAdminDtoById(Long id);

    List<EmployeDto> getEmployes();

    EmployeDto addEmployeDto(EmployeDto employeDto);

    void deleteEmployeDto(Long id);

    EmployeDto updateEmploye(EmployeDto employeDto);

    void deleteDocDto(Document removeDoc);

    List<BorrowDocDto> updateBorrow(BorrowDocDto borrowForm);

    List<BillDto> getBillDtoById(Long id);

    Long addBillDto(BillForm billDto);

    void deleteBillDto(BillDto billDto);

    List<BillDto> updateBillDto(BillDto billDto);






}
