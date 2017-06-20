/*封装$*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}
/*广告图片数组*/
var images=[
	{"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];
/*广告轮播*/
var slider={
	// ↓ 自动生成
	LIWIDTH:0,//保存每个li的宽度
	// ↓ 轮播
	DISTANCE:0,//保存轮播移动的总距离
	DURATION:1000,//保存轮播的总时间
	STEPS:100,//保存轮播的总步数
	interval:0,//保存每步轮播的时间间隔
	step:0,//保存每步轮播的步长
	timer:null,//保存当前轮播的序号
	moved:0,//保存本次已经移动的步数
	// ↓ 自动轮播
	WAIT:2000,//保存自动轮播之间的时间间隔
	// ↓ 能否自动轮播
	canAuto:true,//保存能否启动自动轮播

	init:function(){
		//获得id为slider的元素计算后的width属性，转为浮点数，保存在LIWIDTH属性中		
		this.LIWIDTH=parseFloat(getComputedStyle($("#slider")).width);

		//计算interval=DISTANCE/STEPS
		this.interval=this.DISTANCE/this.STEPS;

		//更新页面
		this.updateView();

		//留住this
		//为id为indexs的元素绑定鼠标进入事件为function(e)
			//目标元素target
			//如果target是LI，且target的class不是hover
				//...
				//target的内容-#indexs下的class为hover的li的内容，保存在变量n中
		var me=this;
		$("#indexs").addEventListener("mouseover",function(e){				
			var target=e.target;
			if(target.nodeName=="LI"&&target.className!="hover"){
				//停止当前动画
				//更新界面
				//timer清除
				//moved归零
				//把ul拉回起始位置
				clearTimeout(me.timer);
				me.updateView();
				me.timer=null;
				me.moved=0;
				$("#imgs").style.left="";
				me.move(target.innerHTML-$("#indexs>li.hover").innerHTML);
			}
		});
		$("#slider").addEventListener("mouseover",function(){me.canAuto=false;});
		$("#slider").addEventListener("mouseout",function(){me.canAuto=true;});
		this.autoMove();
	},
	updateView:function(){//按照数组元素更新页面
		//遍历images数组，同时声明空字符串html1和html2
			//向html1中拼接：
			//<li><img src="当前元素的img属性"></li>
			//向html2中拼接：
			//<li>i+1</li>
		//(遍历结束)
		//设置id为imgs的元素的内容为html1
		//设置id为imgs的元素的宽为：(拉宽ul)
			//images数组的元素个数*LIWIDTH
		//设置id为indexs的元素内容为html2
		for(var i=0,html1=html2="";i<images.length;i++){
			html1+='<li><img src="'+images[i].img+'"></li>';
			html2+="<li>"+(i+1)+"</li>";
		}		
		$("#imgs").innerHTML=html1;
		$("#imgs").style.width=images.length*this.LIWIDTH+"px";
		$("#indexs").innerHTML=html2;


		//找到id为indexs下的和images数组中第1个元素的i属性对应的li，设置其class为hover
		$("#indexs>li:nth-child("+(images[0].i+1)+")").className="hover";
	},
	move:function(n){//启动一个轮播
		//n*LIWIDTH，保存在DISTANCE属性中
		//DISTANCE/STEPS，保存在属性step中

		//如果是右移
			//删除images结尾的n个元素，拼接到images开头，将结果保存回images
			//更新界面
			//设置id为imgs的元素的left为n*LIWIDTH

		//启动下一次定时器，设置任务为moveStep(提前绑定this)，时间间隔为interval，将序号保存在timer中
		this.DISTANCE=n*this.LIWIDTH;
		this.step=this.DISTANCE/this.STEPS;

		if(n<0){
			images=images.splice(images.length+n,-n).concat(images);//n是负值
			this.updateView();
			$("#imgs").style.left=n*this.LIWIDTH+"px";
		}

		this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
	},
	moveStep:function(n){//移动一步
		//获得id为imgs的元素计算后的left，转为浮点数保存在变量的left中
		//设置id为imgs的元素的left为left-step
		//moved+1
		//如果moved<STEPS
			//启动下一次定时器
		var left=parseFloat(getComputedStyle($("#imgs")).left);
		$("#imgs").style.left=left-this.step+"px";
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
		}else{
			this.timer=null;
			this.moved=0;
			if(n>0){
				//删除images开头的n个元素(split)，将删除的结果拼接到images结尾，将结果保存回images
				//更新界面
				//将id为imgs的元素的left清除
				images=images.concat(images.splice(0,n));
				this.updateView();
			}
			$("#imgs").style.left="";
			this.autoMove();
		}
	},
	autoMove:function(){//启动自动轮播
		//this.timer=setTimeout(this.move.bind(this,1),this.WAIT);
		this.timer=setTimeout(
			function(){
				//如果canAuto是true
					//调用move
				//否则
					//重新等待
				if(this.canAuto){
					this.move(1);
				}else{
					this.autoMove();
				}
			}.bind(this),this.WAIT
		);
	}
}
//window.onload=function(){slider.init();}
window.addEventListener("load",function(){slider.init();})