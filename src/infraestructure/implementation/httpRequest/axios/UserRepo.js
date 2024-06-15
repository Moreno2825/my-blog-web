import IUserRepo from "@/domain/repositories/IUserRepo";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { setUser } from "@/actions/userActions";

function getDecryptedToken() {
  const encryptedToken = Cookies.get("authToken");
  const bytes = CryptoJS.AES.decrypt(encryptedToken, "cookie-encrypted");
  const token = bytes.toString(CryptoJS.enc.Utf8);
  return token;
}

class UserRepo extends IUserRepo {
  constructor(dispatch) {
    super();
    this.dispatch = dispatch;
    this.url = "http://localhost:3000/api/";
  }

  async getAll() {
    try {
      const token = getDecryptedToken();
      const response = await axios.get(this.url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
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
      const token = getDecryptedToken();

      const response = await axios.get(`${this.url}/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }
  async signIn(user) {
    try {
      const response = await axios.post(`${this.url}signin`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  }

  async signUp(user) {
    try {
      const response = await axios.post(this.urlSignUp, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error signUp:", error.message);
    }
  }

  async delete(id) {
    try {
      const encryptedToken = Cookies.get("authToken");
      const bytes = CryptoJS.AES.decrypt(encryptedToken, "cookie-encrypted");
      const token = bytes.toString(CryptoJS.enc.Utf8);

      const response = await axios.delete(`${this.url}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  async update(user) {
    try {
      const token = getDecryptedToken();

      const response = await axios.put(`${this.url}/${user._id}`, user, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error;
    }
  }
}

export default UserRepo;
