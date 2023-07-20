const NumberConverter = (number: number) => {
  const convertToMyanmarNumber = (digit: number) => {
    const myanmarDigits = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
    return myanmarDigits[digit];
  };

  const convertNumber = (num: number) => {
    const englishDigits = num?.toString().split('');
    const myanmarDigits = englishDigits.map((digit) => convertToMyanmarNumber(parseInt(digit)));

    return myanmarDigits.join('');
  };

  const myanmarNumber = convertNumber(number);

  return myanmarNumber;
};

export default NumberConverter;
