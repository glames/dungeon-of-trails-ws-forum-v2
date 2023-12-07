import { Fragment, useState, useLayoutEffect, useEffect } from 'react';
import { Col } from 'reactstrap';
import { Sliders } from 'react-feather';
import { Link } from 'react-router-dom';

const LeftBar = (props: any) => {
  const id = window.location.pathname.split('/').pop();
  const defaultLayout = Object.keys({});
  const layout = id ? id : defaultLayout;
  const [bonusui, setBonusUI] = useState(false);
  const [levelMenu, setLevelMenu] = useState(false);
  const [sidebartoggle, setSidebartoggle] = useState(true);
  const width = useWindowSize();

  function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  useEffect(() => {
    const ignoreClick_On_Out_side_Element =
      document.getElementById('out_side_click');
    const ignoreClick_On_Main_Nav_Element =
      document.getElementById('sidebar-menu');
    document.addEventListener('click', function (event) {
      const isClickOutSideElement = ignoreClick_On_Out_side_Element?.contains(
        event.target as Node
      );
      const isClickMainNavElement = ignoreClick_On_Main_Nav_Element?.contains(
        event.target as Node
      );
      // if (
      //   window.innerWidth <= 991 &&
      //   !isClickOutSideElement &&
      //   !isClickMainNavElement &&
      //   document.getElementById('sidebar-wrapper')
      // ) {
      //   //Do something click is outside specified element
      //   (document.querySelector('.page-header') as HTMLElement)!.className =
      //     'page-header close_icon';
      //   (document.querySelector('.sidebar-wrapper') as HTMLElement)!.className =
      //     'sidebar-wrapper close_icon ';
      // }
    });
  }, [width]);

  const responsive_openCloseSidebar = (toggle: boolean) => {
    if (width <= 991) {
      setBonusUI(false);
      document.querySelector('.page-header')!.className = 'page-header';
      document.querySelector('.sidebar-wrapper')!.className =
        'sidebar-wrapper ';
    } else {
      if (toggle) {
        setSidebartoggle(!toggle);
        document.querySelector('.page-header')!.className =
          'page-header close_icon';
        document.querySelector('.sidebar-wrapper')!.className =
          'sidebar-wrapper close_icon ';
        document
          .querySelector('.mega-menu-container')
          ?.classList.remove('d-block');
      } else {
        setSidebartoggle(!toggle);
        document.querySelector('.page-header')!.className = 'page-header';
        document.querySelector('.sidebar-wrapper')!.className =
          'sidebar-wrapper ';
      }
    }
  };

  const OnLevelMenu = (menu: boolean) => {
    setBonusUI(false);
    (
      document.querySelector('.mega-menu-container') as HTMLDivElement | null
    )?.classList.remove('d-block');
    setLevelMenu(!menu);
  };

  return (
    <Fragment>
      <div className="header-logo-wrapper" id="out_side_click">
        <div className="logo-wrapper">
          <Link to={`/dashboard`}>
            <img
              className="img-fluid for-light"
              src={require('~/assets/images/logo/logo.png')}
              alt=""
            />
            <img
              className="img-fluid for-dark"
              src={require('~/assets/images/logo/logo_dark.png')}
              alt=""
            />
          </Link>
        </div>
        <div
          className="toggle-sidebar"
          onClick={() => responsive_openCloseSidebar(sidebartoggle)}
          style={
            window.innerWidth <= 991
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          <Sliders
            className="status_toggle middle sidebar-toggle"
            id="sidebar-toggle"
          />
        </div>
      </div>
      <Col className="left-header horizontal-wrapper pl-0">
        <div
          className="slick-slide"
          data-slick-index="0"
          aria-hidden="true"
        ></div>
      </Col>
    </Fragment>
  );
};

export default LeftBar;
