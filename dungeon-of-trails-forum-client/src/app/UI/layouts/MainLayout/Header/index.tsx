import { useState, useEffect, useCallback } from 'react';
import { Form, Row } from 'reactstrap';
import { X } from 'react-feather';
import { IMenu } from '~/app/models/menu.model';
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

  return (
    <div className="page-header">
      <Row className="header-wrapper m-0">
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
