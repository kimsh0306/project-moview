export const variantUtils = (item, selectedItemIds) => {
  const variant = selectedItemIds.includes(item.id.toString())
    ? "primary"
    : "outline-secondary";
  return variant;
};