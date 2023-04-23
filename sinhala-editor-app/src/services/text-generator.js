import {Http} from "../utils/http"

const base = "http://127.0.0.1:8000"
const http = Http(base);
export const generateTexts = async ({token = "", options = {}}) =>
    http.get({token: token, url: "/textgen", params: options});
export const generateNextWords = async ({token = "", options = {}}) =>
    http.get({token: token, url: "/nextwords", params: options});
export const generateNextWordPairs = async ({token = "", options = {}}) =>
    http.get({token: token, url: "/wordpairs", params: options});
