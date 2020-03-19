import data from "./data.json";

export const determineParents = func => {
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            const fullName = item.name;

            //------>>>>>вариант опредиления названия и родителя №1---->>>>>
            let infoName = fullName.split(" ");
            let nameArr = [];
            infoName.forEach(item => {
                if (
                    item === "root" ||
                    item === "folder" ||
                    item === "file" ||
                    !isNaN(item)
                ) {
                    nameArr.push(item);
                }
            });

            let arrayNesting = [];
            let classNameGroup = "";
            classNameGroup = nameArr[0];
            nameArr.forEach((item, index) => {
                if (!isNaN(nameArr[index + 1])) {
                    arrayNesting.push(item + " " + nameArr[index + 1]);
                }
            });

            //------>>>>>вариант опредиления названия и родителя №2---->>>>>
            //  console.log("1111",fullName)
            //   let name = ""
            //   if(fullName==="root"){ name=fullName }
            //   else if(data[index-1].name==="root"){ name=fullName }
            //   else if(data[index-1].isLeaf==="false" && fullName.lastIndexOf(data[index-1].name!==-1)){
            //       console.log("lastIndexOff", fullName.lastIndexOf(data[index-1].name))
            //       name = fullName.slice(0, fullName.lastIndexOf(data[index-1].name));
            //       name =
            //       console.log("newName" , name)
            //   }

            let level = null;
            infoName[0] === "root" ? (level = 0) : (level = arrayNesting.length);
            let id = item.id + item.name;
            const objTree = foundParent(arrayNesting, classNameGroup, level, item.isLeaf, id);
            func(objTree);
        });
    }
};

let objData = {
    name: "root",
    level: 0,
    classNameGroup: "folder",
    children: [],
    isLeaf: true,
    isOpen: true,
    id: ""
};

const foundParent = (arrayNesting, classNameGroup, level, isLeaf, id) => {
    for (let i = arrayNesting.length - 1; i >= 0; i--) {
        const serch = objData => {
            if (objData.children.length === 0) {
                objData.children.push({
                    name: arrayNesting[i],
                    children: [],
                    classNameGroup: classNameGroup,
                    level: level,
                    isLeaf: isLeaf,
                    isOpen: true,
                    id: id
                });
                i--;
            } else {
                ifCreateNewFolder(objData, arrayNesting, i, classNameGroup, level, isLeaf, id )
                i--;
            }

            if (i >= 0) {
                objData.children.forEach(item => {
                    if (item.name === arrayNesting[i + 1]) {
                        serch(item, item.name[i]);
                    }
                });
            }
        };
        serch(objData);
    }
    return objData;
};



const ifCreateNewFolder = (objData, arrayNesting, i, classNameGroup, level, isLeaf, id ) => {
    let searchinResults = [];
    objData.children.forEach(item => {
        if (item.name === arrayNesting[i]) {
            searchinResults.push("true");
        } else {
            searchinResults.push("false");
        }
    });
    if (searchinResults.indexOf("true") === -1) {
        objData.children.push({
            name: arrayNesting[i],
            children: [],
            classNameGroup: classNameGroup,
            level: level,
            isLeaf: isLeaf,
            isOpen: true,
            id: id
        });
    }
};