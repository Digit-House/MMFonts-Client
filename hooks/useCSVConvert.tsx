import * as csv from "csvtojson";
import fontCSV from "../data/font.csv";
import { useEffect, useState } from "react";

const useCSVConvert = () => {
	const [fontsArray, setFontsArray] = useState([]);

	useEffect(() => {
		csv()
			.fromFile(fontCSV)
			.then((jsonObj: any) => {
				console.log(jsonObj);
				setFontsArray(jsonObj);
			});
	}, []);

	return { fontsArray };
};

export default useCSVConvert;
