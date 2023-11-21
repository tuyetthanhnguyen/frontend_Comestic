import axios from '../axios';


const adminService = {

    login(loginBody) {
        return axios.post(`/admin/login`, loginBody)
    },
    
  

};

export default adminService;