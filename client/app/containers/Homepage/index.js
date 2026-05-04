/**
 *
 * Homepage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';

import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';

class Homepage extends React.PureComponent {
  handleShopNow = () => {
    this.props.history.push('/shop');
  }

  render() {
    return (
      <div className='homepage'>
        {/* Main Hero Section */}
        <section className='hero-section'>
          <div className='hero-container'>
            <div className='hero-content'>
              <h1>Discover Amazing Deals</h1>
              <p>Shop the latest products with exclusive discounts and offers available only for you today</p>
              <div className='cta-buttons'>
                <button className='btn-primary' onClick={this.handleShopNow}>Shop Now</button>
              </div>
            </div>
            <div className='hero-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={item._id || index} src={item.imageUrl} alt={item.title} />
                ))}
              </CarouselSlider>
            </div>
          </div>
        </section>

        {/* Side Banners Section */}
        <section className='side-banners-section'>
          <div className='banners-wrapper'>
            <Row className='g-3'>
              <Col xs='12' md='6' lg='4' className='mb-3'>
                <div className='side-banner'>
                  <img src='/images/banners/banner-5.jpg' alt='Banner 5' />
                  <div className='banner-overlay'>
                    <span>Exclusive Offer</span>
                  </div>
                </div>
              </Col>
              <Col xs='12' md='6' lg='4' className='mb-3'>
                <div className='side-banner'>
                  <img src='/images/banners/banner-7.jpg' alt='Banner 7' />
                  <div className='banner-overlay'>
                    <span>Limited Time</span>
                  </div>
                </div>
              </Col>
              <Col xs='12' md='6' lg='4' className='mb-3'>
                <div className='side-banner'>
                  <img src='/images/banners/banner-6.jpg' alt='Banner 6' />
                  <div className='banner-overlay'>
                    <span>New Arrivals</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Homepage);
