import { useState, useEffect, useCallback } from 'react';
import { Form, Row } from 'reactstrap';
import { X } from 'react-feather';
import { IMenu } from '~/app/models/menu.model';
import styles from './index.module.scss';
import LeftBar from './LeftBar';
import Rightbar from './RightBar';
import { MENUITEMS } from '../Sidebar/menu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [searchValue, setsearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(false);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setsearchValue('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);
  const nav = useNavigate();
  const handleSearchKeyword = (keyword: string) => {
    setsearchValue(keyword);
  };
  const searchSubmit = () => {
    nav('/Search/' + searchValue);
  };

  const checkSearchResultEmpty = (items: any) => {
    if (!items.length) {
      setSearchResultEmpty(true);
      document.querySelector('.empty-menu')?.classList.add('is-open');
    } else {
      setSearchResultEmpty(false);
      document.querySelector('.empty-menu')?.classList.remove('is-open');
    }
  };

  const addFix = () => {
    setSearchResult(true);
    document.querySelector('.Typeahead-menu')?.classList.add('is-open');
    document.body.className = ` offcanvas`;
  };

  const removeFix = () => {
    setSearchResult(false);
    setsearchValue('');
    document.querySelector('.Typeahead-menu')?.classList.remove('is-open');
    document.body.className = ``;
  };
  const openCloseSidebar = () => {
    //Do something click is outside specified element
    const pageHeader = document.querySelector('.page-header');
    const sidebarWrapper = document.querySelector('.sidebar-wrapper');

    // Kiểm tra xem có classes 'close_icon' hay không trước khi loại bỏ
    if (pageHeader && pageHeader.classList.contains('close_icon')) {
      pageHeader.classList.remove('close_icon');
    } else if (pageHeader) {
      pageHeader.classList.add('close_icon');
    }
    if (
      sidebarWrapper?.classList.contains('close_icon') &&
      !sidebarWrapper.classList.contains('close_icon_mobile')
    ) {
      sidebarWrapper.classList.add('close_icon_mobile');
      sidebarWrapper.classList.add('mobile');
    } else {
      if (
        sidebarWrapper &&
        sidebarWrapper.classList.contains('close_icon_mobile')
      ) {
        sidebarWrapper.classList.remove('close_icon_mobile');
        sidebarWrapper.classList.remove('close_icon');
        const computedStyle = window.getComputedStyle(
          sidebarWrapper as HTMLElement
        );
        if (computedStyle.display === 'none') {
          (sidebarWrapper as HTMLElement).style.display = 'block';
        }
      } else if (sidebarWrapper) {
        sidebarWrapper.classList.add('close_icon_mobile');
        sidebarWrapper.classList.add('close_icon');
        sidebarWrapper.classList.add('mobile');
      }
    }
  };

  const sidebarWrapper = document.querySelector('.sidebar-wrapper');

  if (sidebarWrapper) {
    sidebarWrapper.classList.add('close_icon_mobile');
  }

  return (
    <div className="page-header">
      <Row className="header-wrapper m-0">
        <div
          className={styles.headerHambuger}
          style={{
            position: 'absolute',
            top: '20px',
            left: '10px',
            zIndex: 9999,
          }}
          onClick={() => openCloseSidebar()}
        >
          <img
            src="/assets/images/hamburger.png"
            alt="Menu icon"
            style={{ width: '40px' }}
          />
        </div>
        <Form className="form-inline search-full" action="#" method="get">
          <div className="form-group w-100">
            <div className="Typeahead Typeahead--twitterUsers">
              <div className="u-posRelative">
                <input
                  className="Typeahead-input form-control-plaintext w-100"
                  id="demo-input"
                  type="search"
                  placeholder="Search .."
                  defaultValue={searchValue}
                  onChange={(e) => handleSearchKeyword(e.target.value)}
                  onKeyPress={(e) => {
                    if (
                      e.key === 'Enter' &&
                      searchValue.trim() !== '' &&
                      searchValue !== null
                    ) {
                      e.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter (tránh refresh trang)
                      searchSubmit(); // Gọi hàm searchSubmit với giá trị của searchValue
                    }
                  }}
                />
                <div className="spinner-border Typeahead-spinner" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <X
                  className="close-search"
                  onClick={() =>
                    document
                      .querySelector('.search-full')
                      ?.classList.remove('open')
                  }
                />
              </div>
              <div
                className="Typeahead-menu custom-scrollbar"
                id="search-outer"
              >
                {/* {searchValue ?
                      searchValue.map((data, index) => {
                          return (
                              <div className="ProfileCard u-cf" key={index}>
                                  <div className="ProfileCard-avatar">
                                      <data.icon />
                                  </div>
                                  <div className="ProfileCard-details">
                                      <div className="ProfileCard-realName">
                                          <Link
                                              to={data.path}
                                              className="realname"
                                              onClick={removeFix}
                                          >
                                              {data.title}
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          )
                      }) : ''
                  } */}
              </div>
              <div className="Typeahead-menu empty-menu">
                <div className="tt-dataset tt-dataset-0">
                  <div className="EmptyMessage">
                    {'Opps!! There are no result found.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <LeftBar />
        <Rightbar />
      </Row>
    </div>
  );
};

export default Header;
