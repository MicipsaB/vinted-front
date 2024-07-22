const ProductSummary = ({
  price,
  protectionFees,
  shippingFees,
  totalPrice,
}) => {
  return (
    <div className="payment-card summary">
      <div className="title">Résumé de la commande</div>
      <div className="content">
        <ul>
          <li>
            Commande <span>{price} €</span>
          </li>
          <li>
            Frais protection acheteurs <span>{protectionFees} €</span>
          </li>
          <li>
            Frais de port <span>{shippingFees} €</span>
          </li>
        </ul>
      </div>
      <div className="divider" />
      <div className="content">
        <ul>
          <li className="bold">
            Total <span>{totalPrice} €</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSummary;
