import { statusBarBgSlicedAddrer } from "@/src/utils/redux/slice/statusBar/statusBarBackground";
import { statusBarContentAdder } from "@/src/utils/redux/slice/statusBar/statusBarContent";
import { useDispatch } from "react-redux";

const useSatusBarUp = () => {
  const dispatch = useDispatch();
  const StatusBarUpFun = ({ bg, content }: any) => {
    dispatch(statusBarBgSlicedAddrer(bg));
    dispatch(statusBarContentAdder(content));
  };
  return { StatusBarUpFun };
};

export default useSatusBarUp;
