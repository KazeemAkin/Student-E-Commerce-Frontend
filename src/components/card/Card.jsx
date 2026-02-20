import "./Card.css";

const Card = ({ id, children, addStyle }) => {
  return (
    <div className={"card " + addStyle} id={id}>
      {children}
    </div>
  );
};

export default Card;
