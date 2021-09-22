function reverse(str)
{
      var reverseStr=  str.split('').reverse().join('');
      return reverseStr;
}
function isPalindrome(str)
{
    var reverseStr=reverse(str);
    if(reverseStr === str)
        {
            return true;
        }
    return false;

}


function covertDateToString(date)
{
    var dateRef={day:'',month:'',year:''};
    if(date.day <10)
        {
            dateRef.day = '0' + date.day;
        }
    else{
            dateRef.day=date.day.toString()
        }
        if(date.month <10)
        {
            dateRef.month = '0' + date.month;
        }
    else{
            dateRef.month=date.month.toString();
        }
        dateRef.year = date.year.toString();
        return dateRef;
}


 function getDateInAllFormat(date){
     var dateStr= covertDateToString(date);
     var ddmmyyyy= dateStr.day + dateStr.month + dateStr.year;
     var mmddyyyy= dateStr.month + dateStr.day + dateStr.year;
     var yyyymmdd= dateStr.year + dateStr.month + dateStr.day;
     var ddmmyy=dateStr.day + dateStr.month +dateStr.year.slice(-2);
     var mmddyy= dateStr.month + dateStr.day +dateStr.year.slice(-2);
     var yymmdd= dateStr.year.slice(-2)+ dateStr.month + dateStr.day ;

     return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
 }



 function getPalindromeForAllDateFormats(date)
 {
     var listOfDates=getDateInAllFormat(date);
     var flag=false;
     for(var i=0;i<listOfDates.length; i++)
     {
         if(isPalindrome(listOfDates[i]))
         {
             flag=true;
             break;
         }
     }
     return flag;
 }

  function isLeapYear(year)
  {
      if(year % 400 === 0)
      {
          return true;
      }
      if(year % 100 === 0)
      {
          return false;
      }
      if(year % 4 === 0)
      {
          return true;
      }
      return false;

  }




 function getNextDate(date)
 {
     var day=date.day + 1;
     var month =date.month;
     var year = date.year;
     var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
  
     if(month === 2)
     {
         if(isLeapYear(year))
         {
             if(day>29)
             {
                 day=1;
                 month ++;
             }

         }
         else{
         if(day>28)
         {
             day=1;
             month ++;
         }
        }
         
    }
    else{
        if (day>daysInMonth[month-1])
         {
             day =1;
             month ++;
         }
    }
    if(month>12)
    {
        month=1;
        year ++ ;
    }
    return {day :day, month :month, year :year};
 }



 function getNextPalindromeDate(date)
 {
     var ctr =0;
     var nextDate=getNextDate(date);
     while(1){
         ctr ++;
         var isPalindrome=getPalindromeForAllDateFormats(nextDate);
         if(isPalindrome){
             break;
         }
         nextDate=getNextDate(nextDate);
     }
     return [ctr,nextDate];
 }



var bdayInput= document.querySelector('#birthday-input');
var showBtn= document.querySelector('.btn');
var output= document.querySelector('.output');
var outputDays=document.querySelector('.days');

function onClickHandler()
{
    console.log('clicked');

    var bdayStr=bdayInput.value;
       if(bdayStr === "") {
        output.textContent ="Please enter the date";
    }

      
      
    if(bdayStr !== '')
    {
        var listOfDate=bdayStr.split('-');
        var date={
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])
        };
        var isPalindrome=getPalindromeForAllDateFormats(date);
        if(isPalindrome){
        output.textContent ="Hurray!!Your B-day is Palindrome😍😍";
        }
        else{
                var [ctr,nextDate]=getNextPalindromeDate(date);
                 output.textContent="The next palindrome date is " + nextDate.day +
                "-" + nextDate.month + "-" + nextDate.year+"." + "You missed it by " + ctr + "days 😭😭 " ;
               
            }

    }

}

showBtn.addEventListener('click',onClickHandler);
