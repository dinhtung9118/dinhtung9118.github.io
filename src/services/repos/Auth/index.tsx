import {http} from "../../Clients";
import {IResAuthLogin} from "./index.d";
import ApiConfig from 'config';
import {Account} from "../../../models/account";

class RepoAuth {
  async login(email: string, password: string){
    console.log('api',ApiConfig.API.AUTH_SERVICE);
    const {data: {data}} = await http.post<IResAuthLogin>(ApiConfig.API.AUTH_SERVICE, {
      email,
      password,
    });
    return {
      token: data!.access_token,
      account: new Account(data!.userInfo),
    }
  }
}

export const auth = new RepoAuth();
