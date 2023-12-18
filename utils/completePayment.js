//CompletePayment method 1 : assuming payment success all time;

// function CompletePayment(userDetails, paymentDetails) {
//      // Implement the payment logic here
//     console.log('Payment completed for user:', userDetails.name);
//     console.log('Payment details:', paymentDetails);
//     // simulated payment success response
//     return {
//       success: true,
//       message: 'Payment completed successfully.',
//     };
//   }
// module.exports = CompletePayment;


// CompletePayment method 2 : assuming 80% chance of successful payment;

function CompletePayment(userDetails, paymentDetails) {
    //80% chance of failure
    const isSuccess = Math.random() < 0.8;
  
    if (isSuccess) {
      // Implement your payment success logic 
      console.log('Payment completed for user:', userDetails.name);
      console.log('Payment details:', paymentDetails);
      // simulated payment success response
      return {
        success: true,
        message: 'Payment completed successfully.',
      };
    } else {
      // Simulate payment failure
      console.log('Payment failed for user:', userDetails.name);
      console.log('Payment details:', paymentDetails);
      // simulated payment failure response
      return {
        success: false,
        message: 'Payment failed. Please try again.',
      };
    }
  }
  module.exports = CompletePayment;
  