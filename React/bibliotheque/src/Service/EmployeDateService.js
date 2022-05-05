import axios from 'axios'

const API_URL = "http://localhost:8080/"

class EmployeDataService {

    getEmployeById(id){
        return axios.get(`${API_URL}` +id+`/employe/getEmploye`);
    }
    updateEmployeById(employe ,id){
        return axios.post(`${API_URL}` +id+`/employe/editEmploye`, employe);
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
        return axios.post(`${API_URL}` +idEmploye+`/employe/getBorrowsClientId`, idCLient);
    }
    getBorrowsDoc(idEmploye){
        return axios.get(`${API_URL}` +idEmploye+`/employe/getBorrowsClient`);
    }
    addBorrows(idEmploye, newBorrow){
        return axios.post(`${API_URL}` +idEmploye+`/employe/addBorrows`, newBorrow);
    }
    editBorrows(idEmploye, editBorrow){
        return axios.post(`${API_URL}` +idEmploye+`/employe/editBorrow`, editBorrow);
    }
    deleteBorrow(idEmploye, borrow){
        return axios.post(`${API_URL}` +idEmploye+`/employe/deleteBorrow`, borrow);
    }
    getBillsByIdClient(idCLient, idEmploye){
        return axios.post(`${API_URL}` +idEmploye+`/employe/getBillsClient`, idCLient);
    }
    getBills(idEmploye){
        return axios.get(`${API_URL}` +idEmploye+`/employe/getBills`);
    }
    editBills(idEmploye, bill){
        return axios.post(`${API_URL}` +idEmploye+`/employe/editBills`, bill);
    }
    deleteBill(idEmploye, bill){
        return axios.post(`${API_URL}` +idEmploye+`/employe/deleteBill`, bill);
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