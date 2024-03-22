const fs = require("fs");

const deleteFile = async (file, folder) => {
  const filename = `public/${folder}/${file}`;
  await fs.unlink(filename, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Deleted Image");
  });
};

module.exports = deleteFile;
