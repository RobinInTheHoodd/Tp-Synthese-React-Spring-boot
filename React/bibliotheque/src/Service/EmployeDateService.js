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
    deleteClient(client, id){
        return axios.post(`${API_URL}` +id+`/employe/deleteClient`, client);
    }
    createClient(client, id){
        return axios.post(`${API_URL}` +id+`/employe/createClient`, client);
    }
    updateClient(client, id){
        return axios.post(`${API_URL}` +id+`/employe/editClient`, client);
    }
    getBorrowsDocByIdClient(idCLient, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employe/getBorrowsClient`, idCLient);
    }
    addBorrows(idEmploye, newBorrow){
        return axios.post(`${API_URL}` +idEmploye+`/employe/addBorrows`, newBorrow);
    }
    getBillsByIdClient(idCLient, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employe/getBillsClient`, idCLient);
    }
    addDocument(document, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employe/addDocument`, document);
    }
    getDocuments(idEmploye){
        return axios.get(`${API_URL}` +idEmploye+`/employe/getDocuments`);
    }
    deleteDocument(document, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employe/deleteDocument`, document);
    }
    




}

export default new EmployeDataService()