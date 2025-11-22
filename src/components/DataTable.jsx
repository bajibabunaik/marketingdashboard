import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../features/marketingSlice";

export default function DataTable({ filtered }) {
  const dispatch = useDispatch();
  const { sortBy, sortDir, page, pageSize } = useSelector(
    (s) => s.marketing
  );

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === "string") {
        return sortDir === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDir === "asc" ? valA - valB : valB - valA;
    });
    return arr;
  }, [filtered, sortBy, sortDir]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th onClick={() => dispatch(setSort("date"))}>Date</th>
            <th onClick={() => dispatch(setSort("channel"))}>Channel</th>
            <th onClick={() => dispatch(setSort("spend"))}>Spend</th>
            <th onClick={() => dispatch(setSort("impressions"))}>
              Impressions
            </th>
            <th onClick={() => dispatch(setSort("conversions"))}>
              Conversions
            </th>
          </tr>
        </thead>

        <tbody>
          {paged.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.channel}</td>
              <td>${row.spend}</td>
              <td>{row.impressions.toLocaleString()}</td>
              <td>{row.conversions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
