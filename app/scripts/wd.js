/**
 * Created by harshilkumar on 4/25/17.
 */


$(function () {
    var encodedString = "";

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
    var get_userEmail = $.urlParam('_guestKey');
    //var get_userEmail = "aHJwYXRlbC4yNjNAZ21haWwuY29t";
    //var decodedString = "aHJwYXRlbC4yNjNAZ21haWwuY29t";
    console.log("Getting user key: ",get_userEmail);

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

    $('.close_mobile').on('touchstart click', function(){
        /* do something... */
        console.log(this);
        $(".modal").removeClass("open");
    });

    $(document).on("click", ".close", function () {
        console.log(this);
        $(".modal").removeClass("open");
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
                $("#rsvpdone").trigger("click");
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
        var emptyName = false;
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
                    emptyName = true;
                    //gst_rsvp["name"] = "NA";
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
            else
            {
                $("#emailNotValid").trigger("click");
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
                emptyName = true;
                //gst_rsvp["name"] = "NA";
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

        if(emptyName)
        {
            $("#emptyName").trigger("click");
        }
        else
        {
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

                //localStorage.setObject("guset_details", "");

                toCheckDataInStorage(gst_rsvp);

            }
        }

        console.log(gst_rsvp);
    }

    function toCheckDataInStorage(getGuestObj) {
        // Getting from query string
        var g_usrky = get_userEmail;
        //var g_usrky = "aHJwYXRlbC4yNjNAZ21haWwuY29t";
        $.ajax({
            type: "GET",
            dataType: "json",
            data: '',
            contentType: "application/json; charset=utf-8",
            url: 'https://wd-app-db.herokuapp.com/getspecificGuest/' + g_usrky,
            complete: function () {

                //console.log('to check key is there or not in json.');
                $('.main_btns').removeClass('none-display-class');
            },
            success: function (res) {
                //console.log(res.g_name);
                if(res)
                {
                    if(res.g_name)
                    {
                        console.log("Found the value in database");
                        var save_new_url = "updateExistingdata";
                        saveNewGuest(g_usrky, getGuestObj, save_new_url);
                    }
                }
            },
            error: function () {
                console.log("data not found");
                var save_new_url = "storeNewdata";
                localStorage.setObject("guset_details", g_usrky);
                saveNewGuest(g_usrky, getGuestObj, save_new_url);
            },
        });
    }
    // Click on not button
    $(document).on("click", ".submit_btn_no", function () {
        console.log(this);
        // Input value of people
        var can_not_submit = false;
        storeInDb(can_not_submit);
        $("#get_rsvp").removeClass("open");
    });

});
