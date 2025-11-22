import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUiTokens } from "../features/uiSlice";

export default function UIThemeProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUiTokens());
  }, [dispatch]);

  return children;
}
