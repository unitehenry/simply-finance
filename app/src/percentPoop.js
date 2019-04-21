var someObj = [{"Name": "Banana", "Price": "1.00", "Category": "Food"},{"Name": "TV","Price": "100.00", "Category": "Entertaiment"},{"Name" : "Apple","Price" : "2.00", "Category": "Food"}];

console.log(calcPercent(someObj));

function calcPercent(someObj){
      var dict = {}
      for (var i = 0; i < someObj.length;i++){

          if (someObj[i].Category in dict ){
              if (isNaN(someObj[i].Price)) {
                dict[someObj[i].Category] += 0;  
              } else {
                dict[someObj[i].Category] += parseInt(someObj[i].Price, 10);
              }
          }else {
              if (isNaN(someObj[i].Price)) {
                dict[someObj[i].Category] = 0;  
              } else {
                dict[someObj[i].Category] = parseInt(someObj[i].Price, 10);
              }
          }
      }
      var count = 0
      var percent = {}
      for (var key in dict){
        if (isNaN(dict[key])) {
                count += 0
        } else {
            count += parseInt(dict[key], 10);
        }
      }
      for (var key in dict){
          percent[key] = parseInt(dict[key]/count*100);
      }
      return percent;

  }