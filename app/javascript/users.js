$(document).ready(function() {
  Stripe.setPublishableKey($("meta[name='stripe-key']").prop("content"));

  $('#pro_form #form-submit-btn').click(function(e) {
    // Prevent form submission
    e.preventDefault();
    $(this).prop("disabled", true);

    // Send credit card info to Stripe
    Stripe.card.createToken({
      number: $('#card_number').val(),
      cvc: $('#card_code').val(),
      exp_month: $('#card_month').val(),
      exp_year: $('#card_year').val()
    }, stripeResponseHandler);

    // Submit the form
    function stripeResponseHandler(status, response) {
      let stripe_token = response.id;
      $("#pro_form").append($('<input>').prop({type: "hidden", name: "user[stripe_card_token]", value: stripe_token}));
      $("#pro_form").submit();
    }
  });
});
