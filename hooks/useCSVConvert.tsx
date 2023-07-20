import useSWR from 'swr';

const useCSVConvert = (csvFilePath: string) => {
  const fetcher = (url: string) => fetch(url).then((response) => response.text());

  const { data, error } = useSWR(csvFilePath, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 300000,
  });

  if (error) {
    console.error(error);
  }

  const jsonData = data ? processData(data) : [];

  return { data: jsonData };
};

const processData = (csvData: string) => {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  const jsonData = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    const font: any = {};

    for (let j = 0; j < headers.length; j++) {
      font[headers[j]] = currentLine[j];
    }
    jsonData.push(font);
  }

  return jsonData;
};

export default useCSVConvert;
