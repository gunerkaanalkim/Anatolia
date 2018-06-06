var Validator = (function () {
    function Validator() {
    }

    Validator.prototype.formValidate = function (formContainer) {
      var formElements = $("#"+formContainer+"[fly-validator]");
      var validatorObject = new Object();

      for(var i=0; i<formElements.length;i++){
          var element = formElements[i];

          if(element.getAttribute("type")== "email"){

          }
      }
    };
    return Validator;
})();