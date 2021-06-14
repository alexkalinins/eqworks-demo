/**
 * Makes the first letter a capital.
 * @param {string} text the text
 */
export const firstCapital = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };