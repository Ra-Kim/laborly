import {
  addFavoriteWorker,
  deleteFavoriteWorker,
  getFavoriteWorkers,
} from "@/redux/client/thunkActions";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { Heart } from "lucide-react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FavouriteWorker = ({ worker_id }: { worker_id: string }) => {
  const dispatch = useAppThunkDispatch();
  const params = useSearchParams();
  const view = params[0].get("view") || "";
  const [favourite, setFavourite] = React.useState(false);
  useEffect(() => {
    if (!view.toLocaleLowerCase().includes("favourite")) {
      dispatch(getFavoriteWorkers(""));
    }
  }, []);
  const { favoriteWorkers } = useAppSelector(({ client }) => client);
  useEffect(() => {
    const isFavourite = favoriteWorkers?.some(
      (worker) => worker.worker.id === worker_id
    );
    setFavourite(isFavourite);
  }, [favoriteWorkers, worker_id]);

  const toggleFavourite = () => {
    if (favourite) {
      // Remove from favourites
      setFavourite(false);
      dispatch(deleteFavoriteWorker(worker_id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          // Optionally, you can refresh the list of favorite workers here
          dispatch(getFavoriteWorkers(""));
        } else {
          setFavourite(true);
        }
      });
    } else {
      setFavourite(true);
      dispatch(addFavoriteWorker(worker_id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
        } else {
          setFavourite(false);
        }
      });
    }
  };
  return (
    <div onClick={toggleFavourite} className="cursor-pointer">
      <Heart
        className={favourite ? "fill-red-500 text-red-500" : "text-gray-500"}
        fill={favourite ? "red" : "none"}
      />
    </div>
  );
};

export default FavouriteWorker;
