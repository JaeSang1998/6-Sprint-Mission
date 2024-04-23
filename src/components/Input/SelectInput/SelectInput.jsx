import { orderAtom } from "contexts/atoms/order";
import useDeviceState from "hooks/useDeviceState";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import SortIcon from "assets/icon/ic_sort.svg";
import ArrowDownIcon from "assets/icon/ic_arrow_down.svg";
import * as S from "./SelectInput.style";

export default function SelectInput() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [order, setOrder] = useAtom(orderAtom);
  const { isMobileWidth } = useDeviceState();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.SelectInputContainer ref={dropdownRef}>
      <S.SelectButtonContainer onClick={toggleDropdown}>
        {isMobileWidth ? (
          <img src={SortIcon} alt="sort-icon" />
        ) : (
          <S.SelectButton>
            <span>{order}</span>
            <img src={ArrowDownIcon} alt="arrow-down" />
          </S.SelectButton>
        )}
      </S.SelectButtonContainer>
      {isDropdownOpen && (
        <S.DropdownContentContainer>
          <S.DropdwonContent onClick={() => setOrder("최신순")}>
            최신순
          </S.DropdwonContent>
          <S.DropdwonContent onClick={() => setOrder("좋아요순")}>
            좋아요순
          </S.DropdwonContent>
        </S.DropdownContentContainer>
      )}
    </S.SelectInputContainer>
  );
}