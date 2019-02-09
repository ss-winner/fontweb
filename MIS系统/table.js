let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]
var div=document.getElementById("checkbox");
var divTable = document.getElementById("table-wrapper");
var table = document.getElementsByTagName("table")[0];
var input = document.getElementsByTagName("input");
var th1 = document.getElementsByTagName("th")[0];
var th2 = document.getElementsByTagName("th")[1];


div.onclick = function () {

    //渲染新的表格(根据select选项获取数据)
    var arrArea = [];
    var arrProduct = [];

    for (var i = 1; i < 8; i++) {
        if (i < 4 && input[i].checked) {
            arrArea.push(input[i].value);

        }
        if (i > 4 && input[i].checked) {
            arrProduct.push(input[i].value);
        }

    }

    var tr = document.querySelectorAll("tr");
    for (var i = 1; i < tr.length; i++) {
        table.removeChild(tr[i]);
    }


    if (arrArea.length != 1) {
        for (var i = 0; i < arrProduct.length; i++) {
            for (var j = 0; j < arrArea.length; j++) {
                newForm(arrArea[j], arrProduct[i], 1);
            }
        }
        th1.textContent = "商品";
        th2.textContent = "地区";
        mergeCell("table1", 1, arrProduct.length * arrArea.length, 0)
    }
    if (arrArea.length == 1) {
        for (var i = 0; i < arrArea.length; i++) {
            for (var j = 0; j < arrProduct.length; j++) {
                newForm(arrArea[i], arrProduct[j], 0);
            }
        }
        th1.textContent = "地区";
        th2.textContent = "商品";
        mergeCell("table1", 1, arrProduct.length, 0)
    }


}

/**
      * 合并单元格(如果结束行传0代表合并所有行)
      * @param table1    表格的ID
      * @param startRow  起始行
      * @param endRow    结束行
      * @param col   合并的列号，对第几列进行合并(从0开始)。第一行从0开始
      */
function mergeCell(table1, startRow, endRow, col) {

    var tb = document.getElementById(table1);

    if (!tb || !tb.rows || tb.rows.length <= 0) {
        return;
    }
    if (col >= tb.rows[0].cells.length || (startRow >= endRow && endRow != 0)) {
        return;
    }
    if (endRow == 0) {
        endRow = tb.rows.length - 1;
    }
    for (var i = startRow; i < endRow; i++) {

        if (tb.rows[startRow].cells[col].innerHTML == tb.rows[i + 1].cells[col].innerHTML) { //如果相等就合并单元格,合并之后跳过下一行
            tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[col]);
            tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan) + 1;
        } else {
            mergeCell(table1, i + 1, endRow, col);
            break;
        }
    }
}

function getData(area, product, flag) {
    //dosomething
    var arrData = [];

    var m = 0;
    for (i = 0; i < sourceData.length; i++) {
        var arrData2 = [];
        if (sourceData[i].region == area && sourceData[i].product == product) {
            if (flag == 1) {
                arrData2.push(sourceData[i].product);
                arrData2.push(sourceData[i].region);
            }
            else {
                arrData2.push(sourceData[i].region);
                arrData2.push(sourceData[i].product);


            }

            arr3 = sourceData[i].sale;
            for (j = 0; j < arr3.length; j++) {
                arrData2.push(arr3[j]);
            }
            arrData.push(arrData2);

        }


    }

    return arrData;

    // 返回数据
}

function newForm(area, product, flag) {


    var arrGetData = getData(area, product, flag);
    for (j = 0; j < arrGetData.length; j++) {
        var tr = document.createElement('tr');


        table.appendChild(tr);
        for (var i = 0; i < 14; i++) {
            var td = document.createElement('td');

            var txt = document.createTextNode(arrGetData[j][i]);
            td.appendChild(txt);
            tr.appendChild(td);

        }
    }
    divTable.style.display = "block";
}

