/**
 * Modern Homepage Component
 * Features: Hero section, featured products, categories, banners, stats, newsletter
 */

import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import actions from "../../actions";
import banners from "./banners.json";
import CarouselSlider from "../../components/Common/CarouselSlider";
import { responsiveOneItemCarousel } from "../../components/Common/CarouselSlider/utils";

class Homepage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            subscribed: false,
        };
    }

    handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (this.state.email) {
            this.setState({ subscribed: true });
            setTimeout(() => {
                this.setState({ email: "", subscribed: false });
            }, 3000);
        }
    };

    // Mock featured products data
    getFeaturedProducts = () => {
        return [
            {
                id: 1,
                name: "Premium Wireless Headphones",
                price: 199.99,
                originalPrice: 299.99,
                rating: 4.8,
                reviews: 245,
                image: "/images/products/headphones.jpg",
                badge: "33% OFF",
            },
            {
                id: 2,
                name: "Ultra HD Smart Watch",
                price: 129.99,
                originalPrice: 179.99,
                rating: 4.6,
                reviews: 128,
                image: "/images/products/smartwatch.jpg",
                badge: "28% OFF",
            },
            {
                id: 3,
                name: "Pro Portable Camera",
                price: 449.99,
                originalPrice: 599.99,
                rating: 4.9,
                reviews: 367,
                image: "/images/products/camera.jpg",
                badge: "25% OFF",
            },
            {
                id: 4,
                name: "Wireless Charger Pad",
                price: 49.99,
                originalPrice: 79.99,
                rating: 4.5,
                reviews: 89,
                image: "/images/products/charger.jpg",
                badge: "37% OFF",
            },
        ];
    };

    getCategories = () => {
        return [
            {
                id: 1,
                name: "Electronics",
                image: "/images/banners/banner-2.jpg",
            },
            {
                id: 2,
                name: "Fashion",
                image: "/images/banners/banner-5.jpg",
            },
            {
                id: 3,
                name: "Home & Living",
                image: "/images/banners/banner-2.jpg",
            },
            {
                id: 4,
                name: "Sports",
                image: "/images/banners/banner-6.jpg",
            },
        ];
    };

    render() {
        const featuredProducts = this.getFeaturedProducts();
        const categories = this.getCategories();

        return (
            <div className="homepage">
                {/* Hero Section */}
                <section className="home-hero">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Discover Your Next Favorite Product</h1>
                            <p>
                                Shop from thousands of products with exclusive
                                deals, fast shipping, and premium quality.
                                Experience shopping like never before.
                            </p>
                            <div className="cta-buttons">
                                <Link to="/shop" className="btn btn-primary">
                                    Shop Now
                                </Link>
                                <a href="#featured" className="btn btn-outline">
                                    Explore More
                                </a>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img
                                src="/images/banners/banner-5.jpg"
                                alt="Shop Banner"
                            />
                        </div>
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="featured-section" id="featured">
                    <div className="section-header">
                        <h2>Featured Products</h2>
                        <p>
                            Check out our hand-picked selection of trending
                            products. Limited time offers available!
                        </p>
                    </div>
                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <div
                                    className="product-image"
                                    style={{
                                        backgroundImage: `url(${product.image})`,
                                    }}
                                >
                                    {product.badge && (
                                        <div className="product-badge">
                                            {product.badge}
                                        </div>
                                    )}
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <div className="price">
                                        <span className="current">
                                            ${product.price}
                                        </span>
                                        <span className="original">
                                            ${product.originalPrice}
                                        </span>
                                    </div>
                                    <div className="rating">
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        color:
                                                            i <
                                                            Math.floor(
                                                                product.rating,
                                                            )
                                                                ? "inherit"
                                                                : "rgba(244, 158, 11, 0.3)",
                                                    }}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className="reviews">
                                            ({product.reviews})
                                        </span>
                                    </div>
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="btn"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Categories Section */}
                <section className="categories-section">
                    <div className="section-header">
                        <h2>Browse by Category</h2>
                        <p>
                            Find exactly what you're looking for across our
                            diverse product categories
                        </p>
                    </div>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/shop?category=${category.id}`}
                                className="category-card"
                            >
                                <img src={category.image} alt={category.name} />
                                <div className="overlay">
                                    <h3>{category.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Banners/Promotional Section */}
                <section className="banners-section">
                    <div className="banners-grid">
                        {banners.slice(0, 3).map((banner, index) => (
                            <div key={index} className="banner-item">
                                <img
                                    src={banner.imageUrl}
                                    alt={`Banner ${index + 1}`}
                                />
                                <div className="banner-content">
                                    <h2>
                                        {banner.title ||
                                            `Special Offer ${index + 1}`}
                                    </h2>
                                    <p>
                                        {banner.subtitle ||
                                            "Limited time only!"}
                                    </p>
                                    <Link to="/shop" className="btn">
                                        Shop Collection
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section">
                    <div className="stat-box">
                        <div className="stat-number">500K+</div>
                        <div className="stat-label">Happy Customers</div>
                        <div className="stat-description">
                            Trusted by shoppers worldwide
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">2M+</div>
                        <div className="stat-label">Products</div>
                        <div className="stat-description">
                            Curated selection of quality items
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Support</div>
                        <div className="stat-description">
                            Always here to help you
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Secure</div>
                        <div className="stat-description">
                            Protected transactions
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="newsletter-section">
                    <div className="newsletter-content">
                        <h2>Stay Updated</h2>
                        <p>
                            Get exclusive deals, new arrivals, and special
                            offers delivered to your inbox.
                        </p>
                        <form
                            onSubmit={this.handleNewsletterSubmit}
                            className="input-group"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={this.state.email}
                                onChange={(e) =>
                                    this.setState({ email: e.target.value })
                                }
                                required
                            />
                            <button type="submit" className="btn">
                                Subscribe
                            </button>
                        </form>
                        {this.state.subscribed && (
                            <div
                                style={{
                                    color: "rgba(255,255,255,0.9)",
                                    fontSize: "14px",
                                }}
                            >
                                ✓ Thanks for subscribing!
                            </div>
                        )}
                        <p className="privacy-text">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </section>

                {/* Carousel Section (original) */}
                {/* Kept for backwards compatibility */}
                <Row className="flex-row" style={{ display: "none" }}>
                    <Col
                        xs="12"
                        lg="6"
                        className="order-lg-2 mb-3 px-3 px-md-2"
                    >
                        <div className="home-carousel">
                            <CarouselSlider
                                swipeable={true}
                                showDots={true}
                                infinite={true}
                                autoPlay={false}
                                slides={banners}
                                responsive={responsiveOneItemCarousel}
                            >
                                {banners.map((item, index) => (
                                    <img
                                        key={index}
                                        src={item.imageUrl}
                                        alt={`Banner ${index}`}
                                    />
                                ))}
                            </CarouselSlider>
                        </div>
                    </Col>
                    <Col
                        xs="12"
                        lg="3"
                        className="order-lg-1 mb-3 px-3 px-md-2"
                    >
                        <div className="d-flex flex-column h-100 justify-content-between">
                            <img
                                src="/images/banners/banner-2.jpg"
                                className="mb-3"
                                alt="Banner 1"
                            />
                            <img
                                src="/images/banners/banner-5.jpg"
                                alt="Banner 2"
                            />
                        </div>
                    </Col>
                    <Col
                        xs="12"
                        lg="3"
                        className="order-lg-3 mb-3 px-3 px-md-2"
                    >
                        <div className="d-flex flex-column h-100 justify-content-between">
                            <img
                                src="/images/banners/banner-2.jpg"
                                className="mb-3"
                                alt="Banner 3"
                            />
                            <img
                                src="/images/banners/banner-6.jpg"
                                alt="Banner 4"
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, actions)(Homepage);
