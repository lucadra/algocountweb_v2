const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "../materials_md");
var materialList = [];

const getMaterials = () => {
  fs.readdir(dirPath, (err, files) => {

    if (err) {console.log("we uagliù è successo un guaio, sta" + err)}

    files.forEach((file, i) => {
      var obj = {};
      var material;

      fs.readFile(`${dirPath}/${file}`, "utf8", (err, contents) => {
        const getMetadataIndices = (acc, element, i) => {
          if (/^---/.test(element)) {
            acc.push(i);
          }

          return acc;
        };

        const parseMetadata = (lines, metadataIndices) => {
          if (metadataIndices.length > 0) {
            var metadata = lines.slice(
              metadataIndices[0] + 1,
              metadataIndices[1]
            );

            metadata.forEach((line) => {
              obj[line.split(": ")[0]] = line.split(": ")[1];
            });

            return obj;
          }
        };

        const parseContents = (lines, metadataIndices) => {
          if (metadataIndices.length > 0) {
            lines = lines.slice(metadataIndices[1] + 1, lines.length);
          }
          return lines.join("\n");
        };

        const lines = contents.split("\n");
        // cerca su MDN Array.prototype.reduce()
        const metadataIndices = lines.reduce(getMetadataIndices, []);
        const metadata = parseMetadata(lines, metadataIndices);
        const content = parseContents(lines, metadataIndices);

        material = {
          key: i + 1,
          title: metadata.title ? metadata.title : "No title given",
          description: metadata.description
            ? metadata.description
            : "No description given",
          imgUrl: metadata.imgUrl ? metadata.imgUrl : "No image url given",
          resUrl: metadata.resUrl ? metadata.resUrl : "No resource url given",
          content: content ? content : "No content given",
          type:  metadata.type ? metadata.type : "No content given",
                };

        materialList.push(material);

        if (i === files.length - 1) {
          var data = JSON.stringify(materialList)
          fs.writeFileSync("src/materials.json", data)
        }

      });
    });
  });
};

getMaterials();
