/*
	Copyright Hadrian Bell (Dev1lroot) All Rights Reserved.
	------------------------------------------------------
	Requirements: JQuery@3.5+
*/
var dev1 = {
	select: {
		isOpened: false
	},
	selectHideAll: function(){
		$(".dev1-select").each(function(a)
		{
			$(this).find("ul").hide();
			dev1.select.isOpened = false;
		});
	},
    selectReset: function(){
    	dev1.selectHideAll();
		$(".dev1-select").each(function(a)
		{
			var select = this;
			$(select).on("click", function(e)
			{
				if(dev1.select.isOpened == true){
					dev1.selectReset();
				}
				$(select).find("ul").toggle();
				if($(select).find("ul").is(":hidden")){
					dev1.select.isOpened = false;
				}
				else
				{
					dev1.select.isOpened = true;
				}
			});
			$(select).find("ul").on("click", function(e)
			{
				e.stopPropagation();
			})
			$(select).find("ul li").on("click", function(e)
			{
				$(select).find("li.dev1-select-option").html($(this).html());
				$(select).find("ul").toggle();
				if($(this).attr("data-value"))
				{
					$(select).find(".dev1-select-option").attr("data-value", $(this).attr("data-value"));
				}
				dev1.selectHideAll();
			});
			$(document).on("click",function(e)
			{
				if(e.target.className != "dev1-select-option")
				{
					dev1.selectHideAll();
				}
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
	}
};
$(document).ready(function()
{
	dev1.selectReset();
});
