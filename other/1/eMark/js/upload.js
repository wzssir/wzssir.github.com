
/**
 * @ 自有后台公共js
 * @ date   2015-08-28 13:26:29
 */
var _flag=true;
$(function(){
    $(document).delegate('.m_upload_input','change',function(){
        if(_flag){
            var _name=$(this).attr('name');
            var _type=$(this).attr('data-type');
            var _id=$(this).attr('id');
            var _val=$(this).val();
            console.log(_val);
            $.dialog({
                content: 'Uploading...',
                type:0,
                autoHide:false,
                init:function(){
                    $('.dialog_content').append('<span class="m_dialog_close m_upfile_close" style="right: 0; top: 0; position: absolute; margin: 0;">×</span>');
                }
            });
            // TODO 打开doAjaxUpload()，开始上传图片
            if(_type==1){           //图片
                getFileImgInfo(_id,_name,_type,_val);
            }else{                  //文件
                getFilePdfInfo(_id,_name,_type,_val);
            }
            $('.m_upfile_close').click(function(){
                _flag=false;
                $(this).parents('.dialog_box').remove();
                //_removeFile(_id);
            });
        }else{
            return false;
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
function getFileImgInfo(_id,_name,_type,_val){
    // 获取图片的大小与类型
    var bSize = GetFileSize($("#"+_id));
    var val = $("#"+_id).val();
    var arrList = val.split(".");
    var type =  arrList[arrList.length-1].toLowerCase();
    var size = bSize/1024;
    /*console.log(bSize);*/
    if(_flag){
        if(size>200||(type!='jpg'&&type!='gif'&&type!='png'&&type!='jpeg'&&type!='bmp')){
            _removeFile(_id);
            $.dialog({content: 'The file shall be less than 200KB,and only support .jpg .jpeg .bmp .gif .png.',type:0});
            return false;
        }else{
            // ◆ 上传的URL地址
            var url = '/Public/upload';
            ajaximg(url,_id,_name,_type,_val);
        }
    }
}
function getFilePdfInfo(_id,_name,_type,_val){
    // 获取图片的大小与类型
    var bSize = GetFileSize($("#"+_id));
    var val = $("#"+_id).val();
    var arrList = val.split(".");
    var type =  arrList[arrList.length-1].toLowerCase();
    var file_val = _val.split("\\");
    _val=file_val[file_val.length-1];
    console.log(file_val);
    var size = bSize/(1024*1024);
    console.log(bSize);
    if(_flag){
        if(_type==2){
            if(size>2||type!='pdf'){
                _removeFile(_id);
                $.dialog({content: 'The above-mentioned documents shall be less than 2M in pdf format.',type:0});
                return false;
            }
        }else if(_type==3){
            if(size>1||type!='pdf'){
                _removeFile(_id);
                $.dialog({content: 'Please upload a colored copy in pdf format no less than 1M.',type:0});
                return false;
            }
        }
        // ◆ 上传的URL地址
        var url = '/Public/upload';
        ajaximg(url,_id,_name,_type,_val);
    }
}

function ajaximg(url,_id,_name,_type,_val){
    //上传到服务器
    /*$.ajaxFileUpload({
        url:url,
        type:'POST',
        secureuri:false,
        fileElementId:_id,
        dataType: "json",
        data:{'name':_name,'type':_type,'value':_val},
        success: function (data, status){*/
            var data={'errcode':200,'url':'images/pay_icon3.png','file':'123412341234.pdf'};            // ◆伪装返回数据(ajax返回的数据) 获取真正信息后将该行删除     
            if(_flag){
                if(data.errcode==200){
                    var objImg = new Image();
                    objImg.onload = function(){
                        setTimeout(function(){
                            $('.dialog_box').remove();
                            _removeFile(_id);
                            setTimeout(function(){
                                if(_flag){
                                    if(_type==1){           //图片
                                        //$("#"+_id).parent().siblings('.m_upload_box').find('.m_upload_img').attr('src',data.url);
                                        imgSize(data.url,$("#"+_id).parent().siblings('.m_upload_box').find('.m_upload_img'));
                                        $('.J_show_upload_btn').removeDisabled();

                                    }else{                  //文件
                                        if(data.errcode==100){
                                            if(_type==2){
                                                $.dialog({content: 'The above-mentioned documents shall be less than 2M in pdf format.',type:0});
                                            }else if(_type==3){
                                                $.dialog({content: 'Please upload a colored copy in pdf format no less than 1M.',type:0});
                                            }
                                        }else{
                                            $("#"+_id).parent().siblings('.m_upload_box').find('.m_upload_pdf em').html(_val).attr('data-url',data.file);
                                        }
                                    }
                                    $('.m_point').html('');
                                }else{
                                    _flag=true;
                                }
                            },100);
                        },1000);
                    }
                    objImg.src = data.url;
                }else{
                     _removeFile(_id);
                    $.dialog({content:data.msg,type:0});
                    _flag=true;
                }
            }else{
                _flag=true;
                _removeFile(_id);
            }
        /*},
        error: function (data, status, e){
            $.dialog({content: e,type:0});
            _removeFile(_id);
        }
    });*/
}
function _removeFile(id){
    var file = $("#"+id);
    file.after(file.clone().val(""));
    console.log(111111111);
    file.remove();
}