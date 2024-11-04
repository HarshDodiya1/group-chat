import { config } from "@/config/config";

export const BASE_URL = config.backendUrl;
export const API_URL = `${BASE_URL}/api`;
export const LOGIN_URL = `${API_URL}/auth/login`;
