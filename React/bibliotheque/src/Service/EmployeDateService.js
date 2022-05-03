import axios from 'axios'

const API_URL = "http://localhost:8080/"

class EmployeDataService {

    getEmployeById(id){
        return axios.get(`${API_URL}` +id+`/employe/addBorrows`);
    }
    updateEmployeById(employe ,id){
        return axios.post(`${API_URL}` +id+`/employe/addBorrows`, employe);
    }



}

export default new EmployeDataService()