import axios from 'axios'

const API_URL = "http://localhost:8080/"

class EmployeDataService {

    
    getEmployes(id){
        return axios.get(`${API_URL}` +id+`/employeReact/employes`);
    }
    getEmployeById(id){
        return axios.get(`${API_URL}` +id+`/employeReact/employe`);
    }
    addEmploye(employe , id){
        return axios.post(`${API_URL}` +id+`/employeReact/newEmploye`, employe);
    }
    deleteEmploye(employe , id){
        return axios.post(`${API_URL}` +id+`/employeReact/deleteEmploye`, employe);
    }
    updateEmploye(employe , id){
        return axios.post(`${API_URL}` +id+`/employeReact/editEmploye`, employe);
    }
    getClients(id){
        return axios.get(`${API_URL}` +id+`/employeReact/getClients`);
    }
    deleteClient(client, id){
        return axios.post(`${API_URL}` +id+`/employeReact/deleteClient`, client);
    }
    createClient(client, id){
        return axios.post(`${API_URL}` +id+`/employeReact/createClient`, client);
    }
    updateClient(client, id){
        return axios.post(`${API_URL}` +id+`/employeReact/editClient`, client);
    }
    getBorrowsDocByIdClient(idCLient, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employeReact/getBorrowsClientId`, idCLient);
    }
    getBorrowsDoc(idEmploye){
        return axios.get(`${API_URL}` +idEmploye+`/employeReact/getBorrowsClient`);
    }
    addBorrows(idEmploye, newBorrow){
        return axios.post(`${API_URL}` +idEmploye+`/employeReact/addBorrows`, newBorrow);
    }
    editBorrows(idEmploye, editBorrow){
        return axios.post(`${API_URL}` +idEmploye+`/employeReact/editBorrow`, editBorrow);
    }
    deleteBorrow(idEmploye, borrow){
        return axios.post(`${API_URL}` +idEmploye+`/employeReact/deleteBorrow`, borrow);
    }
    getBillsByIdClient(idCLient, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employeReact/getBillsClient`, idCLient);
    }
    getBills(idEmploye){
        return axios.get(`${API_URL}` +idEmploye+`/employeReact/getBills`);
    }
    editBills(idEmploye, bill){
        return axios.post(`${API_URL}` +idEmploye+`/employeReact/editBills`, bill);
    }
    deleteBill(idEmploye, bill){
        return axios.post(`${API_URL}` +idEmploye+`/employeReact/deleteBill`, bill);
    }
    addDocument(document, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employeReact/addDocument`, document);
    }
    getDocuments(idEmploye){
        return axios.get(`${API_URL}` +idEmploye+`/employeReact/getDocuments`);
    }
    deleteDocument(document, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employeReact/deleteDocument`, document);
    }
    




}

export default new EmployeDataService()