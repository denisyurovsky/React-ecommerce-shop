const updateWishlistForSpecificProduct = (productId, wishlist) => {
  return wishlist.productIds.includes(productId)
    ? wishlist.productIds.filter((id) => id !== productId)
    : [...new Set(wishlist.productIds).add(productId)];
};

export const updateWishlistsForSpecificProduct = (
  productId,
  wishlistName,
  wishlists
) => {
  return wishlists.map((wishlist) => ({
    ...wishlist,
    productIds:
      wishlist.name === wishlistName
        ? updateWishlistForSpecificProduct(productId, wishlist)
        : wishlist.productIds,
  }));
};

export const checkWishlistsForSpecificProduct = (productId, wishlists) =>
  wishlists.map((wishlist) => {
    return {
      name: wishlist.name,
      checked: wishlist.productIds.includes(productId),
    };
  });

export const checkIsProductWished = (productId, wishlists) => {
  const totalWishlist = [];

  wishlists.forEach((wishlist) => {
    totalWishlist.push(...wishlist.productIds);
  });

  return totalWishlist.includes(productId);
};

export const changeWishlistName = (id, newName, wishlists) => {
  return wishlists.map((wishlist) => ({
    ...wishlist,
    name: wishlist.id === id ? newName : wishlist.name,
  }));
};
