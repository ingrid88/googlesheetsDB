// Variable to hold request
var request;
console.log("hi")
// Bind to the submit event of our form
$(function () {
    console.log("yo")
    $("#foo").submit(function(event){
      console.log("hello")
      // Abort any pending request
      if (request) {
          request.abort();
      }
      // setup some local variables
      var $form = $(this);

      // Let's select and cache all the fields
      var $inputs = $form.find("input, select, button, textarea");

      // Serialize the data in the form
      var serializedData = $form.serialize();

      // Let's disable the inputs for the duration of the Ajax request.
      // Note: we disable elements AFTER the form data has been serialized.
      // Disabled form elements will not be serialized.
      $inputs.prop("disabled", true);

      // Fire off the request to /form.php
      request = $.ajax({
          url: "https://script.google.com/macros/s/AKfycbwsTMf_nYqoLnjJLSAcYXV8-88qualzkcAP13VsaEZr/exec",
          type: "post",
          data: serializedData,
          dataType: "jsonp"
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          // Log a message to the console
          console.log("Hooray, it worked!");
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          // Log the error to the console
          console.error(
              "The following error occurred: "+
              textStatus, errorThrown
          );
      });

      // Callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function () {
          // Reenable the inputs
          $inputs.prop("disabled", false);
      });

      // Prevent default posting of form
      event.preventDefault();
    });
});

$(function(event){
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    function postContactToGoogle(){
        var name = $j('#name').val();
        var email = $j('#email').val();
        var feed = $j('#feed').val();
        if ((name !== "") && (email !== "") && ((feed !== "") && (validateEmail(email)))) {
            $j.ajax({
                url: "https://docs.google.com/yourFormURL/formResponse",
                data: {"entry.1" : name, "entry.3" : email, "entry.4": feed},
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function (){

                        $j('#name').val("");
                        $j('#email').val("");
                        $j('#feed').val("");
                        //Success message
                    },
                    200: function (){
                        $j('#name').val("");
                        $j('#email').val("");
                        $j('#feed').val("");
                        //Success Message
                    }
                }
            });
        }
        else {
          console.log("this didn't work!")
            //Error message
        }
    }
});
