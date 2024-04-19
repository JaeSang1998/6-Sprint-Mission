import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import logo from "../../assets/logo-panda.svg";
import { useContext } from "react";
import LoginContext from "../../contexts/LoginContext";
import LoginIcon from "../../assets/icon-login.svg";

export default function Nav() {
  const isLogin = useContext(LoginContext);
  const { pathname } = useLocation();
  console.log("path", typeof pathname, pathname);
  return (
    <>
      <header>
        <div className="nav-container">
          <div className="logo">
            <img src={logo} className="logo-icon" alt="로고" />
            <Link to="/" className="logo-title">
              판다마켓
            </Link>
          </div>
          <div className="nav-pages">
            <Link
              to="/board"
              className={`board-btn ${pathname === "/board" && "active"}`}
            >
              자유게시판
            </Link>
            <Link
              to="/items"
              className={`items-btn ${
                (pathname === "/additem" || pathname === "/items") && "active"
              }`}
            >
              중고마켓
            </Link>
          </div>
          {!isLogin ? (
            <img className="icon-login" src={LoginIcon} alt="로그인 아이콘" />
          ) : (
            <Link to="/login" className="btn login-btn">
              로그인
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
