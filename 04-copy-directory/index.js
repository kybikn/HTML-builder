// подключение модулей
const path = require("path");
const fsPromises = require("fs/promises");

// полный путь к папкам
const fullPath = path.join(__dirname, "files");
const copyPath = path.join(__dirname, "files-copy");

async function copyDir() {
  //удаление старой папки files-copy, если была ранее
  try {
    await fsPromises.rm(copyPath, { recursive: true });
    console.log("files-copy deleted");
  } catch {
    console.log("files-copy not deleted(not exist)");
  }

  // создание папки files-copy
  try {
    await fsPromises.mkdir(copyPath, { recursive: true });
    console.log("files-copy created");
  } catch {
    console.log("files-copy not created");
  }

  // получение (чтение) списка файлов и папок (массив)
  const filesAndFolders = await fsPromises.readdir(fullPath, {
    withFileTypes: true,
  });
  // фильтрование - только файлы
  const filesOnly = filesAndFolders.filter((element) => element.isFile());

  // цикл по файлам
  for (const file of filesOnly) {
    // получение имени каждого отдельного файла с расширением
    const fileName = file.name;

    // полный путь к каждому отдельному файлу
    const fullPathToFile = path.join(__dirname, "files", fileName);
    const fullPathToFileCopy = path.join(__dirname, "files-copy", fileName);

    // копирование каждого отдельного файла
    try {
      await fsPromises.copyFile(fullPathToFile, fullPathToFileCopy);
      console.log("file was copied to files-copy");
    } catch {
      console.log("The file could not be copied");
    }
  }
}

copyDir();
