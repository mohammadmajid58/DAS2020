import Axios from "axios";
import API_URL from "./index";

export function getCookie(cname: string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const isLoggedIn = () => {
  return Axios.get(`${API_URL}/auth/user/`).then(response => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};
