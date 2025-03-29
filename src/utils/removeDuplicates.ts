const removeDuplicates = (data: any[] | undefined) => {
  const uniqueMap = new Map();

  data?.forEach(item => {
      const key = item.id;
      if (!uniqueMap.has(key)) {
          uniqueMap.set(key, item);
      }
  });  
  
  return Array.from(uniqueMap.values());
}

export default removeDuplicates;