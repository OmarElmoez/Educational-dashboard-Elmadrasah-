type TCommingDataItem = {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
};

const createOptionsFrom = (data: TCommingDataItem[] | undefined) => {
  let name: string | undefined;
  return data?.map((item: TCommingDataItem) => {
    if (item.first_name && item.last_name) {
      name = item.first_name + " " + item.last_name;
    } else {
      name = item?.name;
    }

    return {
      label: name,
      value: item.id.toString(),
    };
  });
};

export default createOptionsFrom;
