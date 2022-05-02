import axios from 'axios'

const Employe_API_URL = "http://localhost:8080/6/employe"
const Client_API_URL = "http://localhost:8080/8/client"
const Admin_API_URL = "http://localhost:8080/4/admin"
const API_URL = "http://localhost:8080/"


class UserDataService {

    getClients() {
        return axios.get(`${Employe_API_URL}/getClients`);
    }
    getClientsById(id) {
        return axios.get(`${API_URL}`+id+`/client`);
    }

    getEmployes() {
        return axios.get(`${Admin_API_URL}/getEmployes`)
    }

    getAdmins(){
        return axios.get(`${Admin_API_URL}/getAdmins`)
    }



}

export default new UserDataService()