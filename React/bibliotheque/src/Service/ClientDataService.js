import axios from 'axios'

const API_URL = "http://localhost:8080/"

class UserDataService {

    getBorrowDocsById(id) {
        return axios.get(`${API_URL}` +id+`/client/getBorrows`);
    }

    getBills(id){
        return axios.get(`${API_URL}` +id+`/client/getBills`);
    }

    getDocuments(id){
        return axios.get(`${API_URL}` +id+`/client/getDocsDto`);
    }

    editClient(client, id){
        return axios.post(`${API_URL}` +id+`/client/editClient`, client);
    }



}

export default new UserDataService()