import axios from 'axios'

const Employe_API_URL = "http://localhost:8080/6/employeReact"


class UserDataService {

    getClients() {
        return axios.get(`${Employe_API_URL}/getClients`);
    }
    getEmployes() {
        return axios.get(`${Employe_API_URL}/employes`)
    }
}

export default new UserDataService()