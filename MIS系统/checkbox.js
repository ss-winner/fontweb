
function quanxuan(a)
{
    //找到下面所有的复选框
    var className=a+"qx";
    
    var ck =document.getElementsByClassName(className);
    
   
    //遍历所有复选框，设置选中状态。
    for(var i=1;i<ck.length;i++)
    {
        if(ck[0].checked)//判断全选按钮的状态是不是选中的
        {
            ck[i].checked=true;//如果是选中的，就让所有的状态为选中。
        }
       
    }
}
function danji(a,index){
   
    var className=a+"qx";
    
    var ck =document.getElementsByClassName(className);
    var m=0
   
    //遍历所有复选框，设置选中状态。
    for(var i=1;i<ck.length;i++)
    {
        if(ck[i].checked)
        {
            m++;
            
        }
        
    }
    
    if(m==3){
        
        ck[0].checked=true;
        
       
    }
    else if(m==0){
        ck[index].checked=true;

    }
    else{
        ck[0].checked=false;
    }
}
