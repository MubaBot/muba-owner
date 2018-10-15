const ShopStorageKey = "shop";

const setBusinessShop = async id => {
  localStorage.setItem(ShopStorageKey, id);
};

const getSelectedBusinessShop = () => {
  return localStorage.getItem(ShopStorageKey);
};

export { setBusinessShop, getSelectedBusinessShop };
