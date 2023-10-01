import { Link } from "react-router-dom";
import { filterCategory } from "../../Redux/actions/product/action"
import { useDispatch } from "react-redux";
const Category = ({ name }) => {

  const dispatch = useDispatch();

  const handleChange = (name) => {
    dispatch(filterCategory(name));
  };

  return (
    <div className="flex flex-wrap ml-4">
      <Link>
        <h1>{name}</h1>
      </Link>
    </div>
  );
};
export default Categorie;
