import { useDispatch, useSelector } from "react-redux";
import { setChannelFilter, setRegionFilter } from "../features/marketingSlice";

export default function Filters() {
  const dispatch = useDispatch();
  const { channelFilter, regionFilter } = useSelector((s) => s.marketing);

  return (
    <div className="card">
      <label>
        Channel:
        <select
          value={channelFilter}
          onChange={(e) => dispatch(setChannelFilter(e.target.value))}
        >
          <option value="">All</option>
          <option value="TikTok">TikTok</option>
          <option value="Pinterest">Pinterest</option>
          <option value="Snapchat">Snapchat</option>
          <option value="Twitter">Twitter</option>
        </select>
      </label>

      <label style={{ marginLeft: "20px" }}>
        Region:
        <select
          value={regionFilter}
          onChange={(e) => dispatch(setRegionFilter(e.target.value))}
        >
          <option value="">All</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Australia">Australia</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
        </select>
      </label>
    </div>
  );
}
