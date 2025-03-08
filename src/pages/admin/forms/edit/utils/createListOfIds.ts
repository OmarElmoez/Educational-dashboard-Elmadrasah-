const createListOfIds = <T extends { id: string | number }>(arr: T[]): number[] => {
  return arr.map(item => Number(item.id))
}

export default createListOfIds;