/**
 * @ 自有后台公共js
 * @ date   2015-08-28 13:26:29
 */
 var uploadtimer=null;
$(function(){
    $('.m_upload_input').live('change',function(){
        var _name=$(this).attr('name');
        var _type=$(this).attr('data-type');
        var _this=$(this);
        $.dialog({content: '正在上传文件',type:0,autoHide:false});
        // TODO 打开doAjaxUpload()，开始上传图片
        if(_type==1){           //图片
            getFileImgInfo(_this,_name,_type);
        }else{                  //文件
            getFilePdfInfo(_this,_name,_type);
        }
    });
});
function GetFileSize(_this) {
    var dom = _this.get(0);
    try {
        return dom.files.item(0).size;
    } catch (e) {
        try {
            var img = new Image();
            img.src = dom.value;
            img.style.display='none';
            document.body.appendChild(img);
            setTimeout(function(){
                document.body.removeChild(img);
            },1000);
            return img.fileSize;
        } catch (e) {
            return -1;
        }
    }
}
function getFileImgInfo(_this,_name,_type){
    // 获取图片的大小与类型
    var bSize = GetFileSize(_this);
    var val = _this.val();
    var arrList = val.split(".");
    var type =  arrList[arrList.length-1].toLowerCase();
    var size = bSize/1024;
    if(size>200||(type!='jpg'&&type!='gif'&&type!='png'&&type!='jpeg'&&type!='bmp')){
        $.dialog({content: 'The file shall be less than 200KB,and only support .jpg .jpeg .bmp .gif .png.',type:0});
    }else{
        // ◆ 上传的URL地址
        var url = '/Public/upload';
        ajaximg(url,_this,_name,_type);
    }
}
function getFilePdfInfo(_this,_name,_type){
    // 获取图片的大小与类型
    var bSize = GetFileSize(_this);
    var val = _this.val();
    var arrList = val.split(".");
    var type =  arrList[arrList.length-1].toLowerCase();
    var size = bSize/(1024*1024);
    if(_type==2){
        if(size>2||type!='pdf'){
            $.dialog({content: 'The above-mentioned documents shall be less than 2M in pdf format.',type:0});
            return false;
        }
    }else if(_type==3){
        if(size>1||type!='pdf'){
            $.dialog({content: 'Please upload a colored copy in pdf format no less than 1M.',type:0});
            return false;
        }
    }
    // ◆ 上传的URL地址
    var url = '/Public/upload';
    ajaximg(url,_this,_name,_type);
}

function ajaximg(url,_this,_name,_type){
    //上传到服务器
    /*$.ajaxFileUpload({
        url:url,
        type:'POST',
        secureuri:false,
        fileElementId:_this.attr('id'),
        dataType: "json",
        data:{'name':_name,'type':_type},
        success: function (data, status){*/
            var data={'errcode':200,'url':'images/pay_icon3.png','file':'123412341234.pdf'};            // ◆伪装返回数据(ajax返回的数据) 获取真正信息后将该行删除     
            _this.val('');
            clearInterval(uploadtimer);
            if(data.errcode==200){
                var objImg = new Image();
                objImg.onload = function(){
                    setTimeout(function(){
                        $('.dialog_box').remove();
                        setTimeout(function(){
                            if(_type==1){           //图片
                                _this.parent().siblings('.m_upload_box').find('.m_upload_img').attr('src',data.url);
                                $('.J_show_upload_btn').removeDisabled();

                            }else{                  //文件
                                _this.parent().siblings('.m_upload_box').find('.m_upload_pdf em').html(data.file);
                            }
                            $('.m_point').html('');
                        },100);
                    },1000);
                }
                objImg.src = data.url;
            }else{
                clearInterval(uploadtimer);
                $.dialog({content:data.msg,type:0});
            }
        /*},
        error: function (data, status, e){
            _this.val('');
            $.dialog({content: e,type:0});
        }
    });*/
}