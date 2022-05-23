// подключение модулей
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");

async function mergeStyles() {
  // полный путь к папке styles
  const fullPathStyles = path.join(__dirname, "styles");

  // получение (чтение) списка файлов и папок (массив)
  const filesAndFolders = await fsPromises.readdir(fullPathStyles, {
    withFileTypes: true,
  });
  // фильтрование - только файлы
  const filesOnly = filesAndFolders.filter((element) => element.isFile());

  // фильтрование - только css файлы
  const cssFilesOnly = filesOnly.filter((file) => {
    // получение имени файла с расширением
    const fileName = file.name;
    // получение расширения файла
    const extention = path.extname(fileName);
    // проверка на расширение css
    if (extention === ".css") return true;
    else return false;
  });

  // полный путь к bundle.css
  const fullPathToCssBundle = path.join(
    __dirname,
    "project-dist",
    "bundle.css"
  );
  // открываю поток записи в bundle.css
  const output = fs.createWriteStream(fullPathToCssBundle);

  // цикл по каждому css файлу и запись этих стилей в bundle.css
  for (const file of cssFilesOnly) {
    // получение имени каждого отдельного css файла с расширением
    const fileName = file.name;

    // полный путь к каждому отдельному css файлу
    const fullPathToCssFile = path.join(__dirname, "styles", fileName);

    // открываю поток чтения каждого css файла
    const input = fs.createReadStream(fullPathToCssFile);

    // объединение потока чтения и записи
    input.pipe(output);
  }
}
mergeStyles();
