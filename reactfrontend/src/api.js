import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/api" //우리가 통신하고 싶은 api서버

export default {
    getAllPost() {
        return axios.get('/posts/')
            //get의 기능은? ~갖다줘
    },
    createPost(data) {
        return axios.post('/posts/', data)
            //post의 기능은? ~처리해줘
    },
    deletePost(id) {
        return axios.delete('/posts/' + String(id))
    }
}