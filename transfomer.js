var newData = [];
var loop = data.feed.entry;

var rowTest = [];
var colTest = [];
var colKey = [];

loop.forEach(function(item, index) {
    var columnLetter = item.title.$t.substring(0, 1);
    var rowNum =  item.title.$t.substring(1)

    if (!colTest.includes(columnLetter)) {
        colKey.push([columnLetter, item.content.$t]);

        colTest.push(columnLetter);
    }

    if (!rowTest.includes(rowNum)) {
        rowTest.push(rowNum);

        var obj = { 
            "row": rowNum
        }
        colKey.forEach(function(ci) {
            if (ci[0] == columnLetter) {
                obj[ci[1]] = item.content.$t;
                newData.push(obj);
            }
        })

    } else {
        colKey.forEach(function(ci) {
            if (ci[0] == columnLetter) {
                var thisValue = ci[1];
                newData.forEach(function(i) {
                    if (i['row'] == rowNum) {
                        i[thisValue] = item.content.$t
                    }
                });
            }
        })
    }
});

newData.forEach(function(i) {
  delete i.row;
})

newData.shift();

return newData