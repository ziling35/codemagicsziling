export const cors = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000', 
    'https://codemagics.ru', 
    'https://app.codemagics.ru', 
    'https://demo.codemagics.ru',
    'http://103.97.178.131:3000',  // 服务器地址
    'http://103.97.178.131',        // 不带端口
    'http://cgame.ziling.site:3000',
    'http://cgame.ziling.site',
    'https://cgame.ziling.site',
  ]
  
  const origin = req.header('origin')?.toLowerCase();
  
  // 设置 CORS 头
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24小时
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
}
