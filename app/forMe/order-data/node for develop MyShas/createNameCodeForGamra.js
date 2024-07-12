const { HDate, DailyLearning } = require('@hebcal/core');
require('@hebcal/learning');

function createListName(lang = "ng") {

    let dt = new Date();
    let hd = new HDate(dt);
    let ev = DailyLearning.lookup('dafYomi', hd);

    const patern = /[0-9]/g;

    let render = ev.render(lang);
    let longname = render.split(":")[1];

    if (lang == "he") {
        longname = longname.split(longname.substring(longname.indexOf("דף")))[0]
    }
    let fistname = longname.replace(patern, "").trim();
    let name = fistname;
    const arr = [name]

    

    let miliTime = new Date().getTime();
    const dayAsMiliseccand = 86400000

    let run = true;
    while (run) {
        miliTime += dayAsMiliseccand * 2;
        dt = new Date(miliTime);
        hd = new HDate(dt);
        ev = DailyLearning.lookup('dafYomi', hd)

        render = ev.render(lang);
        longname = render.split(":")[1];
        if (lang == "he") {
            longname = longname.split(longname.substring(longname.indexOf("דף")))[0]
        }
        name = longname.replace(patern, "").trim();

        if (!arr.includes(name)) {
            arr.push(name);
            console.log("name ==== ", name);
        }
        run = !(arr.length > 1 && name == fistname);
    }

    return arr;
}


function createNameCodeForGamra(lang = "eg") {

    const arr = createListName(lang);
    const codeArr = createListName();

    const gmarakey = {};
    const gmarakeyEg = {};

    for (let i = 1; i < arr.length; i++) {
        let gmara = arr[i];
        
        
        let code = codeArr[i].replace(" ", "_")

        code = code.toLocaleLowerCase()

        gmarakey[code] = "";
        gmarakeyEg[code] = gmara;
    }


    console.log("gmarakey ==== ", gmarakey);
    console.log("gmarakeyEg ==== ", gmarakeyEg);
    console.log("gmarakeyEg ==== ", (DailyLearning.lookup('dafYomi', new HDate(new Date()))).render(lang));
}

// createNameCodeForGamra();
createNameCodeForGamra("he");

