// подключение модулей
const path = require("path");
// fs/promises нужен для асинхронной функции, fs без асинхронной функции
const fsPromises = require("fs/promises");

// асинхронная функция
async function filesInFolder() {
  // полный путь к папке secret-folder
  const fullPath = path.join(__dirname, "secret-folder");
  //получение списка файлов и папок (массив)
  const filesAndFolders = await fsPromises.readdir(fullPath, {
    withFileTypes: true,
  });
  // фильтрование - только файлы
  const filesOnly = filesAndFolders.filter((element) => element.isFile());
  // цикл по всем файлам
  for (const file of filesOnly) {
    // получение имени файла с расширением
    const fileName = file.name;
    // получение расширения файла
    const extention = path.extname(fileName);
    // получение имени файла без расширения
    const shortName = path.basename(fileName, extention);
    // получение расширения без точки
    const shortExtention = extention.slice(1);
    // полный путь к файлу
    const fullPathToFile = path.join(__dirname, "secret-folder", fileName);
    // асинхронное получение статистики файла со всеми свойствами
    const stat = await fsPromises.stat(fullPathToFile);
    // получение размера файла из статистики
    const size = stat.size;
    // вывод в консоль отдельно название файла, расширение и размер
    console.log(shortName + " - " + shortExtention + " - " + size + "b");
  }
}
filesInFolder();
