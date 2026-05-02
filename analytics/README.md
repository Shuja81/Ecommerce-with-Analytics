# E-Commerce Analytics Modules

Python analytics modules for your MERN e-commerce project that connect directly to MongoDB.

## 📋 Overview

These modules analyze your MongoDB data without using JSON files:

1. **sales_analysis.py** - Revenue, top products, daily sales
2. **user_behavior.py** - User activity, conversion rates, retention
3. **recommendation.py** - Product recommendations, trending items
4. **anomaly_detection.py** - Unusual orders, suspicious patterns

## 🚀 Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Update MongoDB Connection

All modules connect to MongoDB at `mongodb://localhost:27017` by default.

Edit the connection parameters in each script if needed:

```python
analyzer = SalesAnalyzer(
    mongo_uri="mongodb://your_host:port",
    db_name="your_database"
)
```

### 3. Ensure MongoDB is Running

```bash
# MongoDB should be running on localhost:27017
# Or specify your MongoDB URI when initializing the analyzer
```

## 📊 Usage

### Run Sales Analysis

```bash
python sales_analysis.py
```

**Output:**
- Total revenue and order count
- Top 10 selling products
- Daily sales (last 7 days)
- Orders by status breakdown

### Run User Behavior Analysis

```bash
python user_behavior.py
```

**Output:**
- Top 15 most viewed products
- Conversion rate (views → purchases)
- Activity breakdown by action type
- Top 10 most active users
- 30-day user retention rate

### Run Recommendation Engine

```bash
python recommendation.py
```

**Output:**
- Top 10 most viewed products
- Trending products (last 7 days)
- Category-based recommendations
- Frequently bought together
- Personalized recommendations (optional)

### Run Anomaly Detection

```bash
python anomaly_detection.py
```

**Output:**
- Order statistics baseline
- Unusually large orders
- Bulk orders (20+ items)
- Suspicious user activity
- High cancellation users

## 🔧 Using as Modules

Import and use in your own scripts:

```python
from sales_analysis import SalesAnalyzer
from user_behavior import UserBehaviorAnalyzer
from recommendation import RecommendationEngine
from anomaly_detection import AnomalyDetector

# Sales Analysis
analyzer = SalesAnalyzer()
revenue = analyzer.get_total_revenue()
top_products = analyzer.get_top_selling_products(10)

# User Behavior
behavior = UserBehaviorAnalyzer()
conversion = behavior.get_conversion_rate()
retention = behavior.get_user_retention(30)

# Recommendations
engine = RecommendationEngine()
trending = engine.get_trending_products(7, 10)
recommendations = engine.get_recommendations_for_user(user_id="123")

# Anomalies
detector = AnomalyDetector()
unusual_orders = detector.detect_unusual_order_amounts()
suspicious_users = detector.detect_suspicious_user_activity()
```

## 📈 Expected MongoDB Collections

Ensure your database has these collections:

- **orders** - Order documents with products array
- **userActivity** - User interaction logs
- **products** - Product catalog
- **users** - User profiles

## 🔄 MongoDB Schema Assumptions

The modules assume this general structure. **Adjust field names if different:**

### Orders
```
{
  _id: ObjectId,
  userId: "user_id",
  products: [
    { productId: "product_id", name: "...", quantity: 5, price: 29.99 }
  ],
  totalPrice: 149.95,
  status: "delivered|completed|pending|cancelled",
  createdAt: Date
}
```

### User Activity
```
{
  _id: ObjectId,
  userId: "user_id",
  productId: "product_id",
  productName: "...",
  action: "view|click|add_to_cart|purchase",
  createdAt: Date
}
```

### Products
```
{
  _id: "product_id",
  name: "Product Name",
  price: 29.99,
  category: "Electronics",
  stock: 100
}
```

## ⚙️ Customization

### Change MongoDB Fields

If your schema uses different field names, edit the pipeline queries in each module.

**Example:** If your order status field is `orderStatus` instead of `status`:

```python
"$match": {
    "orderStatus": {"$in": ["delivered", "completed"]}
}
```

### Adjust Thresholds

Modify detection thresholds:

```python
# In anomaly_detection.py
detector.detect_unusual_order_amounts(std_dev_threshold=2)  # More sensitive
detector.detect_suspicious_user_activity(action_threshold=100)  # Higher threshold
```

### Time Windows

Change analysis periods:

```python
# Last 30 days instead of 7
sales.get_daily_sales_summary(days=30)
engine.get_trending_products(days=14)
```

## 📝 Output Formats

All reports output:
- **Console Reports** - Formatted tables with metrics
- **Pandas DataFrames** - For further analysis
- **Summary Dictionaries** - Programmatic access

## ✅ Testing

Verify connection to MongoDB:

```python
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client.ecommerce
print(db.list_collection_names())
```

## 📌 Common Issues

### MongoClient Connection Error
- Ensure MongoDB is running
- Check URI is correct
- Verify network connectivity

### Empty DataFrames
- Verify collection names match your database
- Check field names in aggregation pipelines
- Ensure data exists in collections

### Wrong Results
- Adjust field names to match your schema
- Verify date formats in MongoDB
- Check status values used in your application

## 🚀 Next Steps

1. **Schedule Reports** - Use `cron` or `APScheduler` to run scripts periodically
2. **Export to CSV** - Save results: `df.to_csv('report.csv')`
3. **Web Dashboard** - Display results in Streamlit or Flask
4. **Email Alerts** - Send anomaly reports via email
5. **API Endpoint** - Expose analytics via Node.js API

## 📚 Dependencies

- **pandas** - Data analysis and manipulation
- **pymongo** - MongoDB driver for Python

## 📄 License

Same as your MERN project
