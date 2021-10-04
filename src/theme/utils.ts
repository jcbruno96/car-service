export const colorOpacity = (hexa: string, opacity: number) => {
  if (!hexa || hexa[0] !== "#" || hexa.length !== 7) return ``;

  const red = parseInt(hexa.slice(1, 3), 16);
  const green = parseInt(hexa.slice(3, 5), 16);
  const blue = parseInt(hexa.slice(5, 7), 16);

  return `
      rgba(${red}, ${green}, ${blue}, ${opacity});
    `;
};
