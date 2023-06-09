import { useEffect, useState } from "react";

const useCSVConvert = (csvFilePath: string) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(csvFilePath)
			.then((response) => response.text())
			.then((csvData) => {
				console.log("CCS", csvData);
				const lines = csvData.split("\n");
				const headers = lines[0].split(",");
				const jsonData = [];

				for (let i = 1; i < lines.length; i++) {
					const currentLine = lines[i].split(",");
					const obj = {};

					for (let j = 0; j < headers.length; j++) {
						obj[headers[j]] = currentLine[j];
					}

					jsonData.push(obj);
				}

				console.log(jsonData);
				setData(jsonData);
			})
			.catch((err: Error) => {
				console.error(err);
			});
	}, [csvFilePath]);

	return { data };
};

export default useCSVConvert;
