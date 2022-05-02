import axios from 'axios'

const API_URL = "http://localhost:8080/"

class UserDataService {

    getBorrowDocsById(id) {
        return axios.get(`${API_URL}` +id+`/client/getBorrows`);
    }

    getBills(id){
        return axios.get(`${API_URL}` +id+`/client/getBills`);
    }

    addBill(bill, id){
        return axios.post(`${API_URL}` +id+`/client/addBills`, bill);
    }

    getDocuments(id){
        return axios.get(`${API_URL}` +id+`/client/getDocsDto`);
    }

    editClient(client, id){
        return axios.post(`${API_URL}` +id+`/client/editClient`, client);
    }
        
    searchDocument(search, id){
        return axios.post(`${API_URL}` +id+`/client/searchDocs`, search);

    }

    returnBorrowDocs(borrowDocs, id){
        return axios.post(`${API_URL}` +id+`/client/editBorrow`, borrowDocs);
    }

    addBorrowDocs(borrowDocs, id){
        return axios.post(`${API_URL}` +id+`/client/addBorrows`, borrowDocs);
    }



}

export default new UserDataService()