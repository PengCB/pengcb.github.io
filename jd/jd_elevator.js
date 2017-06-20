//$不需再写方法，直接调用上一JS中的$方法
window.addEventListener("load",function(){elevator.init();});

//求任意elem距页面顶部的总距离
function getElemTop(elem){
	//声明一个sum，初始化为elem.offsetTop
	//循环：elem.offsetParent!=null
		//获得elem.offsetParent.offsetTop，累加到sum上
		//将elem替换为其offsetParent
	//(循环结束)
	var sum=elem.offsetTop;
	while(elem.offsetParent!=null){
		sum+=elem.offsetParent.offsetTop;
		elem=elem.offsetParent;
	}
	return sum;
}

var elevator={
	FHEIGHT:0,//保存每个楼层的高度
	UPLEVEL:0,//保存亮灯区的上限
	DOWNLEVEL:0,//保存亮灯区的下限
	//(凡是一个值，一旦确定，就当成常量，常量全大写，一般不随便改)
	DISTANCE:0,
	DURATION:1000,
	STEPS:100,
	interval:0,
	step:0,
	timer:null,
	moved:0,

	init:function(){//3件事：计算属性值，绑定事件，启动函数
/**/		this.interval=this.DURATION/this.STEPS;
		//获得id为f1元素计算后的样式，保存在变量style中
		//将style的height，转为浮点数后，+style的marginBottom转为浮点数，结果保存在FHEIGHT属性中
		//(innerHeight-FHEIGHT)/2保存在UPLEVEL属性中
		//UPLEVEL+FHEIGHT保存在DOWNLEVEL属性中
		//为window绑定页面滚动(scroll)事件为light(提前绑定this)
		var style=getComputedStyle($("#f1"));
		this.FHEIGHT=parseFloat(style.height)+parseFloat(style.marginBottom);
		this.UPLEVEL=(innerHeight-this.FHEIGHT)/2;
		this.DOWNLEVEL=this.UPLEVEL+this.FHEIGHT;
		window.addEventListener("scroll",this.light.bind(this));

		//为id为elevator下的ul绑定鼠标进入事件
		//为id为elevator下的ul绑定鼠标移出事件
		$("#elevator>ul").addEventListener("mouseover",function(e){
			//获得目标元素
			//如果target不是UL时
				//如果target是a
					//将target换成target的父元素
				//在target下找第1个子元素a，隐藏
				//在target下找第2个子元素a，显示
			var target=e.target;
			if(target.nodeName!="UL"){
				if(target.nodeName=="A"){
					target=target.parentNode;
				}
				target.$("a:nth-child(1)").style.display="none";
				target.$("a:nth-child(2)").style.display="block";
			}
		});
		$("#elevator>ul").addEventListener("mouseout",function(e){
			var target=e.target;
			if(target.nodeName!="UL"){
				if(target.nodeName=="A"){
					target=target.parentNode;
				}
				//获得target下第一个a元素的内容，转为整数，保存在变量f中
				//查找id为"f"+f的元素下的header下的span，保存在变量span中
				//如果span的class不是hover
					//才做下面两件事
				var f=parseInt(target.$("a:nth-child(1)").innerHTML);
				var span=$(("#f"+f)+">header>span");
				if(span.className!="hover"){
					target.$("a:nth-child(1)").style.display="block";
					target.$("a:nth-child(2)").style.display="none";
				}
			}
		});

		//为id为elevator下的ul绑定鼠标单击事件
/**/		$("#elevator>ul").addEventListener("click",this.scrollTo.bind(this));
	},
	light:function(){//楼层点亮
		//查找class为floor下的header下的直接子元素span，保存在变量spans中
		//获得页面滚动的距离，保存在变量scrollTop中
		//遍历spans中每个span
			//获得当前span距页面顶部的总距离，保存在变量elemTop中

			//找到id为elevator下的ul下的第i+1个li，保存在变量li中

			//如果elemTop>scrollTop+UPLEVEL 且 elemTop<=scrollTop+DOWNLEVEL
				//设置当前span的class为hover
				//在li下找第1个子元素a，隐藏
				//在li下找第2个子元素a，显示
			//否则
				//清除当前span的class
				//在li下找第1个子元素a，显示
				//在li下找第2个子元素a，隐藏
		var spans=$(".floor>header>span");
		var scrollTop=document.body.scrollTop;
		for(var i=0;i<spans.length;i++){
			var elemTop=getElemTop(spans[i]);

			var li=$("#elevator>ul>li:nth-child("+(i+1)+")");

			if(elemTop>scrollTop+this.UPLEVEL&&elemTop<=scrollTop+this.DOWNLEVEL){
				spans[i].className="hover";
				li.$("a:nth-child(1)").style.display="none";
				li.$("a:nth-child(2)").style.display="block";
			}else{
				spans[i].className="";
				li.$("a:nth-child(1)").style.display="block";
				li.$("a:nth-child(2)").style.display="none";
			}
		}

	 /*显示电梯按钮*/
		//查找class为floor下的header下的class为hover的span，保存在变量span中
		//设置id为elevator的元素，如果span不是null，就显示，否则就隐藏
		var span=$(".floor>header>span.hover");
		$("#elevator").style.display=span!=null?"block":"none";
	},
/**/
	scrollTo:function(e){
		if(this.timer==null){
			//获得目标元素
			//如果target的class为etitle
				//获得target前一个a元素的内容，转为整数，保存在变量f中
				//查找id为"f"+f的元素下的header下的span，保存在变量span中
				//获得span距页面顶部的高度elemTop
				//让窗口滚动到elemTop-UPLEVEL
			var target=e.target;
			if(target.className=="etitle"){
				var f=parseInt(target.previousElementSibling.innerHTML);
				var span=$(("#f"+f)+">header>span");
				var elemTop=getElemTop(span);
				//window.scrollTo(0,elemTop-this.UPLEVEL);
				//求滚动的总距离
				this.DIATANCE=elemTop-this.UPLEVEL-document.body.scrollTop;
				//求步长
				this.step=this.DISTANCE/this.STEPS;
				//启动周期性定时器
				this.timer=setInterval(this.scrollStep,this.interval);
			}
		}
	},
	scrollStep:function(){
		window.scrollBy(0,this.step);
		this.moved++;
		if(this.moved==this.STEPS){
			clearInterval(this.timer);
			this.timer=null;
			this.moved=0;
		}
	},
}