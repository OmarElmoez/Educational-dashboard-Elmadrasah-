const createSearchParamsString  = <T extends Record<string, unknown>>(searchTerms: T) => {
  const params = new URLSearchParams();

  for(const [key, value] of Object.entries(searchTerms)) {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  }

  return params.toString();
}

export default createSearchParamsString;