$(function(){
	/* step1 */
	$('.tools_step1_search').keyup(function(){
		var _value=$.trim($(this).val());
		if(_value==''){
			_thisParent.find("p").show();
		}
		//var _value=$.trim($(this).val()).toLowerCase();
		$(".tools_table tbody").textSearch(_value,{
			markColor: "#fab427",
			nullReport: false,
			callback:function(){
				$(".tools_table tbody tr").each(function(i){
				for(var i=0;i<$(".tools_table tbody tr").length;i++){
					if($(".tools_table tbody tr").eq(i).find("span[rel='mark']").length<1){
						$(".tools_table tbody tr").eq(i).hide();
					}else{
						$(".tools_table tbody tr").eq(i).show();
					}
				}
					
				});
			}
		});
	});
	/* step2 */
	$('.tools_step2_title').bind('click',function(){
		$('.tools_step2_list').not($(this).parents('.tools_step2_list')).removeClass('active');
		$(this).parents('.tools_step2_list').toggleClass('active');
	});
});
