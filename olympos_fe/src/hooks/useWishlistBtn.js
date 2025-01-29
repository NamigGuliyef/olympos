import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavorites,
  setFavorites,
  setIsClicked,
} from "../store/slices/favoritesSlice";
import { toast } from "react-hot-toast";
import { getCookie } from "../helper/setCookie";
import { useEffect, useMemo, useState, useCallback } from "react";
import useUserWishlist from "../features/wishlist/useUserWishlist";
import useCreateWishlist from "../features/wishlist/useCreateWishlist";
import useDeleteWishlist from "../features/wishlist/useDeleteUser";

export const useWishlistBtn = (item, id, type) => {
  const [isInFavorite, setIsInFavorite] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.favorite.favorites);
  const user = useSelector((store) => store.user.user);
  const { wishlist, isWishlistLoading } = useUserWishlist();
  const { createUserWishlist } = useCreateWishlist();
  const { deleteUserWishlist } = useDeleteWishlist();
  const token = useMemo(() => getCookie("token"), []);
  const role = useMemo(() => getCookie("role"), []);

  useEffect(() => {
    if (
      !isWishlistLoading &&
      user.length &&
      role === "user" &&
      token &&
      wishlist.length
    ) {
      // Wishlist-də var olub olmadığını yoxlayaq
      const isExistInWishlist = wishlist?.find(
        (list) => list?.[`${type}Id`]?._id === id
      );
      setIsInFavorite(!!isExistInWishlist);
    } else {
      // Favourites-də var olub olmadığını yoxlayaq
      const isExistInFavorites = favorites.find((favor) => favor._id === id);
      setIsInFavorite(!!isExistInFavorites);
    }
  }, [favorites, id, isWishlistLoading, role, token, user.length, wishlist, type]);


  const handleFavoriteClick = async (e) => {
    e.preventDefault();

    if (user.length && role === "user" && token && !isWishlistLoading) {
      // Wishlist-də mövcud olub olmadığını yoxlayaq
      const existEl = wishlist?.filter(
        (list) => list?.[`${type}Id`]?._id === id
      );

      if (existEl.length) {
        // Əgər artıq var, silirik
        await deleteUserWishlist(id);
        toast.success("İstək siyahısından çıxarıldı");

        // Wishlist-də dəyişiklik edirik
        setIsInFavorite(false);
        // Yenilənmiş wishlist məlumatlarını yeniləyirik
        dispatch(deleteFavorites(id)); // Redux store-də silmək
      } else {
        const obj = { [`${type}Id`]: id };
        // Yeni item əlavə edirik
        await createUserWishlist(obj);
        toast.success("İstək siyahısına əlavə edildi");

        // Wishlist-də dəyişiklik edirik
        setIsInFavorite(true);
        // Yenilənmiş wishlist məlumatlarını əlavə edirik
        dispatch(setFavorites(item)); // Redux store-ə əlavə etmək
      }
    } else {
      const existEl = favorites.find((el) => el._id === id);

      if (existEl) {
        dispatch(deleteFavorites(item._id));
        toast.success("İstək siyahısından çıxarıldı");
      } else {
        dispatch(setFavorites(item));
        toast.success("İstək siyahısına əlavə edildi");
      }
      dispatch(setIsClicked(item._id));
    }
  };


  return { isInFavorite, handleFavoriteClick };
};
