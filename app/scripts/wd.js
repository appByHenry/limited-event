/**
 * Created by harshilkumar on 4/25/17.
 */


$(function () {
    var encodedString = "";
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    encodedString = Base64.encode("hrpatel.263@gmail.com").toString('ascii');

    Storage.prototype.setObject = function (key, value) {
        //value = JSON.stringify(value);
        this.setItem(key, value);
    }
    Storage.prototype.getObject = function (key) {
        var value = this.getItem(key);

        return value;// && JSON.parse(value);
    }

    localStorage.removeItem("guset_details");
    // To get the parameter from URL.
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
            return null;
        }
        else{
            return results[1] || 0;
        }
    }

    // In actual application I have to read the url parameter
   // var get_userEmail = $.urlParam('_guestKey');
    var get_userEmail = "aHJwYXRlbC4yNjNAZ21haWwuY29t";
    var decodedString = "aHJwYXRlbC4yNjNAZ21haWwuY29t";
    console.log("Getting user key: ",decodedString);

    $(document).on("click", ".chkbox_container", function () {
        console.log(this);
        $(this).find("i").toggleClass("display_none_class");
        $("#wedding_rsvp").attr("style"," ");

    });

    $('div.events_name').find('.chkbox_container').each(function () {
        if ( $(this).find("i").hasClass("display_none_class") ) {
            console.log("not checked");
        }
        else {
            var chked_id = $(this).find("span.chkbox").attr("id");
            chked_id = chked_id+"_checked"
            console.log("Event checked");
        }
    });

    $(document).on("click", ".ppl_more", function () {
        console.log(this);
        var x = 0;
        var decrese_val = $(this).prev().val();
        x = parseInt(decrese_val);
        if(x == 0 || x > 0)
        {
            x = x+1

            $(this).prev().attr("value",x.toString());
        }
    });

    $(document).on("click", ".ppl_less", function () {
        console.log(this);
        var y = 0;
        var increase_val = $(this).next().val();
         y = parseInt(increase_val);
        if(y > 0)
        {
            y = y - 1 ;
            $(this).next().attr("value",y.toString());
        }
    });
    $(document).on("click", ".chld_more", function () {
        console.log(this);
        var x = 0;
        var decrese_val = $(this).prev().val();
        x = parseInt(decrese_val);
        if(x == 0 || x > 0)
        {
            x = x+1

            $(this).prev().attr("value",x.toString());
        }
    });
    $(document).on("click", ".chld_less", function () {
        console.log(this);
        var y = 0;
        var increase_val = $(this).next().val();
        y = parseInt(increase_val);
        if(y > 0)
        {
            y = y - 1 ;
            $(this).next().attr("value",y.toString());
        }
    });

    $(document).on("click", ".rsvp_btn", function () {
        console.log(this);
        $(".ppl_count").attr("value","0");
        $(".child_count").attr("value","0");
    });

    $(document).on("click", "#next_btn", function () {
        console.log(this);
        $(".page1").hide(1000);
        $(".page2").show(1000);
    });

    $(document).on("click", "#prvs_btn", function () {
        console.log(this);
        $(".page2").hide(1000);
        $(".page1").show(1000);
    });

    // Click on submit RSVP button
    $(document).on("click", ".submit_btn", function () {
        console.log(this);
        // Input value of people
        var people_count = $(".ppl_count").val();
        var child_count = $(".child_count").val();
        var can_submit = true;

        if(people_count != "0" || child_count != "0")
        {
            console.log("Value is not zero");
            can_submit = true;
            $(".ppl_count").css("background-color","#fff7da");
            $(".child_count").css("background-color","#fff7da");
        }
        else
        {
            $(".ppl_count").css("background-color","#f9733d");
            $(".child_count").css("background-color","#f9733d");
        }

        // Checking only one div tag. Need to see for multiple pages.
        if ( $("#chkmark_icon").hasClass( "display_none_class" ) ) {
            console.log("Selection is not maid yet");
            can_submit = false;

            $("#wedding_rsvp").css("background-color","#f9733d");
        }
        else
        {
            can_submit = true;
            $("#wedding_rsvp").css("background-color","#FFFF");
        }
        if(can_submit)
        {
            storeInDb(can_submit);
        }



    });
    function saveNewGuest(g_key, g_data, api_url) {
        var Dbdata = {"guestkey": g_key, "guestData": g_data};
        Dbdata = JSON.stringify(Dbdata);
        console.log(Dbdata);

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            //url: 'https://stok-dashboard.herokuapp.com/UpdateusrConfig',
            url: 'https://wd-app-db.herokuapp.com/'+api_url,
            data: Dbdata,
            dataType: "json",
            crossDomain: true,
            complete: function () {
                //called when complete
                console.log('SAve new guest api campleed');
            },
            success: function (res) {
                console.log(res);

            },
            error: function () {
                // Data not found in json want to offer for new user.
                console.log("Error while storing guest data");
            },
        });

    }

    var gst_rsvp = {};
    function storeInDb(get_submit_flag) {
        var get_local_storage_guest = localStorage.getObject("guset_details");

        if(get_submit_flag)
        {
            console.log("Calling mongo db");
            if(get_userEmail)
            {
                gst_rsvp = {};
                // Collecting the value.

                gst_rsvp["wed_cer"] = "Y";
                gst_rsvp["j_cer"] = "N";
                gst_rsvp["h_cer"] = "N";

                var guestname = $("#guest_name").val();
                if(guestname && guestname != "")
                {
                    gst_rsvp["name"] = guestname;
                }
                else
                {
                    gst_rsvp["name"] = "NA";
                }

                var people_count = $(".ppl_count").val();
                var child_count = $(".child_count").val();

                gst_rsvp["no_ppl"] = people_count;
                gst_rsvp["no_chldrn"] = child_count;

                var wsh_val = $("#wish_msg").val();
                if(wsh_val && wsh_val != "")
                {
                    gst_rsvp["wishes"] = wsh_val;
                }
                else
                {
                    gst_rsvp["wishes"] = "NA";
                }
            }
            // Closing the model dialog
            $("#get_rsvp").removeClass("open");
            //$(".submit_btn_no").trigger("click");
        }
        else
        {
            gst_rsvp = {};
            // Collecting the value.

            gst_rsvp["wed_cer"] = "NA";
            gst_rsvp["j_cer"] = "NA";
            gst_rsvp["h_cer"] = "NA";

            var guestname = $("#guest_name").val();
            if(guestname && guestname != "")
            {
                gst_rsvp["name"] = guestname;
            }
            else
            {
                gst_rsvp["name"] = "NA";
            }

            gst_rsvp["no_ppl"] = "NA";
            gst_rsvp["no_chldrn"] = "NA";

            var wsh_val = $("#wish_msg").val();
            if(wsh_val && wsh_val != "")
            {
                gst_rsvp["wishes"] = wsh_val;
            }
            else
            {
                gst_rsvp["wishes"] = "NA";
            }
        }

        if(get_local_storage_guest)
        {
            // Local storage is there so update the values.
            var update_url = "updateExistingdata";
            saveNewGuest(get_local_storage_guest, gst_rsvp, update_url);
        }
        else
        {
            // No local storage so insert new value
            localStorage.removeItem("guset_details");

            localStorage.setObject("guset_details", "");

            // Data set in local storage.
            //var jsonObj_gst_email = JSON.stringify(get_userEmail);
            localStorage.setObject("guset_details", get_userEmail);
            var save_new_url = "storeNewdata";
            saveNewGuest(get_userEmail, gst_rsvp, save_new_url);
        }
        console.log(gst_rsvp);
    }

    // Click on not button
    $(document).on("click", ".submit_btn_no", function () {
        console.log(this);
        // Input value of people
        var can_not_submit = false;
        storeInDb(can_not_submit);

    });

});
