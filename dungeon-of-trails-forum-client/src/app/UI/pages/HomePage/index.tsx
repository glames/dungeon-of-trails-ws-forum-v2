import React, { Fragment, useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './Homepage.module.scss';

const HomePage = () => {
  useEffect(() => {
    const slickTrack = document.querySelector('.slick-track');
    if (slickTrack) {
      slickTrack.classList.add(styles.slicktrack);
    }
  }, []);
  const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000',
  };

  const divStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'center',
    height: '400px',
    backgroundColor: '#F8F8F8',
  };

  useEffect(() => {
    // Hàm xử lý thay đổi kích thước màn hình
    const handleResize = () => {
      console.log('Resized to: ', window.innerWidth, 'x', window.innerHeight);
    };

    // Thêm sự kiện lắng nghe cho sự kiện thay đổi kích thước màn hình
    window.addEventListener('resize', handleResize);

    // Hủy bỏ sự kiện lắng nghe khi component bị hủy bỏ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slideImages = [
    {
      url: 'https://as2.ftcdn.net/v2/jpg/04/42/21/53/1000_F_442215355_AjiR6ogucq3vPzjFAAEfwbPXYGqYVAap.jpg',
      caption: '',
    },
    {
      url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
      caption: '',
    },
  ];

  return (
    <Fragment>
      <h1 className={`text-center ${styles.welcome_text}`}>
        Welcome to Dungeon of Trails Forum
      </h1>
      <div className="text-center">
        <div className="slide-container" style={{ padding: '0 20px' }}>
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div key={index}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage.url})`,
                  }}
                >
                  {slideImage.caption ? (
                    <span style={spanStyle}>{slideImage.caption}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </Slide>
        </div>
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
        <a href="https://phu-s3.s3.ap-southeast-1.amazonaws.com/GameFiles/Dungeon_of_Trials_Game_Windows.zip">
          <img
            src="/assets/images/banner/windows-button-download.png"
            alt="Get On App Store"
          />
        </a>
        <a href="https://phu-s3.s3.ap-southeast-1.amazonaws.com/GameFiles/Dungeon_of_Trials_Game_Android.apk">
          <img
            src="/assets/images/banner/download-for-android.png"
            alt="Get On Google Play Store"
          />
        </a>
      </div>
    </Fragment>
  );
};

export default HomePage;
