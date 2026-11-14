const requestLogger = (req, res, next) => {
  
  const timeStart = Date.now();

  
  res.on("finish", () => {
    const timeEnd = Date.now();

    
    const duration = timeEnd - timeStart;

    
    console.log({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      timeStart: new Date(timeStart).toISOString(),
      timeEnd: new Date(timeEnd).toISOString(),
      duration: `${duration} ms`,
    });
  });

 
  next();
};

export default requestLogger;