// подключение модулей
const fs = require("fs");
const path = require("path");

// полный путь к файлу destination.txt
const fullPath = path.join(__dirname, "destination.txt");

// создает поток записи данных в файл destination.txt
const outputStream = fs.createWriteStream(fullPath);

//  поток ввода, вывода
const { stdin, stdout } = process;

// вывод в консоль
stdout.write("Привет\n");
stdout.write(
  "Введи строки для записи в файл. Для выхода введите 'exit' или нажммите Ctrl+C. \n"
);

// вешаем слушатель события на ввод данных
stdin.on("data", (data) => {
  // введенные данные приводим к строке, убираем пропуски и спецсимволы. Если то что мы ввели равно exit, то завершаем процесс
  if (data.toString().trim() === "exit") {
    process.exit();
    // иначе записываем данные в поток записи (файл destination.txt)
  } else {
    outputStream.write(data);
  }
});

// вешаем слушатель на событие SIGINT (ctrl + c). В случае срабатывания события выходим из программы
process.on("SIGINT", () => process.exit());

//  вешаем слушатель события на событие выхода из процесса и в случае выхода выводим строку в консоль
process.on("exit", () =>
  stdout.write("\nВведеные данные - в файле 'destination.txt'. Пока!\n")
);
