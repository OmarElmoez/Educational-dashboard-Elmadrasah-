const getOnlyKeysWithData = (data: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== '' && value !== undefined;
    })
  );
};

export default getOnlyKeysWithData;