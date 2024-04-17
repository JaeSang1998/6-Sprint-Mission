/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from "../styles/items.module.css";
import { BestProductList, ProductList, Pagination } from "../components";
import { getProducts, getBestProducts } from "../api/api";
import { useNavigate } from "react-router-dom";

function Items() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [productsPerPage, setProductsPerPage] = useState(10);
  const [bestProductsPerPage, setBestProductsPerPage] = useState(4);

  const [isDropdownView, setDropdownView] = useState(false);

  // 처음과 끝 인덱스 번호를 구하고 slice로 분할하기
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const selectOptions = [
    { value: "createdAt", label: "최신순" },
    { value: "favoriteCount", label: "좋아요순" },
  ];

  const currentProducts = (products) => {
    let currentProducts = 0;

    currentProducts = products.slice(indexOfFirst, indexOfLast);
    return currentProducts;
  };

  const navigate = useNavigate();
  const goToAddItem = () => {
    navigate("/additem");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let fetchedProducts = await getProducts({ keyword });

        // 정렬 로직 추가
        if (order === "favoriteCount") {
          fetchedProducts = fetchedProducts.sort(
            (a, b) => b.favoriteCount - a.favoriteCount
          );
        } else {
          fetchedProducts = fetchedProducts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("상품 가져오는데 실패했습니다", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [order, keyword]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const bestProducts = await getBestProducts();
        const screenSize = handleMediaQueryChange();
        const bestProductsCount = getBestProductsPerPage(screenSize);
        setBestProducts(bestProducts.list.slice(0, bestProductsCount));
      } catch (error) {
        console.error("베스트 상품 가져오는데 실패했습니다", error);
      }
    };
    fetchBestProducts();
  });

  // 반응형에 따라 보여지는 상품의 개수
  // 전체 상품
  function getProductsPerPage(screenSize) {
    switch (screenSize) {
      case "desktop":
        return 10;
      case "tablet":
        return 6;
      case "mobile":
        return 4;
      default:
        return 10;
    }
  }

  // 베스트 상품
  function getBestProductsPerPage(screenSize) {
    switch (screenSize) {
      case "desktop":
        return 4;
      case "tablet":
        return 2;
      case "mobile":
        return 1;
      default:
        return 4;
    }
  }

  // 미디어 쿼리 변경 감지를 위한 이벤트 리스너 추가
  const mqlDesktop = window.matchMedia("(min-width: 1200px)");
  const mqlTablet = window.matchMedia(
    "(min-width: 768px) and (max-width: 1199px)"
  );

  // 페이지당 아이템 개수를 설정하는 함수
  function handleMediaQueryChange() {
    const screenSize = mqlDesktop.matches
      ? "desktop"
      : mqlTablet.matches
      ? "tablet"
      : "mobile";
    const productsPerPage = getProductsPerPage(screenSize);
    const bestProductsPerPage = getBestProductsPerPage(screenSize);
    setProductsPerPage(productsPerPage);
    setBestProductsPerPage(bestProductsPerPage);

    return screenSize;
  }

  useEffect(() => {
    // 미디어 쿼리 변경 감지를 위한 이벤트 리스너 추가
    mqlDesktop.addListener(handleMediaQueryChange);
    mqlTablet.addListener(handleMediaQueryChange);

    // 컴포넌트가 마운트될 때 최초 실행
    handleMediaQueryChange();

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      mqlDesktop.removeListener(handleMediaQueryChange);
      mqlTablet.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleKeywordSearch = (e) => {
    setKeyword(e.target.value);
  };

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setDropdownView(!isDropdownView);
  };

  // 선택된 옵션을 처리하는 함수
  const selectOption = (value) => {
    setOrder(value);
    setDropdownView(false); // 옵션 선택 후 드롭다운 닫기
  };

  return (
    <div className={styles.container}>
      <div className={styles["best-products"]}>
        <h3>베스트 상품</h3>
        <BestProductList products={bestProducts} />
      </div>

      <div>
        <div className={styles["all-products-nav"]}>
          <div className={styles["all-products-sub-nav"]}>
            <h3>전체 상품</h3>
            <div className={styles.search}>
              <img src="/assets/icon_search.png" />
              <input
                placeholder="검색할 상품을 입력해주세요"
                onChange={handleKeywordSearch}
              ></input>
            </div>
            <button id="btn_small" onClick={goToAddItem}>
              상품 등록하기
            </button>
            <div className={styles.dropdown} onClick={toggleDropdown}>
              <picture>
                <source
                  srcset="assets/icon_order.png"
                  media="all and (max-width: 768px)"
                />
                <span className={styles.valueName}>
                  {selectOptions.find((option) => option.value === order).label}
                </span>
                <img src="assets/icon_dropdown.png" />
              </picture>
              {isDropdownView && (
                <ul className={styles.dropdownMenu}>
                  {selectOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => selectOption(option.value)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <ProductList products={currentProducts(products)} />
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={setCurrentPage}
      />
    </div>
  );
}

export default Items;
