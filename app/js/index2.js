import EmbarkJS from 'Embark/EmbarkJS';
import $ from 'jquery';
import Token from 'Embark/contracts/Token';

let currentToken;

$(document).ready(function() {

  $("#useToken button").click(function() {
    var address = $('#useToken input').val();
    currentToken = new EmbarkJS.Contract({
      abi: Token.options.jsonInterface,
      address: address
    });
    currentToken.options.from = web3.eth.defaultAccount;
  });

  web3.eth.getAccounts(function(err, accounts) {
    $('#queryBalance input').val(accounts[0]);
  });

  $('#queryBalance button').click(function() {
    var address = $('#queryBalance input').val();
    currentToken.methods.balanceOf(address).send().then(function(balance) {
      $('#queryBalance .result').html(balance.toString());
    });
  });

  $('#transfer button').click(function() {
    var address = $('#transfer .address').val();
    var num = $('#transfer .num').val();
    currentToken.methods.transfer(address, num).send().then(function() {
      $('#transfer .result').html('Done!');
    });;
  });


});

// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';

