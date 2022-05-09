import axios from 'axios'

const API_URL = "http://localhost:8080/"

class UserDataService {

    getBorrowDocsById(id) {
        return axios.get(`${API_URL}` +id+`/clientReact/getBorrows`);
    }

    getBills(id){
        return axios.get(`${API_URL}` +id+`/clientReact/getBills`);
    }

    addBill(bill, id){
        return axios.post(`${API_URL}` +id+`/clientReact/addBills`, bill);
    }

    getDocuments(id){
        return axios.get(`${API_URL}` +id+`/clientReact/getDocsDto`);
    }

    editClient(client, id){
        return axios.post(`${API_URL}` +id+`/clientReact/editClient`, client);
    }
        
    searchDocument(search, id){
        return axios.post(`${API_URL}` +id+`/clientReact/searchDocs`, search);

    }

    returnBorrowDocs(borrowDocs, id){
        return axios.post(`${API_URL}` +id+`/clientReact/editBorrow`, borrowDocs);
    }

    addBorrowDocs(borrowDocs, id){
        return axios.post(`${API_URL}` +id+`/clientReact/addBorrows`, borrowDocs);
    }



}

export default new UserDataService()