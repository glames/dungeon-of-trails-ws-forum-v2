import { Fragment, useState, useEffect, FunctionComponent } from 'react';
import { ArrowRight, ArrowLeft, AlignRight } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';

import { MENUITEMS } from './menu';
import { IMenu, IMenuList } from '~/app/models/menu.model';
import { useSelector } from 'react-redux';
import { RootState } from '~/app/redux-tk/store';
import { selectCurrentUser } from '~/app/redux-tk/slices/auth.slice';
import {
  getUserAvatarURL,
  getUserId,
  getUserName,
} from '~/app/utils/local-storage';

const Sidebar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const accessToken = currentUser.accessToken;
  const refreshToken = currentUser.refreshToken;

  const avatarPath =
    currentUser?.accessToken != null
      ? `/assets/images/avtar/${currentUser.accessToken}.jpg`
      : '~/assets/images/avtar/default.jpg';
  const defaultAvatar = require('~/assets/images/avtar/default.jpg');

  const id = window.location.pathname.split('/').pop();
  const layout = id ? id : 1;
  const [mainmenu, setMainMenu] = useState<IMenuList[]>(MENUITEMS);
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const nav = useNavigate();
  // const wrapper = useSelector(content => (content as any).Customizer.sidebar_types.type);
  const handleScroll = () => {
    if (window.scrollY > 400) {
      // (document.querySelector(".sidebar-main") as HTMLElement)!.className = "sidebar-main hovered"
    } else {
      // if(document.getElementById("sidebar-main"))
      // (document.querySelector(".sidebar-main") as HTMLElement)!.className = "sidebar-main"
    }
  };
  useEffect(() => {
    document.querySelector('.left-arrow')?.classList.add('d-none');
    window.addEventListener('resize', handleResize);
    handleResize();
    const currentUrl = window.location.pathname;
    console.log(currentUrl);
    MENUITEMS.map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems: any) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };

    // eslint-disable-next-line
  }, [layout]);

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  };

  const setNavActive = (item: IMenu) => {
    MENUITEMS.forEach((menuItems) => {
      menuItems.Items.forEach((Items) => {
        if (Items !== item) {
          Items.active = false;
        }
        if (Items.path === item.path) {
          Items.active = true;
          menuItems.Items.forEach((subItems) => {
            if (subItems !== Items) {
              subItems.active = false;
            }
            if (subItems.children) {
              subItems.children.forEach((subSubItems: IMenu) => {
                if (subSubItems.path === item.path) {
                  subItems.active = true;
                  subSubItems.active = true;
                  Items.active = true;
                }
              });
            }
          });
        }
      });
    });
    setMainMenu([...MENUITEMS]);
  };

  const toggletNavActive = (item: IMenu) => {
    MENUITEMS.forEach((a) => {
      a.Items.forEach((Items) => {
        if (Items === item) {
          Items.active = !Items.active;
        } else {
          Items.active = false;
        }
        if (Items.children) {
          Items.children.forEach((b: IMenu) => {
            if (b === item) {
              b.active = !b.active;
              Items.active = b.active;
            } else {
              b.active = false;
            }
            if (b.children) {
              b.children.forEach((c: IMenu) => {
                if (c === item) {
                  c.active = !c.active;
                  b.active = c.active;
                  Items.active = c.active;
                } else {
                  c.active = false;
                }
              });
            }
          });
        }
      });
    });
    setMainMenu([...MENUITEMS]);
  };

  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570);
      } else {
        setMargin(-3464);
      }
      // (document.querySelector(".right-arrow") as HTMLElement)?.classList.add("d-none");
      // (document.querySelector(".left-arrow") as HTMLElement)?.classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += -width));
      // (document.querySelector(".left-arrow") as HTMLElement)?.classList.remove("d-none");
    }
  };

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0);
      // (document.querySelector(".left-arrow") as HTMLElement)?.classList.add("d-none");
      // (document.querySelector(".right-arrow") as HTMLElement)?.classList.remove("d-none")
    } else {
      setMargin((margin) => (margin += width));
      // (document.querySelector(".right-arrow") as HTMLElement)?.classList.remove("d-none")
    }
  };

  const closeOverlay = () => {
    // (document.querySelector(".bg-overlay1") as HTMLElement)?.classList.remove("active");
    // (document.querySelector(".sidebar-link") as HTMLElement)?.classList.remove("active")
  };

  const activeClass = () => {
    // (document.querySelector(".sidebar-link") as HTMLElement)?.classList.add("active");
    // (document.querySelector(".bg-overlay1") as HTMLElement)?.classList.add("active")
  };

  const openCloseSidebar = (toggle: boolean) => {
    if (toggle) {
      setSidebartoogle(!toggle);
      document.querySelector('.page-header')!.className =
        'page-header close_icon';
      document.querySelector('.sidebar-wrapper')!.className =
        'sidebar-wrapper close_icon ';
    } else {
      setSidebartoogle(!toggle);
      document.querySelector('.page-header')!.className = 'page-header';
      document.querySelector('.sidebar-wrapper')!.className =
        'sidebar-wrapper ';
    }
  };

  const responsiveSidebar = () => {
    document.querySelector('.page-header')!.className =
      'page-header close_icon';
    document.querySelector('.sidebar-wrapper')!.className =
      'sidebar-wrapper close_icon';
  };

  return (
    <Fragment>
      <div
        className={`bg-overlay1`}
        onClick={() => {
          closeOverlay();
        }}
      ></div>
      <div className="sidebar-wrapper" id="sidebar-wrapper">
        <div className="logo-wrapper">
          <div className="userinfo-cont">
            <div
              onClick={() => {
                nav('/Users/' + getUserId());
              }}
            >
              <img
                className="img-fluid for-light"
                src={getUserAvatarURL()}
                alt=""
              />
            </div>
            <div
              onClick={() => {
                nav('/Users/' + getUserId());
              }}
              className="username-sb"
            >
              {getUserName()}
            </div>
          </div>
          <div className="back-btn" onClick={() => responsiveSidebar()}>
            <i className="fa fa-angle-left"></i>
          </div>
          <div
            className="toggle-sidebar"
            onClick={() => openCloseSidebar(sidebartoogle)}
          >
            <AlignRight className="status_toggle middle sidebar-toggle" />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
            <img
              className="img-fluid"
              src={avatarPath ? avatarPath : defaultAvatar}
              alt=""
            />
          </Link>
        </div>
        <nav className="sidebar-main" id="sidebar-main">
          <div className="left-arrow" onClick={scrollToLeft}>
            <ArrowLeft />
          </div>
          <div id="sidebar-menu">
            <ul className="sidebar-links custom-scrollbar">
              <li className="back-btn">
                <div className="mobile-back text-right">
                  <span>{'Back'}</span>
                  <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                </div>
              </li>
              {MENUITEMS.map((Item, i) => (
                <Fragment key={i}>
                  {Item.Items.map((menuItem, i) => (
                    <li
                      className={`sidebar-list ${
                        menuItem.active ? 'active' : ''
                      }`}
                      key={i}
                    >
                      {menuItem.type === 'sub' ? (
                        <a
                          href="javascript"
                          className={`sidebar-link sidebar-title ${
                            menuItem.active ? 'active' : ''
                          }`}
                          onClick={(event) => {
                            event.preventDefault();
                            setNavActive(menuItem);
                          }}
                        >
                          <menuItem.icon />
                          <span>{menuItem.title}</span>
                          {menuItem.badge ? (
                            <label className={menuItem.badge}>
                              {menuItem.badgetxt}
                            </label>
                          ) : (
                            ''
                          )}
                          <div className="according-menu">
                            {menuItem.active ? (
                              <i className="fa fa-angle-down"></i>
                            ) : (
                              <i className="fa fa-angle-right"></i>
                            )}
                          </div>
                        </a>
                      ) : (
                        ''
                      )}

                      {menuItem.type === 'link' ? (
                        <Link
                          to={menuItem.path + ''}
                          className={`sidebar-link sidebar-title link-nav  ${
                            menuItem.active ? 'active' : ''
                          }`}
                          onClick={() => toggletNavActive(menuItem)}
                        >
                          <menuItem.icon />
                          <span>{menuItem.title}</span>
                          {menuItem.badge ? (
                            <label className={menuItem.badge}>
                              {menuItem.badgetxt}
                            </label>
                          ) : (
                            ''
                          )}
                        </Link>
                      ) : (
                        ''
                      )}

                      {menuItem.children ? (
                        <ul
                          className={`sidebar-submenu ${
                            menuItem.active ? 'submenu-expanded' : ''
                          }`}
                        >
                          {menuItem.children.map(
                            (childrenItem, index: number) => {
                              return (
                                <li key={index}>
                                  {childrenItem.type === 'sub' ? (
                                    <a
                                      href="javascript"
                                      className={`${
                                        childrenItem.active ? 'active' : ''
                                      }`}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        toggletNavActive(childrenItem);
                                      }}
                                    >
                                      {childrenItem.title}
                                      <span className="sub-arrow">
                                        <i className="fa fa-chevron-right"></i>
                                      </span>
                                      <div className="according-menu">
                                        {childrenItem.active ? (
                                          <i className="fa fa-angle-down"></i>
                                        ) : (
                                          <i className="fa fa-angle-right"></i>
                                        )}
                                      </div>
                                    </a>
                                  ) : (
                                    ''
                                  )}

                                  {childrenItem.type === 'link' ? (
                                    <Link
                                      to={childrenItem.path + ''}
                                      className={`${
                                        childrenItem.active ? 'active' : ''
                                      }`}
                                      onClick={() =>
                                        toggletNavActive(childrenItem)
                                      }
                                    >
                                      {childrenItem.title}
                                    </Link>
                                  ) : (
                                    ''
                                  )}

                                  {childrenItem.children ? (
                                    <ul
                                      className={`nav-sub-childmenu ${
                                        childrenItem.active
                                          ? 'submenu-expanded'
                                          : ''
                                      }`}
                                    >
                                      {childrenItem.children.map(
                                        (childrenSubItem: any, key: any) => (
                                          <li key={key}>
                                            {childrenSubItem.type === 'link' ? (
                                              <Link
                                                to={childrenSubItem.path + ''}
                                                className={`${
                                                  childrenSubItem.active
                                                    ? 'active'
                                                    : ''
                                                }`}
                                                onClick={() =>
                                                  toggletNavActive(
                                                    childrenSubItem
                                                  )
                                                }
                                              >
                                                {childrenSubItem.title}
                                              </Link>
                                            ) : (
                                              ''
                                            )}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  ) : (
                                    ''
                                  )}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      ) : (
                        ''
                      )}
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
          </div>
          <div className="right-arrow" onClick={scrollToRight}>
            <ArrowRight />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidebar;
