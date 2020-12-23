/*
	Copyright Hadrian Bell (Dev1lroot) All Rights Reserved.
	------------------------------------------------------
	Requirements: JQuery@3.5.1
*/
var dev1 = {
	uiInit: function(){
		dev1.selectInit();
		dev1.multiselectInit();
		$(document).on("click",function(e)
		{
			if(dev1.ui.classes.includes(e.target.className))
			{
				//
			}
			else
			{
				dev1.uiHide();
			}
		});
	},
	ui: {
		classes: ["dev1-select-option","dev1-multiselect-option"]
	},
	select: {
		opened: false
	},
	uiHide: function(){
		dev1.selectHide();
		dev1.multiselectHide();
	},
	selectHide: function(){
		$(".dev1-select").each(function(a)
		{
			if(!$(this).find("ul").hasClass("hidden"))
			{
				$(this).find("ul").addClass("hidden");
			}
		});
	},
	multiselectHide: function(){
		$(".dev1-multiselect").each(function(a)
		{
			if(!$(this).find("ul").hasClass("hidden"))
			{
				$(this).find("ul").addClass("hidden");
			}
		});
	},
	selectToggle: function(s){
		if(dev1.select.opened == false)
		{
			var other = 0;
			$(s).find("ul").toggleClass("hidden");
			dev1.select.opened = s;
		}
		else
		{
			var other = 0;
			if($(s).attr("id") != $(dev1.select.opened).attr("id"))
			{
				other++;
			}
			if($(s).attr("class") != $(dev1.select.opened).attr("class"))
			{
				other++;
			}
			if(other > 0)
			{
				if($(s).find("ul").hasClass("hidden"))
				{
					$(s).find("ul").toggleClass();
					dev1.select.opened = s;
				}
			}
			else
			{
				if($(s).find("ul").hasClass("hidden"))
				{
					dev1.select.opened = false;
				}
			}
		}
	},
    selectInit: function(){
    	dev1.uiHide();
		$(".dev1-select").each(function(a)
		{
			var select = this;
			$(select).on("click", function(e)
			{
				dev1.uiHide();
				dev1.selectToggle(select);
			});
			$(select).find("ul").on("click", function(e)
			{
				e.stopPropagation();
			})
			$(select).find("ul li").on("click", function(e)
			{
				$(select).find("li.dev1-select-option").html($(this).html());
				dev1.selectToggle(select);
				if($(this).attr("data-value"))
				{
					$(select).find(".dev1-select-option").attr("data-value", $(this).attr("data-value"));
				}
				dev1.selectHide();
			});
		});
	},
	selectSet: function(id,val){
		$(".dev1-select#"+id).find(".dev1-select-option").attr("data-value", val);
	},
	selectGet: function(id){
		return $(".dev1-select#"+id).find(".dev1-select-option").attr("data-value");
	},
	selectCreate: function(id, options){
		let html =  `<li class="dev1-select-option" data-value="${options[0].value}">${options[0].title}</li><ul>`;
		for(opt of options){
			html += `<li data-value="${opt.value}">${opt.title}</li>`;
		}
		html += "</ul>"
		$("#"+id).addClass("dev1-select");
		$("#"+id).html(html);
	},
	multiselectGet: function(id){
		var options = [];
		$(".dev1-multiselect#"+id).find(".selected").each(function(e)
		{
			options.push($(this).attr("data-value"));
		});
		return options;
	},
	multiselectInit: function(){
		dev1.uiHide();
		$(".dev1-multiselect").each(function(a)
		{
			var select = this;
			$(select).on("click", function(e)
			{
				dev1.uiHide();
				dev1.selectToggle(select);
			});
			$(select).find("ul").on("click", function(e)
			{
				e.stopPropagation();
			})
			$(select).find("ul li").on("click", function(e)
			{
				$(select).find("li.dev1-multiselect-option").html($(this).html());
				if($(this).attr("data-value"))
				{
					$(this).toggleClass("selected");
					$(select).find(".dev1-multiselect-option").attr("data-value","sss");
				}
			});
		});
	},
};
$(document).ready(function()
{
	dev1.uiInit();
});
