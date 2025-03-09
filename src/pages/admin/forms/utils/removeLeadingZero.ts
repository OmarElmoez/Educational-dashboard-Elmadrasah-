const removeLeadingZero = (phone: string) => {
  const parts = phone.split(" ");
  if (parts.length > 1 && parts[1][0] === "0") {
    parts[1] = parts[1].slice(1);
  }
  return parts.join(" ");
};

export default removeLeadingZero;