import { useState, useEffect, useMemo } from "react";
import analyticsAPI from "../utils/analyticsAPI";

/**
 * Custom hook for fetching analytics data
 * Handles loading and error states
 */
export const useAnalytics = (type = "sales", query = {}, enabled = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const queryString = useMemo(() => JSON.stringify(query), [query]);

    useEffect(() => {
        if (!enabled) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                let response;
                switch (type) {
                    case "sales":
                        response = await analyticsAPI.getSalesAnalytics(
                            query.merchantId,
                        );
                        break;
                    case "users":
                        response = await analyticsAPI.getUserAnalytics();
                        break;
                    case "recommendations":
                        response = await analyticsAPI.getRecommendations(
                            query.userId,
                            query.merchantId,
                        );
                        break;
                    case "anomalies":
                        response = await analyticsAPI.getAnomalies();
                        break;
                    default:
                        throw new Error(`Unknown analytics type: ${type}`);
                }

                if (response.success) {
                    setData(response.data);
                } else {
                    setError(response.error || "Failed to fetch analytics");
                }
            } catch (err) {
                setError(err.message || "Error fetching analytics");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [enabled, type, queryString]);

    return { data, loading, error };
};

export default useAnalytics;
