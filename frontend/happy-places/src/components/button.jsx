
const Button = ({ onClick, myStyle }) => {
  return (
    <button className={myStyle} onClick={onClick}>
      Search
    </button>
  );
};
export default Button;