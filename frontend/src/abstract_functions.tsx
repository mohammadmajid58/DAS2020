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

export const getDate = () => {
  var d = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  let minutes = d.getMinutes().toString();
  let hours = d.getHours().toString();

  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  if (hours.length === 1) {
    hours = `0${hours}`;
  }

  return `${d.getDate()} ${
    months[d.getMonth()]
  } ${d.getFullYear()} - ${hours}:${minutes}`;
};

export const getUsername = () => {
  return Axios.get(`${API_URL}/auth/user/`).then(r => {
    let username = "";
    if (r.data.first_name.length === 0) {
      username = r.data.username;
    } else {
      username = r.data.first_name;
      if (r.data.last_name.length !== 0) {
        username = username + " " + r.data.last_name;
      }
    }
    return username;
  });
};

export const isLoggedIn = () => {
  return Axios.get(`${API_URL}/auth/user/`).then(response => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export const convertAlphanumTo22pt = (alphanum: string) => {
  const alphaNumGrades = [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "B1",
    "B2",
    "B3",
    "C1",
    "C2",
    "C3",
    "D1",
    "D2",
    "D3",
    "E1",
    "E2",
    "E3",
    "F1",
    "F2",
    "F3",
    "G1",
    "G2",
    "H"
  ];
  const gradesToHighlight = ["MV", "CW", "CR", "NA"];

  const pointScale = 22;

  if (gradesToHighlight.includes(alphanum)) {
    return "NA";
  }
  return (pointScale - alphaNumGrades.indexOf(alphanum)).toString();
};
