function useAnimate() {
  // const animate = (args) => {
  //   console.log("args", args);
  //   window.requestAnimationFrame(animate);
  // };

  // 함수 인자를 ...(rest parameter) 로 받으면은 그 값이 array가 된다
  const animate = (...args: any[]) => {
    const canvasContext = args[0];
    args.slice(1).forEach((obj) => {
      obj.update(canvasContext);
    });
    window.requestAnimationFrame(() => animate(...args));
  };
  return animate;
}

export default useAnimate;
