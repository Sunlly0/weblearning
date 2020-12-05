class todoItem{
    constructor(content,status){
        this.content=content;
        this.status=status;
    }
}
class todoManager{
    todoList=[];
    filename="list.txt";

    constructor(item){
        this.item=item;
    }

    init(){
        // var reader=new FileReader();
        // reader.readAsText(this.filename,'utf8');
        // reader.onload= ()=>{
        //     document.getElementsByTagName(p).innerHTML=reader.result;
        // }
        console.log("init finished!");
    }
}
function display(){
    var list=document.getElementById("list");
    console.log(list.children);

    //增加关闭控制
    for(var i=0;i<list.children.length;i++){
        var span=document.createElement('span');
        span.className="close";
        var txt=document.createTextNode("\u00D7");
        span.appendChild(txt);
        list.children[i].appendChild(span);
    }
    //关闭效果
    var close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            //div.style.display = "none";
            //为了实现本地存储，采用删除dom的方式
            list.removeChild(div);
            save();
        }
    }

    console.log("display finished!");
}

function add(){
    //alert("add!");
    var s=document.getElementById("addtodo").value;
    if(s.length>0){
        var list=document.getElementById("list");
        var firstlist=list.children[0];
        var addnode=document.createElement('li');
        addnode.innerHTML=s;
        list.insertBefore(addnode,firstlist);
        // addnode.onclick=choose(this);
    }
    else{
        alert("the string can't be empty!");
    }
    display();
    save();
    document.getElementById("addtodo").value="";
    console.log("add finished!");
}

//点击列表项变成灰色+撤销变色
function choose(listobj){
    if (listobj.target.tagName === 'LI'){
        if(listobj.target.className!="checked"){
            listobj.target.className="checked";//不可取消
        }
        else{
            listobj.target.className="";//不可取消
        }
        save();
    }
}

function save(){
    window.localStorage.clear();
    var list=document.getElementById ("list");
    for(var i=0;i<list.children.length;i++){
        var tododata=list.children[i].innerHTML;
        function gettodostatus(i){
            if(list.children[i].className==='checked'){
                return true;
            }
            return false;
        }
        var todostatus=gettodostatus(i);
        localStorage.setItem(i,tododata+'+'+todostatus);
    }
    count();
}

function loadAll(){

    var list=document.getElementById("list");

    //加载localstrorage
    if(localStorage.length>0){
        for(var i=0;i<localStorage.length;i++){
            var key=localStorage.key(i);
            var str=localStorage.getItem(key);
            var data=str.split('+');
            // test.innerHTML=test.innerHTML+", "+data[1];

            var tododata=data[0];
            var todostatus=data[1];

            //追加列表
            var newnode=document.createElement('li');
            newnode.innerHTML=tododata;
            if(todostatus=='true'){
                newnode.className="checked";
            }
            list.appendChild(newnode);
        }
    }

    count();
}

function count(){

    var list=document.getElementById("list");
    var test=document.getElementById("test");
    console.log(localStorage.length);

    var havefinishednum=0;
    var needfinishednum=0;
    for(var i=0;i<list.children.length;i++){
        if(list.children[i].className==='checked'){
            havefinishednum=havefinishednum+1;
        }
        else{
            needfinishednum=needfinishednum+1;
        }
    }
    test.innerHTML="今日任务共 "+(havefinishednum+needfinishednum)+" 件, 已完成："+havefinishednum+" 件，未完成："+needfinishednum+" 件";
    if(needfinishednum!=0){
        test.innerHTML+="，君还需努力！";
    }
    else if(havefinishednum>0){
        test.innerHTML+="，做的很好！";
    }
}