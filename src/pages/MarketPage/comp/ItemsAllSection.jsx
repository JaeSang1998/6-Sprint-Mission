import { GetAllItems } from "../../../api/GetAllItems";
import { useEffect, useState } from "react";
import SearchItem from "../../../components/SearchItem";
import EnterItem from "../../../components/EnterItem";
import DropdownSort from "../../../components/DropdownSort";
import ArrowDown from "../../../assets/ic_arrow_down.svg";
import PagiNationBar from "../../../components/PagiNationBar";
import MakeItemList from "./MakeItemList";

const PAGESIZE = 10;

function ItemsAllSection() {
  const [order, setOrder] = useState("recent");
  const [items, setItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [pageNum, setPageNum] = useState([]);

  const handleSortOption = (option) => {
    setOrder(option);
    setShowDropdown(false);
  };

  const handleLoad = async (options) => {
    const { list } = await GetAllItems(options);
    setItems(list);
  };

  const handleLoadPage = (NumOfPage) => {
    handleLoad({ order, pageNum: NumOfPage, pageSize: PAGESIZE });
    setPageNum(NumOfPage);
  };

  useEffect(() => {
    handleLoad({ order, pageNum: 1, pageSize: PAGESIZE });
  }, [order, pageNum]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <section className="products-all">
        <div className="content-label-box">
          <div className="content-label">전체 상품</div>
          <div className="control-box">
            <SearchItem />
            <EnterItem />
            <div className="dropdown-box">
              <button className="dropdown-button" onClick={toggleDropdown}>
                {order === "recent" ? "최신순" : "좋아요순"}
                <img
                  className={
                    showDropdown
                      ? "arrow-down-image reverse"
                      : "arrow-down-image"
                  }
                  src={ArrowDown}
                  alt="▼"
                />
              </button>
              {showDropdown && (
                <DropdownSort handleSortOption={handleSortOption} />
              )}
            </div>
          </div>
        </div>
        <MakeItemList items={items} />
        <PagiNationBar handlePageNum={handleLoadPage} />
      </section>
    </>
  );
}

export default ItemsAllSection;
