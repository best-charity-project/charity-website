import { server } from "../api";
import http from "./httpService";

export function getPeopleList() {
  return http.get(`${server}/api/edulist`, {
    headers: { "Content-Type": "application/json; charset=UTF-8" }
  });
}
