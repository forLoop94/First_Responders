import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeGrowl } from "../redux/growler/growlerSlice";

const Growl = () => {
  const growls = useSelector((state: RootState) => state.growlers.growls);
  const dispatch = useDispatch();

  useEffect(() => {
    if (growls.length > 0) {
      const timers = growls.map((growl) =>
        setTimeout(() => {
          dispatch(removeGrowl(growl.id));
        }, 3000)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [growls, dispatch]);

  return (
    <div className="toast toast-top toast-end fixed top-4 right-4 z-50">
      {growls.map((growl) => {
        const alertClass = {
          success: "alert-success",
          error: "alert-error",
          warning: "alert-warning",
          info: "alert-info",
        }[growl.type];

        return (
          <div key={growl.id} className={`alert ${alertClass}`}>
            <span>{growl.message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Growl;
