import IPubRepo from "@/domain/repositories/IPubRepo";
import axios from "axios";

function getDecryptedToken() {
  const encryptedToken = Cookies.get("authToken");
  const bytes = CryptoJS.AES.decrypt(encryptedToken, "cookie-encrypted");
  const token = bytes.toString(CryptoJS.enc.Utf8);
  return token;
}

class PubRepo extends IPubRepo {
  constructor() {
    super();
    this.url = "http://localhost:3000/api/";
  }

  async getAll() {
    try {
      const response = await axios.get(`${this.url}pubs/getAll`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  async create(pub) {
    try {
      const formData = new FormData();
      formData.append("id_user", pub.id_user);
      formData.append("title", pub.title);
      formData.append("content", pub.content);
      formData.append("image", pub.image);

      const response = await axios.post(`${this.url}pubs/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  async getUser(_id) {
    try {
      const response = await axios.get(`${this.url}user/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  async getOne(_id) {
    try {
      const response = await axios.get(`${this.url}pubs/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.url}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  async update(id ,pub) {
    try {
      const formData = new FormData();
      formData.append("id_user", pub.id_user);
      formData.append("title", pub.title);
      formData.append("content", pub.content);
      formData.append("image", pub.image);

      const response = await axios.put(`${this.url}pubs/put/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  async createComment(data){
    try {
      const res = await axios.post(`${this.url}pubs/comment`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      return res.data;
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
}

export default PubRepo;
