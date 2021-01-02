$(document).ready(function() {
  Stripe.setPublishableKey($("meta[name='stripe-key']").prop("content"));

  let $form = $("#pro_form");
  let $formSubmitBtn = $("#form-submit-btn");
  $formSubmitBtn.click(function(e) {
    // Prevent form submission
    e.preventDefault();
    $formSubmitBtn.prop("disabled", true);

    // Send credit card info to Stripe
    Stripe.card.createToken({
      number: $('#card_number').val(),
      cvc: $('#card_code').val(),
      exp_month: $('#card_month').val(),
      exp_year: $('#card_year').val()
    }, stripeResponseHandler);

    // Submit the form
    function stripeResponseHandler(status, response) {
      if (response.error) {
        alert("Stripe Error: " + response.error.message);
        $formSubmitBtn.prop("disabled", false);
        return;
      }
      let stripe_token = response.id;
      $form.append($('<input>').prop({type: "hidden", name: "user[stripe_card_token]", value: stripe_token}));
      $form.submit();
    }
  });
});
