export function stringToCamelCase<T extends string>(str: T): T {
  let result = "";
  let nextCharUppercase = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === " ") {
      nextCharUppercase = true;
    } else {
      if (nextCharUppercase) {
        result += char.toUpperCase();
        nextCharUppercase = false;
      } else {
        result += char.toLowerCase();
      }
    }
  }

  return result as T;
}

export function toCapitalizedString(str: string): string {
  // Split the input string into an array of words
  const words = str.split(/[\s_-]+|(?=[A-Z])/);

  // Capitalize the first letter of each word and join them with spaces
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
