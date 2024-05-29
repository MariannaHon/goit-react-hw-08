import css from './SearchBox.module.css'
import { useSelector, useDispatch } from "react-redux";
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';

const SearchBox = () => {

    const dispatch = useDispatch();

    const filter = useSelector(selectNameFilter);

    return (
        <div className={css.container}>
            <p className={css.text}>Find contacts by name</p>
            <input
                className={css.input}
                type="text"
                value={filter}
                onChange={(e) => dispatch(changeFilter(e.target.value))}
            />
        </div>
    );
}

export default SearchBox;