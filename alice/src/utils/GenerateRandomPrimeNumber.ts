export const isPrime = (num: number) => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false;
    return num > 1;
};

const generateRandomNumber = (length:number): number => {
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
};

export const generateRandomPrimeNumber = (ln: number):any => {

    const randomLargeInt: any = generateRandomNumber(ln);
    var randomLargeOddInt: number = randomLargeInt*2-1;

    while (true) {
      if (isPrime( randomLargeOddInt ) ) {
          return randomLargeOddInt
      }  else {
          randomLargeOddInt = randomLargeOddInt - 1;
      }
    }
};