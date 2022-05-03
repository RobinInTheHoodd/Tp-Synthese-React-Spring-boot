import axios from 'axios'

const API_URL = "http://localhost:8080/"

class EmployeDataService {

    getEmployeById(id){
        return axios.get(`${API_URL}` +id+`/employe/addBorrows`);
    }
    updateEmployeById(employe ,id){
        return axios.post(`${API_URL}` +id+`/employe/addBorrows`, employe);
    }
    getClients(id){
        return axios.get(`${API_URL}` +id+`/employe/getClients`);
    }
    updateClient(client, id){
        return axios.post(`${API_URL}` +id+`/employe/editClient`, client);
    }
    getBorrowsDocByIdClient(idCLient, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employe/getBorrowsClient`, idCLient);
    }
    getBillsByIdClient(idCLient, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employe/getBillsClient`, idCLient);
    }
    




}

export default new EmployeDataService()