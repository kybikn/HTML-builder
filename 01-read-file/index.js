// подключение модулей
const fs = require("fs");
const path = require("path");
// полный путь к файлу text.txt (__dirname это путь к текущей директории)
const fullPath = path.join(__dirname, "text.txt");

// создает поток чтения данных из файла
const stream = fs.createReadStream(fullPath, "utf-8");

//  поток вывода
const { stdout } = process;
// const stdout = process.stdout; то же самое

// вешает слушатель события на поток чтения, каждый раз при наступлении события "data" очередной кусочек данных выводится в консоль (on - слушатель события, "data" - название события, chunk - переменная, кусочек данных)
stream.on("data", (chunk) => stdout.write(chunk));
