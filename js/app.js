$( document ).ready(function() {
  $('div a').click(function(){
        $("a").removeClass("active");
        $(this).addClass("active");
    });

    //Hiding the containers on load
    $("#mainContainer").hide();
    $("#loader").hide();
    $("#coverContainer").hide();

    $("#basicInfo").on('click',function(){ //animation to Navbar
        $("#basicInfoCard").show(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#placesCard").hide(1000);
        $("#postsCard").hide(1000);

    });//end function
    $("#aboutInfo").on('click',function(){
        $("#basicInfoCard").hide(1000);
        $("#aboutCard").show(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#placesCard").hide(1000);
        $("#postsCard").hide(1000);
    });
    $("#eduInfo").on('click',function(){
       $("#basicInfoCard").hide(1000);
       $("#aboutCard").hide(1000);
       $("#educationCard").show(1000);
       $("#workCard").hide(1000);
       $("#placesCard").hide(1000);
       $("#postsCard").hide(1000);

   });


   $("#workInfo").on('click',function(){
       $("#basicInfoCard").hide(1000);
       $("#aboutCard").hide(1000);
       $("#educationCard").hide(1000);
       $("#workCard").show(1000);
       $("#placesCard").hide(1000);
       $("#postsCard").hide(1000);
   });

   $("#placeInfo").on('click',function(){
       $("#basicInfoCard").hide(1000);
       $("#aboutCard").hide(1000);
       $("#educationCard").hide(1000);
       $("#workCard").hide(1000);
       $("#placesCard").show(1000);
       $("#postsCard").hide(1000);
   });

   $("#postsInfo").on('click',function(){
       $("#basicInfoCard").hide(1000);
       $("#aboutCard").hide(1000);
       $("#educationCard").hide(1000);
       $("#workCard").hide(1000);
       $("#placesCard").hide(1000);
       $("#postsCard").show(1000);
   }); //End function


   function getFacebookInfo(){

        	var myFacebookToken = $("#accessToken").val();
		localStorage.setItem("Token", myFacebookToken); //storing coockies for Token

        	$.ajax('https://graph.facebook.com/me?fields=id,name,cover,education,work,birthday,location,gender,interested_in,languages,quotes,email,address,hometown,picture.width(300).height(300),friends&access_token='+myFacebookToken,{

                success : function(response){
  //                  console.log(response);
  //                  console.log(typeof(response));

                    //Cover and Profile pic
                    if(response.picture.data != undefined && response.picture.data!= null ){
                        $("#profilePic").attr("src", "" + response.picture.data.url + "");
                    }
                    else{
                        $("#profilePic").attr("src", "default_profile.jpg");
                    }

                    if(response.cover != undefined && response.cover != null ){
                        $("#coverPic").attr("src", "" + response.cover.source + "");
                    }
                    else{
                        $("#coverPic").attr("src", "default_cover.png");
                    }


                    //Basic Details
                    if(response.name != undefined && response.name != null ){
                        $("#name").text(response.name);
                    }
                    else{
                        $("#name").text("Not available in facebook");
                    }

                    if(response.name != undefined && response.name != null ){
                        $("#birthday").text(response.birthday);
                    }
                    else{
                        $("#birthday").text("Not available in facebook");
                    }
                    if(response.name != undefined && response.name != null ){
                        $("#gender").text(response.gender);
                    }
                    else{
                        $("#gender").text("Not available in facebook");
                    }

                    if(response.name != undefined && response.name != null ){
                        $("#interest").text(response.interested_in);
                    }
                    else{
                        $("#interest").text("Not available in facebook");
                    }



                    var lang = $.map(response.languages, function(index) {
                        return index.name;
                    });

                    if(lang == null ){
                        $("#languages").text("Not available in facebook");
                    }
                    else{
                        $("#languages").text(lang);
                    }



                    //About

                    if(response.quotes != undefined && response.quotes != null ){
                        $("#qoutes").text(response.quotes);
                    }
                    else{
                        $("#qoutes").text("Not available in facebook");
                    }


                    if(response.email != undefined && response.email != null ){
                        $("#email").text(response.email);
                    }
                    else{
                        $("#email").text("Not available in facebook");
                    }

                    if(response.friends){
                      var friends = $.map(response.friends.data, function(index,value) {
                          return index.name;
                      });

                      var friendsCounts = response.friends.summary.total_count ;

                      $("#friends").text(friends + "+" + friendsCounts + " more" );
                    }

                    //places

                    if(response.location != undefined && response.location != null ){
                        $("#currentCity").text(response.location.name);
                    }
                    else{
                        $("#currentCity").text("Not available in facebook");
                    }

                    if(response.hometown != undefined && response.hometown != null ){
                        $("#hometown").text(response.hometown.name);
                    }
                    else{
                        $("#hometown").text("Not available in facebook");
                    }
                    //end PLaces

                    //Work

                    var employer = $.map(response.work, function(index,value) {
                        if(index.employer != undefined && index.employer!= null ){
                            return (index.employer.name );
                        }
                        else{
                            return "N/A";
                        }
                    });

                    var position = $.map(response.work, function(index,value) {
                        if(index.position != undefined && index.position != null){
                            return (index.position.name);
                        }
                        else{
                            return "N/A";
                        }
                    });

                    $.each(employer, function(i, item) {
                        if(employer[i] != null && position[i] != null)
                            $("#employer").append("Company : " + "<strong>" + employer[i] + "</strong><br>" + "Position : " + position[i] + "<hr>" );
                    });
                    //End Work


                    //Education

                    var colleges = $.map(response.education, function(index,value) {
                        if(index.school != undefined && index.school != null ){
                            return index.school.name;
                        }
                        else{
                            return "N/A";
                        }
                    });

                    var concentration = $.map(response.education, function(index,value) {
                        if(index.concentration != undefined && index.concentration != null){
                            return (index.concentration[0].name);
                            //console.log(index.concentration[0].name);
                        }
                        else{
                            return "N/A";
                        }
                    });

                    $.each(colleges, function(i, item) {
                        if(concentration[i] != null && colleges[i] != null)
                            //console.log(colleges[i]);
                            $("#education").append("School Name : " + "<strong>" + colleges[i] + "</strong><br>" + "Department : "+ concentration[i] + "<hr>" );
                    });

                    //End Education


                    /*============================
                           ajax call for the posts
                           ============================*/
                           $.ajax("https://graph.facebook.com/me?fields=posts{created_time,type,full_picture,story,message,source},name,picture&access_token=" + myFacebookToken, {
                               success: function (response) {
                                   var posts = response.posts.data;
                                   var feeds = $.map(posts, function (value, index) {
                                       if (index <= 5) { //for limiting the posts upto 6
                                           return value;
                                       }
                                   });
                                   //first Post goes here
                                   var feed1 = $.map(feeds, function (value, index) {
                                       if (index == 0) {
                                           return value;
                                       }
                                   });
                                   //conditions for fb stories it may be status,photo,video or music
                                   if (feed1[0].type == "status") { // for status

                                       $("#postStory1").html(response.name + " shared a status </br>" + feed1[0].message);


                                   } else if (feed1[0].type == "photo") { // for photo

                                       $("#postStory1").text("" + feed1[0].story + "").css({
                                           "text-decoration": "none",
                                           "color": "black",
                                           "width":"3vw",
                                           "height":"3vw",
                                           "font-size":"1vw"
                                       });
                                       $(".photoDisplay1").html("<img src='" + feed1[0].full_picture + "'" +" class='img-responsive' alt='Smiley face' height='50%' width='50%' border=1px>");
                                       //for video shared
                                   } else if (feed1[0].type == "video") { //for video shared
                                       $("#postStory1").text("" + feed1[0].story + "").css({
                                           "text-decoration": "none",
                                           "color": "black",
                                           "width":"3vw",
                                           "height":"3vw",
                                           "font-size":"1vw"
                                       });
                                       $(".photoDisplay1").html("<video controls src=" + "" + feed1[0].source + " " + "type= " + "video/mp4" + " height='50%' width='60%'></video>");
                                   } else {}

                                   //second post goes here
                                   var feed2 = $.map(feeds, function (value, index) {
                                       if (index == 1) {
                                           return value;
                                       }
                                   });
                                   //conditions for fb stories it may be status,photo,video or music
                                   if (feed2[0].type == "status") { // for status

                                       $("#postStory2").html(response.name + " shared a status </br>" + feed2[0].message);
                                       //for photo shared
                                   } else if (feed2[0].type == "photo") { //for photo shared

                                       $("#postStory2").text("" + feed2[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay2").html("<img src='" + feed2[0].full_picture + "'" +" class='img-responsive' alt='Smiley face' height='50%' width='50%' border=1px>");

                                   } else if (feed2[0].type == "video") { //for video shared
                                       $("#postStory2").text("" + feed2[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay2").html("<video controls src=" + "" + feed2[0].source + " " + "type= " + "video/mp4" + " height='50%' width='60%'></video>");
                                   } else {}


                                   //third post starts here
                                   var feed3 = $.map(feeds, function (value, index) {
                                       if (index == 2) {
                                           return value;
                                       }
                                   });
                                   //conditions for fb stories it may be status,photo,video or music
                                   if (feed3[0].type == "status") {

                                       $("#postStory3").html(response.name + " shared a status </br>" + feed3[0].message);


                                       //for photo s
                                   } else if (feed3[0].type == "photo") {

                                       $("#postStory3").text("" + feed3[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay3").html("<img src='" + feed3[0].full_picture + "'" +" class='img-responsive' alt='Smiley face' height='50%' width='50%' border=1px>");
                                       //for video shared
                                   } else if (feed3[0].type == "video") {
                                       $("#postStory3").text("" + feed3[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay3").html("<video controls src=" + "" + feed3[0].source + " " + "type= " + "video/mp4" + " height='50%' width='60%'></video>");
                                   } else {}

                                   //fourth post starts here
                                   var feed4 = $.map(feeds, function (value, index) {
                                       if (index == 3) {
                                           return value;
                                       }
                                   });
                                   //conditions for fb stories it may be status,photo,video or music
                                   if (feed4[0].type == "status") { //for status

                                       $("#postStory4").html(response.name + "shared a status  </br>" + feed4[0].message);

                                   } else if (feed4[0].type == "photo") { //for photo

                                       $("#postStory4").text("" + feed4[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay4").html("<img src='" + feed4[0].full_picture + "'" +" class='img-responsive' alt='Smiley face' height='50%' width='50%' border=1px>");

                                   } else if (feed4[0].type == "video") { //for video
                                       $("#postStory4").text("" + feed4[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay4").html("<video controls src=" + "" + feed4[0].source + " " + "type= " + "video/mp4" + " height='50%' width='60%'></video>");
                                   } else {}

                                   //fifth post starts here
                                   var feed5 = $.map(feeds, function (value, index) {
                                       if (index == 4) {
                                           return value;
                                       }
                                   });
                                   //conditions for fb stories it may be status,photo,video or music
                                   if (feed5[0].type == "status") { //for status

                                       $("#postStory5").html(response.name + " shared a status " + feed5[0].message);

                                   } else if (feed5[0].type == "photo") { //for photo

                                       $("#postStory5").text("" + feed5[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay5").html("<img src='" + feed5[0].full_picture + "'" +" class='img-responsive' alt='Smiley face' height='50%' width='50%' border=1px>");

                                   } else if (feed5[0].type == "video") { //for video
                                       $("#postStory5").text("" + feed5[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay5").html("<video controls src=" + "" + feed5[0].source + " " + "type= " + "video/mp4" + " height='50%' width='60%'></video>");
                                   } else {}


                                   //sixth post starts here
                                   var feed6 = $.map(feeds, function (value, index) {
                                       if (index == 5) {
                                           return value;
                                       }
                                   });
                                   //conditions for fb stories it may be status,photo,video or music
                                   if (feed6[0].type == "status") { //for status

                                       $("#postStory6").html(response.name + " shared a status " + feed6[0].message);

                                   } else if (feed6[0].type == "photo") { //for photo

                                       $("#postStory6").text("" + feed6[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay6").html("<img src='" + feed6[0].full_picture + "'" +" class='img-responsive' alt='Smiley face' height='50%' width='50%' border=1px>");

                                   } else if (feed6[0].type == "video") { //for video
                                       $("#postStory6").text("" + feed6[0].story + "").css({
                                         "text-decoration": "none",
                                         "color": "black",
                                         "width":"3vw",
                                         "height":"3vw",
                                         "font-size":"1vw"
                                       });
                                       $(".photoDisplay6").html("<video controls src=" + "" +feed6[0].source + " " + "type= " + "video/mp4" + " height='50%' width='60%'></video>");
                                   } else {}






                               } //end success function
                                });




                    $("#mainContainer").show();
                    $("#basicInfoCard").show(1000);
                    $("#aboutCard").hide(1000);
                    $("#educationCard").hide(1000);
                    $("#workCard").hide(1000);
                    $("#placesCard").hide(1000);
                    $("#postsCard").hide(1000);
                    $("#coverContainer").show(1000);

                },

                timeout: 1500, // keeping the timeout for 1.5 sec
                beforeSend: function () { //Displaying loader
                    $('#loader').delay(1500).show();
                    $("#mainContainer").hide();

                },
                complete: function () {
                    $('#loader').delay(1500).hide(); // hide the loader on screen

                },

                error: function (req, status, error) { // error function for showing the error on console and giving warining to users via alert
                    $('#loader').delay(1500).hide(); // hide the loader on screen
                    $("#mainContainer").hide();
                    $("#coverContainer").hide();


                    console.log("Error occured", status, error);
                        alert("Invalid Token or Server Timeout");

                }

            }//end argument list
        );// end ajax call

    }// end get facebook info




   $("#input").on('click',getFacebookInfo); // calling getFacebookInfo method to retrieve the data




});
