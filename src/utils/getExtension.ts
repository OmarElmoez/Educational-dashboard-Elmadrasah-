const getExtension = (url: string): string => {
  const extension = url.split('.').pop() || '';
  return extension.toLowerCase();
}

export default getExtension;