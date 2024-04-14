import favoriteIcon from "../../assets/favoriteIcon.png";
import "../item/ProductCard.css";
function ProductCard({ product, imgWidth, imgHeight }) {
  const url = product.images[0];
  const alt = product.name;
  return (
    <div className="productInfoCard">
      <img src={url} alt={`${alt}이미지`} width={imgWidth} height={imgHeight} />
      <h2>{product.name}</h2>
      <p>{`${product.price}원`}</p>
      <div className="favorite-container">
        <img src={favoriteIcon} alt="favoriteIcon" />
        <p className="favoriteCount">{product.favoriteCount}</p>
      </div>
    </div>
  );
}

export default ProductCard;
