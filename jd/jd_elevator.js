//$������д������ֱ�ӵ�����һJS�е�$����
window.addEventListener("load",function(){elevator.init();});

//������elem��ҳ�涥�����ܾ���
function getElemTop(elem){
	//����һ��sum����ʼ��Ϊelem.offsetTop
	//ѭ����elem.offsetParent!=null
		//���elem.offsetParent.offsetTop���ۼӵ�sum��
		//��elem�滻Ϊ��offsetParent
	//(ѭ������)
	var sum=elem.offsetTop;
	while(elem.offsetParent!=null){
		sum+=elem.offsetParent.offsetTop;
		elem=elem.offsetParent;
	}
	return sum;
}

var elevator={
	FHEIGHT:0,//����ÿ��¥��ĸ߶�
	UPLEVEL:0,//����������������
	DOWNLEVEL:0,//����������������
	//(����һ��ֵ��һ��ȷ�����͵��ɳ���������ȫ��д��һ�㲻����)
	DISTANCE:0,
	DURATION:1000,
	STEPS:100,
	interval:0,
	step:0,
	timer:null,
	moved:0,

	init:function(){//3���£���������ֵ�����¼�����������
/**/		this.interval=this.DURATION/this.STEPS;
		//���idΪf1Ԫ�ؼ�������ʽ�������ڱ���style��
		//��style��height��תΪ��������+style��marginBottomתΪ�����������������FHEIGHT������
		//(innerHeight-FHEIGHT)/2������UPLEVEL������
		//UPLEVEL+FHEIGHT������DOWNLEVEL������
		//Ϊwindow��ҳ�����(scroll)�¼�Ϊlight(��ǰ��this)
		var style=getComputedStyle($("#f1"));
		this.FHEIGHT=parseFloat(style.height)+parseFloat(style.marginBottom);
		this.UPLEVEL=(innerHeight-this.FHEIGHT)/2;
		this.DOWNLEVEL=this.UPLEVEL+this.FHEIGHT;
		window.addEventListener("scroll",this.light.bind(this));

		//ΪidΪelevator�µ�ul���������¼�
		//ΪidΪelevator�µ�ul������Ƴ��¼�
		$("#elevator>ul").addEventListener("mouseover",function(e){
			//���Ŀ��Ԫ��
			//���target����ULʱ
				//���target��a
					//��target����target�ĸ�Ԫ��
				//��target���ҵ�1����Ԫ��a������
				//��target���ҵ�2����Ԫ��a����ʾ
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
				//���target�µ�һ��aԪ�ص����ݣ�תΪ�����������ڱ���f��
				//����idΪ"f"+f��Ԫ���µ�header�µ�span�������ڱ���span��
				//���span��class����hover
					//��������������
				var f=parseInt(target.$("a:nth-child(1)").innerHTML);
				var span=$(("#f"+f)+">header>span");
				if(span.className!="hover"){
					target.$("a:nth-child(1)").style.display="block";
					target.$("a:nth-child(2)").style.display="none";
				}
			}
		});

		//ΪidΪelevator�µ�ul����굥���¼�
/**/		$("#elevator>ul").addEventListener("click",this.scrollTo.bind(this));
	},
	light:function(){//¥�����
		//����classΪfloor�µ�header�µ�ֱ����Ԫ��span�������ڱ���spans��
		//���ҳ������ľ��룬�����ڱ���scrollTop��
		//����spans��ÿ��span
			//��õ�ǰspan��ҳ�涥�����ܾ��룬�����ڱ���elemTop��

			//�ҵ�idΪelevator�µ�ul�µĵ�i+1��li�������ڱ���li��

			//���elemTop>scrollTop+UPLEVEL �� elemTop<=scrollTop+DOWNLEVEL
				//���õ�ǰspan��classΪhover
				//��li���ҵ�1����Ԫ��a������
				//��li���ҵ�2����Ԫ��a����ʾ
			//����
				//�����ǰspan��class
				//��li���ҵ�1����Ԫ��a����ʾ
				//��li���ҵ�2����Ԫ��a������
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

	 /*��ʾ���ݰ�ť*/
		//����classΪfloor�µ�header�µ�classΪhover��span�������ڱ���span��
		//����idΪelevator��Ԫ�أ����span����null������ʾ�����������
		var span=$(".floor>header>span.hover");
		$("#elevator").style.display=span!=null?"block":"none";
	},
/**/
	scrollTo:function(e){
		if(this.timer==null){
			//���Ŀ��Ԫ��
			//���target��classΪetitle
				//���targetǰһ��aԪ�ص����ݣ�תΪ�����������ڱ���f��
				//����idΪ"f"+f��Ԫ���µ�header�µ�span�������ڱ���span��
				//���span��ҳ�涥���ĸ߶�elemTop
				//�ô��ڹ�����elemTop-UPLEVEL
			var target=e.target;
			if(target.className=="etitle"){
				var f=parseInt(target.previousElementSibling.innerHTML);
				var span=$(("#f"+f)+">header>span");
				var elemTop=getElemTop(span);
				//window.scrollTo(0,elemTop-this.UPLEVEL);
				//��������ܾ���
				this.DIATANCE=elemTop-this.UPLEVEL-document.body.scrollTop;
				//�󲽳�
				this.step=this.DISTANCE/this.STEPS;
				//���������Զ�ʱ��
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