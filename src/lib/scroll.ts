export const scrollDown = (): void => {
  if (typeof window !== 'undefined') {
    window.scrollBy({
      top: 500,
      behavior: 'smooth',
    });
  }
};
