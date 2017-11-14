/**
 * Created by dogukanyilmaz on 06/02/2017.
 */
var FlyValidator = (function () {
    function FlyValidator() {
    }

    FlyValidator.prototype.formValidate=function (formContainer) {
      var formElements = $("#"+formContainer+"[fly-validator]");
      var validatorObject = new Object();

      for(var i=0; i<formElements.length;i++){
          var element = formElements[i];

          if(element.getAttribute("type")== "email"){

          }
      }
    };
    return FlyValidator;
})();