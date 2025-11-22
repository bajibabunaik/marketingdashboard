import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../features/marketingSlice";

export default function Pagination({ total }) {
  const dispatch = useDispatch();
  const { page, pageSize } = useSelector((s) => s.marketing);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>
        Prev
      </button>

      <span>Page {page} of {totalPages}</span>

      <button disabled={page === totalPages} onClick={() => dispatch(setPage(page + 1))}>
        Next
      </button>
    </div>
  );
}
