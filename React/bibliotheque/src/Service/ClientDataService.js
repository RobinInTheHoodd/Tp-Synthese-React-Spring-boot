import axios from 'axios'

const API_URL = "http://localhost:8080/"

class UserDataService {

    getBorrowDocsById(id) {
        return axios.get(`${API_URL}` +id+`/client/getBorrows`);
    }

}

export default new UserDataService()