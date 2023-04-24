import {Http} from "../utils/http"
import config from "../config/config.json"

const base = config.language_model_api_host
const http = Http(base);
export const generateTexts = async ({token = "", options = {}}) =>
    http.get({token: token, url: "/textgen", params: options});
export const generateNextWords = async ({token = "", options = {}}) =>
    http.get({token: token, url: "/nextwords", params: options});
export const generateNextWordPairs = async ({token = "", options = {}}) =>
    http.get({token: token, url: "/wordpairs", params: options});
