// React Integration Examples
// Use these patterns in your React dashboard/admin components

/**
 * Example 1: Custom Hook for Analytics
 * Use in any React component
 */

import { useState, useEffect } from "react";

export const useAnalytics = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/v1/analytics/${endpoint}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    setData(result.data);
                } else {
                    setError(result.message || "Failed to fetch analytics");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};

/**
 * Example 2: Sales Analytics Component
 */

function SalesAnalyticsDashboard() {
    const { data, loading, error } = useAnalytics("sales");

    if (loading) return <div>Loading sales data...</div>;
    if (error) return <div>Error: {error}</div>;

    const { total_revenue, top_products, daily_sales, sales_by_status } = data;

    return (
        <div className="sales-dashboard">
            <h1>Sales Analytics</h1>

            {/* Total Revenue Card */}
            <div className="card">
                <h2>Total Revenue</h2>
                <p className="amount">
                    ${total_revenue.total_revenue.toLocaleString()}
                </p>
                <p className="subtitle">{total_revenue.total_orders} orders</p>
            </div>

            {/* Top Products Table */}
            <div className="card">
                <h2>Top 10 Selling Products</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Revenue</th>
                            <th>Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top_products.map((product) => (
                            <tr key={product["Product ID"]}>
                                <td>{product["Product Name"]}</td>
                                <td>{product["Quantity Sold"]}</td>
                                <td>
                                    ${product["Total Revenue"].toLocaleString()}
                                </td>
                                <td>{product["Order Count"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Daily Sales Chart */}
            <div className="card">
                <h2>Daily Sales (Last 7 Days)</h2>
                <LineChart data={daily_sales} />
            </div>

            {/* Sales by Status */}
            <div className="card">
                <h2>Orders by Status</h2>
                {sales_by_status.map((status) => (
                    <div key={status.Status} className="status-row">
                        <span>{status.Status}</span>
                        <span>{status["Order Count"]} orders</span>
                        <span>${status["Total Revenue"].toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Example 3: User Behavior Component
 */

function UserBehaviorDashboard() {
    const { data, loading, error } = useAnalytics("users");

    if (loading) return <div>Loading user data...</div>;
    if (error) return <div>Error: {error}</div>;

    const {
        conversion_rate,
        most_viewed_products,
        activity_breakdown,
        retention,
    } = data;

    return (
        <div className="user-dashboard">
            <h1>User Behavior Analytics</h1>

            {/* Conversion Rate Card */}
            <div className="card highlight">
                <h2>Conversion Rate</h2>
                <div className="conversion-metric">
                    <div className="stat">
                        <label>Products Viewed</label>
                        <p>{conversion_rate.products_viewed}</p>
                    </div>
                    <div className="stat">
                        <label>Products Purchased</label>
                        <p>{conversion_rate.products_purchased}</p>
                    </div>
                    <div className="stat highlight">
                        <label>Conversion Rate</label>
                        <p className="percentage">
                            {conversion_rate.conversion_rate_percent}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Most Viewed Products */}
            <div className="card">
                <h2>Top 15 Most Viewed Products</h2>
                <div className="products-list">
                    {most_viewed_products.map((product) => (
                        <div
                            key={product["Product ID"]}
                            className="product-item"
                        >
                            <strong>{product["Product Name"]}</strong>
                            <span>{product["View Count"]} views</span>
                            <span className="viewers">
                                {product["Unique Viewers"]} unique viewers
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Activity Breakdown */}
            <div className="card">
                <h2>User Activity Breakdown</h2>
                {activity_breakdown.map((activity) => (
                    <div key={activity.Action} className="activity-row">
                        <span className="action">{activity.Action}</span>
                        <span className="count">{activity["Total Count"]}</span>
                        <span className="users">
                            {activity["Unique Users"]} users
                        </span>
                    </div>
                ))}
            </div>

            {/* User Retention */}
            <div className="card">
                <h2>User Retention (30 Days)</h2>
                <div className="retention-metric">
                    <div className="stat">
                        <label>Total Users</label>
                        <p>{retention.total_users}</p>
                    </div>
                    <div className="stat">
                        <label>Returning Users</label>
                        <p>{retention.returning_users}</p>
                    </div>
                    <div className="stat highlight">
                        <label>Retention Rate</label>
                        <p className="percentage">
                            {retention.retention_rate_percent}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Example 4: Recommendations Component
 */

function RecommendationsPanel() {
    const { data, loading, error } = useAnalytics("recommendations");

    if (loading) return <div>Loading recommendations...</div>;
    if (error) return <div>Error: {error}</div>;

    const { trending_products, most_viewed_products } = data;

    return (
        <div className="recommendations-panel">
            <h1>Product Recommendations</h1>

            <div className="section">
                <h2>🔥 Trending Now</h2>
                <div className="product-grid">
                    {trending_products.map((product) => (
                        <ProductCard key={product.ID} product={product} />
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>👁️ Most Viewed</h2>
                <div className="product-grid">
                    {most_viewed_products.map((product) => (
                        <ProductCard key={product.ID} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * Example 5: Anomaly Detection Component
 */

function AnomalyDetectionPanel() {
    const { data, loading, error } = useAnalytics("anomalies");

    if (loading) return <div>Loading anomaly detection...</div>;
    if (error) return <div>Error: {error}</div>;

    const {
        order_statistics,
        unusual_orders,
        bulk_orders,
        suspicious_activity,
        high_cancellation_users,
    } = data;

    return (
        <div className="anomaly-panel">
            <h1>Anomaly Detection</h1>

            {/* Statistics */}
            <div className="card stats">
                <h2>Order Statistics</h2>
                <div className="stats-grid">
                    <div className="stat">
                        <label>Average Order</label>
                        <p>${order_statistics.avg_order_value.toFixed(2)}</p>
                    </div>
                    <div className="stat">
                        <label>Min Order</label>
                        <p>${order_statistics.min_order_value.toFixed(2)}</p>
                    </div>
                    <div className="stat">
                        <label>Max Order</label>
                        <p>
                            ${order_statistics.max_order_value.toLocaleString()}
                        </p>
                    </div>
                    <div className="stat">
                        <label>Total Orders</label>
                        <p>{order_statistics.total_orders}</p>
                    </div>
                </div>
            </div>

            {/* Unusual Orders */}
            {unusual_orders.length > 0 && (
                <div className="card warning">
                    <h2>⚠️ Unusual Orders ({unusual_orders.length})</h2>
                    <div className="anomaly-list">
                        {unusual_orders.map((order) => (
                            <AnomalyRow key={order["Order ID"]} data={order} />
                        ))}
                    </div>
                </div>
            )}

            {/* Suspicious Activity */}
            {suspicious_activity.length > 0 && (
                <div className="card danger">
                    <h2>
                        🚨 Suspicious Activity ({suspicious_activity.length})
                    </h2>
                    <div className="anomaly-list">
                        {suspicious_activity.map((activity) => (
                            <AnomalyRow
                                key={activity["User ID"]}
                                data={activity}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* High Cancellation Users */}
            {high_cancellation_users.length > 0 && (
                <div className="card danger">
                    <h2>
                        ⛔ High Cancellation Users (
                        {high_cancellation_users.length})
                    </h2>
                    <div className="anomaly-list">
                        {high_cancellation_users.map((user) => (
                            <AnomalyRow key={user["User ID"]} data={user} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * Helper Components
 */

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <h3>{product.Name}</h3>
            <p className="category">{product.Category}</p>
            <p className="price">{product.Price}</p>
            <p className="stock">Stock: {product.Stock}</p>
        </div>
    );
}

function AnomalyRow({ data }) {
    return (
        <div className="anomaly-row">
            <div className="info">
                {Object.entries(data).map(([key, value]) => (
                    <span key={key}>
                        {key}: {JSON.stringify(value)}
                    </span>
                ))}
            </div>
        </div>
    );
}

export {
    SalesAnalyticsDashboard,
    UserBehaviorDashboard,
    RecommendationsPanel,
    AnomalyDetectionPanel,
};
