import axios from "axios";
import { API_URL } from "../constants";

const BASE_API_URL = API_URL || "/api/v1";
const buildUrl = (endpoint) => `${BASE_API_URL}/analytics/${endpoint}`;

const getSalesAnalytics = async (merchantId = null) => {
    const params = {};
    if (merchantId) params.merchantId = merchantId;
    const response = await axios.get(buildUrl("sales"), { params });
    return response.data;
};

const getUserAnalytics = async () => {
    const response = await axios.get(buildUrl("users"));
    return response.data;
};

const getRecommendations = async (userId = null, merchantId = null) => {
    const params = {};
    if (userId) params.userId = userId;
    if (merchantId) params.merchantId = merchantId;
    const response = await axios.get(buildUrl("recommendations"), { params });
    return response.data;
};

const getAnomalies = async () => {
    const response = await axios.get(buildUrl("anomalies"));
    return response.data;
};

export default {
    getSalesAnalytics,
    getUserAnalytics,
    getRecommendations,
    getAnomalies,
};
