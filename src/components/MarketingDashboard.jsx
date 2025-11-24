import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketingData } from "../features/marketingSlice";

import Filters from "./Filters";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import PerformanceSummary from "./PerformanceSummary";
import PerformanceChart from "./PerformanceChart";

export default function MarketingDashboard() {
  const dispatch = useDispatch();

  const {
    data,
    channelFilter,
    regionFilter,
    loading,
    error
  } = useSelector((state) => state.marketing);

  useEffect(() => {
    dispatch(fetchMarketingData());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return data.filter((d) => 
      (!channelFilter || d.channel === channelFilter) &&
      (!regionFilter || d.region === regionFilter)
    );
  }, [data, channelFilter, regionFilter]);

  const summary = useMemo(() => {
    let spend = 0,
      impressions = 0,
      conversions = 0;

    filtered.forEach((d) => {
      spend += d.spend;
      impressions += d.impressions;
      conversions += d.conversions;
    });

    return {
      spend,
      impressions,
      conversions,
      ctr: impressions ? (conversions / impressions) * 100 : 0
    };
  }, [filtered]);

  const chartData = useMemo(() => {
    const map = {};

    filtered.forEach((d) => {
      if (!map[d.channel]) {
        map[d.channel] = { channel: d.channel, spend: 0 };
      }
      map[d.channel].spend += d.spend;
    });

    return Object.values(map);
  }, [filtered]);
  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard">
      <h1>Marketing Dashboard  Admin</h1>

      <Filters />
      <PerformanceSummary summary={summary} />

      <PerformanceChart data={chartData} />

      <DataTable filtered={filtered} />

      <Pagination total={filtered.length} />

    </div>
  );
}
