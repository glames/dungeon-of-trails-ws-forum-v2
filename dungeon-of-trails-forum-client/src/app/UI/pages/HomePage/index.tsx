import React, { Fragment, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import Slider from 'react-slick';
import styles from './Homepage.module.scss';

const HomePage = () => {
  useEffect(() => {
    const slickTrack = document.querySelector('.slick-track');
    if (slickTrack) {
      slickTrack.classList.add(styles.slicktrack);
    }
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <Fragment>
      <h1 className={`text-center ${styles.welcome_text}`}>
        Welcome to Dungeon of Trails Forum
      </h1>
      <div className="text-center">
        <Slider {...settings}>
          <div>
            <img
              src="https://as2.ftcdn.net/v2/jpg/04/42/21/53/1000_F_442215355_AjiR6ogucq3vPzjFAAEfwbPXYGqYVAap.jpg"
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              src="https://as2.ftcdn.net/v2/jpg/04/42/21/53/1000_F_442215355_AjiR6ogucq3vPzjFAAEfwbPXYGqYVAap.jpg"
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              src="https://as2.ftcdn.net/v2/jpg/04/42/21/53/1000_F_442215355_AjiR6ogucq3vPzjFAAEfwbPXYGqYVAap.jpg"
              alt="Slide 3"
            />
          </div>
        </Slider>
      </div>
      <div className={`text-center ${styles.intro_text}`}>
        <p>
          Chào mừng đến với trang chủ của tựa game XYZ! Đây là nơi bạn có thể
          khám phá thế giới hư cấu tuyệt vời và tham gia vào những cuộc phiêu
          lưu đầy thách thức.
        </p>
        <p>
          Hãy chuẩn bị để bước vào một hành trình không thể quên, với đồ họa
          tuyệt đẹp, cốt truyện hấp dẫn và hệ thống gameplay đa dạng.
        </p>
      </div>

      <h2 className="text-center">
        <strong>Available On</strong>
      </h2>
      <div className={styles.availableOn}>
        <img src="/assets/images/banner/geton-as.png" alt="Get On App Store" />
        <img
          src="/assets/images/banner/geton-gp.png"
          alt="Get On Google Play Store"
        />
      </div>
    </Fragment>
  );
};

export default HomePage;
