let i,j;
let btn=document.querySelectorAll("button");
let value;
let str="";
let input=document.querySelector("input");
let history=[];
let historyData=document.querySelector("#historyData");

btn.forEach((button)=>{
button.addEventListener("click",()=>{
value=button.value;

if(value==="del"){
    str=str.slice(0,-1);
    input.value=str;
}

else if(value==="AC"){
    str="";
    input.value=str;
}
else if(value==="="){
   let res= infix(str);
   history.push(str+"="+res);
   str=String(res);
   input.value=res;
   
}
else if(value==="history"){
    if(historyData.style.display==="none"){
        historyData.style.display="block";
  historyData.innerHTML=history.join("<br>");
    }else{
        historyData.style.display="none"

    }
  

}
    else{
str+=value;
input.value=str;
}



});
});

function infix(str){
    let values=[];
    let ops=[];
    let precedence={
        '+':1,
        '-':1,
        '*':2,
        '/':2,
        '^':3

    };
    function calculate(){
        let b=values.pop();
        let a=values.pop();
        let op=ops.pop();
        if(op==="+")values.push(a+b);
        else if(op==="-") values.push(a-b);
        else if(op==="*")values.push(a*b);
        else if(op==="/")values.push(a/b);
        else if(op==="^")values.push(Math.pow(a,b)); 
    }
    for(let i=0;i<str.length;i++){
        let ch=str[i];
        if(ch === "√"){
             i++;
        let num = "";

          while(i < str.length && !isNaN(str[i]) || str[i]==="."){
             num += str[i];
              i++;
              }

        values.push(Math.sqrt(Number(num)));
           i--;
        }
        
       
       else if(!isNaN(ch) || str[i]==="."){
            let num="";
            while(i<str.length && !isNaN(str[i]) || str[i]==="."){
                num=num+str[i];
                i++;
            }
            values.push(Number(num));
            i--;
        }
        
        else if(ch==="%"){
            let num=values.pop();
            num=num/100;
            values.push(Number(num));
        }
        
       
        
        else if(ch==='('){
            ops.push(ch);
        }
        else if(ch===')'){
            while(ops[ops.length-1]!='('){
                calculate();

            }
            ops.pop(ch);
        }
        else
        {
            while( ops.length>0  && ops[ops.length-1]!=='(' && precedence[ops[ops.length-1]]>=precedence[ch]){
                calculate();
            }
            ops.push(ch);
        }
    }

while(ops.length>0){
    calculate();
}
return values[0];
        
    
}



