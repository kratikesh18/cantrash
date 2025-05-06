#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";

const args = process.argv.slice(2);

if (args.length === 3) {
  console.error("❌ Please provide valid command");
  process.exit(1);
}

const command = args[0];
const targetPath = args[1];

const targetedFileType = args[1].split(".")[2];

const trashDir = ".cantrash";
const destPath = path.join(trashDir, targetPath);

const comments = {
  py: "#",
  cpp: "//",
  css: "/*,*/",
  js: "//",
  ts: "//",
  html: "<!--,-->",
};

async function moveToTrash() {
  try {
    // Ensure trashcan directory exists
    await fs.ensureDir(path.dirname(destPath));

    //read the file

    const fileContent = fs.readFileSync(
      targetPath,
      "utf8",
      (error, fileContent) => {
        if (error) {
          console.error("Error performing operation 1");
          return;
        }
      }
    );

    let pastPathData = "";
    if (targetedFileType in comments) {
      if (targetedFileType === "html" || targetedFileType === "css") {
        let commentInit = comments[targetedFileType].split(",")[0];
        let commentEnd = comments[targetedFileType].split(",")[1];

        pastPathData = `${commentInit} ${targetPath} ${commentEnd}\n${fileContent}`;
      } else {
        pastPathData = `${comments[targetedFileType]} ${targetPath}\n${fileContent}`;
      }
    }

    //path to write at the head of the file

    fs.writeFileSync(targetPath, pastPathData, "utf8", (error) => {
      if (error) {
        console.error("Error performing operation 2");
        return;
      }
    });
    // Move file/folder
    await fs.move(targetPath, destPath, { overwrite: true });

    console.log(`✅ Moved ${targetPath} to ${destPath}`);
  } catch (err) {
    console.error(`❌ Failed to move: ${err.message}`);
  }
}

async function restoreFromTrash() {
  try {
    //get the file
    //remove the commments
    //get the path
    //restore it by the path
    console.log("file restored");
  } catch (error) {
    console.log(`❌ Failed to restore : ${error.message}`);
  }
}

if (command === "restore") {
  restoreFromTrash();
}
if (command === "move") {
  moveToTrash();
}
